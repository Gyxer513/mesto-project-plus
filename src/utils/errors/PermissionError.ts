class PermissionError extends Error {
  public statuseCode: number;

  constructor(message: string) {
    super(message);
    this.statuseCode = 403;
  }
}

export default PermissionError;
