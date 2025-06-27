import { Status } from '../types/Status'

export class Customer {
  constructor(
    private readonly id: string,
    private readonly name: string,
    private readonly status: Status,
  ) {}

  getId(): string {
    return this.id
  }

  getName(): string {
    return this.name
  }

  getStatus(): Status {
    return this.status
  }
}
