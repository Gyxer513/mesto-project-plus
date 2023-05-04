class NotFoundError extends Error {
  public statuseCode: number;

  constructor(message: string) {
    super(message);
    this.statuseCode = 401;
  }
}

export default NotFoundError;
