export interface GetSessionResponseInterface {
  success: boolean;
  result: {
    sessionName: string;
    userId: string;
    version: string;
    vtigerVersion: string;
  };
}
