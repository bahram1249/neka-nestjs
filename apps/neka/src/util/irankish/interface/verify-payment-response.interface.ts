export class VerifyPaymentResponseInterface {
  responseCode: string;
  description: string;
  status: boolean;
  result: {
    responseCode: string;
    systemTraceAuditNumber: string;
    retrievalReferenceNumber: string;
    transactionDate: string;
    transactionTime: string;
    processCode: string;
    billType: string;
    billId: string;
    paymentId: string;
    amount: string;
  };
}
