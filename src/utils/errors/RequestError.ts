class RequestError extends Error {
  public statuseCode: number;

  constructor(message: string) {
    super(message);
    this.statuseCode = 409;
  }
}

export default RequestError;
