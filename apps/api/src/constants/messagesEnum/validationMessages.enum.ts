export enum ValidationMessagesEnum {
  NAME = 'Name should be a string with max length of 40 characters',
  EMAIL = 'Email should be valid',
  PASSWORD = 'Password should consist of at least one Capital letter, one small,' +
    ' one digit, one special symbol, and have length between 8  and 59 characters. Example: Password123#.',
  CONFIRM_PASSWORD = ' Password and confirm password should match.',
}
