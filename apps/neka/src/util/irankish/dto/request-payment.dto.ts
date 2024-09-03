import {
  AuthenticationEnvelopeInterface,
  RequestInterface,
} from '../interface';

export class RequestPaymentDto {
  request: RequestInterface;
  authenticationEnvelope: AuthenticationEnvelopeInterface;
}
