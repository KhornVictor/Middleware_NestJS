import { Injectable, Scope } from '@nestjs/common';

@Injectable({ scope: Scope.REQUEST })
export class RequestService {
  private userId: string;

  async setUserId(userId: string): Promise<void> {
    this.userId = userId;
  }

  async getUserId(): Promise<string> {
    return this.userId;
  }
}
