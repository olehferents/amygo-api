export enum SwaggerMessagesEnum {
  DESCRIBE_PREORDER_REQUIREMENTS = 'In order to get notification from server,' +
    ' User and Driver should listen socket on its own Id. Guess => after login' +
    '. Example: this.sockets.on(driverId, data => console.log(driverId, data))' +
    'For testing example: Current time 10:00. Preorder at 11:01. Drivers receive notification at 11:00.' +
    ' User receive notification at 11:00:30 of driver coming',
  API_BAD_REQUEST_RESPONSE = 'Please read a message in response body, to figure out which validation' +
    " constraint you didn't pass",
  API_UNAUTHORIZED_RESPONSE = 'Provide valid access token',
  API_PAYLOAD_TOO_LARGE_RESPONSE = 'Provide valid access token',
  API_UNSUPPORTED_MEDIA_TYPE_RESPONSE = 'Provide valid access token',

  DESCRIBE_NAME = 'Correct name shorter than 40 characters',
  DESCRIBE_SURNAME = 'Correct surname shorter than 40 characters',
  DESCRIBE_PROFILE_IMAGE = 'Size < 5Mb and format [jpg, png, svg, tiff, webp]',
  DESCRIBE_EMAIL = 'Correct email address',
  DESCRIBE_PASSWORD = 'Correct password which include at least one capital letter, one small and  one digit ',
  DESCRIBE_CONFIRM_PASSWORD = 'Correct password which include at least one capital letter, one small and ' +
    ' one digit. And match password ',
  DESCRIBE_PHONE_NUMBER = 'Correct phoneNumber, shorter than 15 characters',
  DESCRIBE_EMERGENCY_CONTACT = 'Correct emergency Contact phone number, shorter than 15 characters',
  DESCRIBE_DESCRIPTION = 'Tell us about yourself',
  DESCRIBE_ADMIN_NOTIFICATIONS = 'Every user should listen socket of its corresponding role. Example:' +
    '"adminNotifyAllUsers" for user, "adminNotifyAllDrivers" for drivers, "adminNotifyAllMerchants" for merchants. ' +
    'Also everyone should listen to it\'s own  "id" and "adminNotifyAll"!!! Because admin can send notification' +
    ' separately for each role, and to all at once. Notifications will be send at specified time or when time' +
    ' is not specified right now',
}
