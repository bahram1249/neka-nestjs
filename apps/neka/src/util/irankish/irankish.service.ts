import * as path from 'path';
import * as fs from 'fs';
import * as crypto from 'crypto';
import { Injectable } from '@nestjs/common';
import {
  AuthenticationEnvelopeInterface,
  RequestPaymentResponseInterface,
  VerifyPaymentResponseInterface,
} from './interface';
import { RequestPaymentDto, VerifyDto } from './dto';
import axios from 'axios';
import * as _ from 'lodash';

@Injectable()
export class IranKishService {
  private readonly baseUrl = 'https://ikc.shaparak.ir/';
  private readonly PUBLIC_KEY = fs.readFileSync(
    path.resolve(
      path.join(
        __dirname,
        '../../../apps/neka/src/util/irankish/publicKey.txt',
      ),
    ),
    'utf8',
  );
  constructor() {}

  private padLeftWithZero(size: number, number: number): string {
    return number.toString().padStart(size, '0');
  }

  private aesEncrypt(inputStr) {
    const aesSecretKey = crypto.randomBytes(16);
    const aesInitialVector = crypto.randomBytes(16);
    const cipher = crypto.createCipheriv(
      'aes-128-cbc',
      Buffer.from(aesSecretKey),
      aesInitialVector,
    );
    const aesEncrypted = Buffer.concat([
      cipher.update(Buffer.from(inputStr, 'hex')),
      cipher.final(),
    ]);
    return { aesSecretKey, aesInitialVector, aesEncrypted };
  }

  private rsaEncrypt(rsaInput) {
    return crypto.publicEncrypt(
      { key: this.PUBLIC_KEY, padding: crypto.constants.RSA_PKCS1_PADDING },
      Buffer.from(rsaInput),
    );
  }

  generateAuthenticationEnvelope(
    amount: number,
    terminalId: string,
    passPhrase: string,
  ): AuthenticationEnvelopeInterface {
    const zeroPadAmount = this.padLeftWithZero(12, Number(amount));
    const inputStr = `${terminalId}${passPhrase}${zeroPadAmount}00`;

    const { aesSecretKey, aesInitialVector, aesEncrypted } =
      this.aesEncrypt(inputStr);

    const aesEncryptedHash = crypto
      .createHash('sha256')
      .update(aesEncrypted)
      .digest();

    const rsaEncrypted = this.rsaEncrypt(
      Buffer.concat([aesSecretKey, aesEncryptedHash]),
    );

    return {
      data: rsaEncrypted.toString('hex'),
      iv: aesInitialVector.toString('hex'),
    };
  }

  async requestPayment(
    data: RequestPaymentDto,
  ): Promise<RequestPaymentResponseInterface> {
    const requestUrl = this.baseUrl + 'api/v3/tokenization/make';
    const response = await axios.post(requestUrl, data, {
      headers: {
        Encoding: 'UTF-8',
      },
    });
    return response.data as RequestPaymentResponseInterface;
  }

  async verify(data: VerifyDto): Promise<VerifyPaymentResponseInterface> {
    const requestUrl = this.baseUrl + 'api/v3/confirmation/purchase';
    const response = await axios.post(requestUrl, data);
    return response.data as VerifyPaymentResponseInterface;
  }
}
