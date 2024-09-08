import { Injectable } from '@nestjs/common';
import { DeltasibTokenService } from '../deltasib-token/deltasib-token.service';
import axios from 'axios';
import * as https from 'https';
import {
  DeltasibAddPurchaseResponseInterface,
  DeltasibPurchaseResponseInterface,
  DeltasibPurchaseResultInterface,
} from './interface';
import { PurchaseDto } from './dto';

@Injectable()
export class DeltasibPurchaseService {
  constructor(private readonly deltasibTokenService: DeltasibTokenService) {}

  async getAll(
    terminalSim: string,
  ): Promise<DeltasibPurchaseResultInterface[]> {
    const token = await this.deltasibTokenService.getToken();
    const response = await axios.get(
      `https://185.126.8.124:1043/1.0/user.service.base/?Action=list&Username=${terminalSim}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
        httpsAgent: new https.Agent({ rejectUnauthorized: false }),
      },
    );

    const result = response.data as DeltasibPurchaseResponseInterface[];
    return result.map((x) => ({
      activeTime: x.ActiveTime,
      affectTime: x.ActiveTime,
      cancelDT: x.CancelDT,
      cdt: x.CDT,
      endDate: x.EndDate,
      extraDay: x.ExtraDay,
      off: x.Off,
      payPlan: x.PayPlan,
      payPrice: x.PayPrice,
      returnPrice: x.ReturnPrice,
      serviceId: x.Service_Id,
      servicePrice: x.ServicePrice,
      serviceStatus: x.ServiceStatus,
      startDate: x.StartDate,
      userServiceBaseId: x.User_ServiceBase_Id,
      vat: x.VAT,
      visibility: x.Visibility,
    }));
  }

  async add(dto: PurchaseDto): Promise<DeltasibAddPurchaseResponseInterface> {
    const token = await this.deltasibTokenService.getToken();
    const response = await axios.post(
      `https://185.126.8.124:1043/1.0/user.service.base/`,
      dto,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
        httpsAgent: new https.Agent({ rejectUnauthorized: false }),
      },
    );
    return response.data as DeltasibAddPurchaseResponseInterface;
  }
}
