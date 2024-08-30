export class GetChallengeInterface {
  success: boolean;
  result: {
    token: string;
    serverTime: bigint;
    expireTime: bigint;
  };
}
