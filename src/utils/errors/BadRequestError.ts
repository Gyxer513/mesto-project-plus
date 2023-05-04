class BadRequestError extends Error {
  public statuseCode: number;

  constructor(message: string) {
    super(message);
    this.statuseCode = 400;
  }
}

export default BadRequestError;
