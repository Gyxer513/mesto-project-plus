import validator from 'validator';

const validateURL = (value: string) => {
  if (!validator.isURL(value, { require_protocol: true })) {
    throw new Error('Неправильный формат ссылки');
  }
  return value;
};

export default validateURL;
