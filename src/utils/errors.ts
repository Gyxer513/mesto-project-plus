const STATUS_OK = {
  code: 200,
  message: { message: 'Status OK' },
};

const CREATED = {
  code: 201,
  message: { message: 'Sucsess' },
};

const BAD_REQUEST = {
  code: 400,
  message: { message: 'Bad Request' },
};

const UNAUTHORIZED = {
  code: 401,
  message: { message: 'Login Required' },
};

const FORBIDDEN = {
  code: 403,
  message: { message: 'Incorrect Login or Password' },
};

const NOT_FOUND = {
  code: 404,
  message: { message: 'Incorrect Data' },
};

const SERVER_ERROR = {
  code: 500,
  message: { message: 'Server Error' },
};

export {
  STATUS_OK, BAD_REQUEST, CREATED, UNAUTHORIZED, FORBIDDEN, NOT_FOUND, SERVER_ERROR,
};
