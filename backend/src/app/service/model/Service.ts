export class Service {
  constructor(
    private readonly id: string,
    private readonly name: string,
    private readonly price: number,
  ) {}

  getId(): string {
    return this.id
  }

  getName(): string {
    return this.name
  }

  getPrice(): number {
    return this.price
  }
}
