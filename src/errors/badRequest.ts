import { BAD_REQUEST } from "../utils/errors";

interface ststusCode {
  starusCode: number
}

class BadRequest extends Error {
  statusCode: number
  constructor(message: string) {
    super(message);
    this.statusCode = BAD_REQUEST.code;
  }
}

module.exports = BadRequest; 