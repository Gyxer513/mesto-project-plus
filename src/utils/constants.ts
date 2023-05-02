const DEFAULT_NAME = 'Жак-Ив Кусто';
const DEFAULT_ABOUT_DATA = 'Исследователь';
const DEFAULT_AVATAR = 'https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png';
const urlRegex = /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-/]))?/;
const emailRegex = /^((?!\.)[\w\-_.]*[^.])(@\w+)(\.\w+(\.\w+)?[^.\W])$/;

export {
  DEFAULT_ABOUT_DATA, DEFAULT_NAME, DEFAULT_AVATAR, urlRegex, emailRegex,
};
