export enum MessagesEnum {
  SIGN_IN_FAILED = 'Authentication failed. Wrong password',
  WRONG_PASSWORD = 'Please enter correct old password',
  PASSWORDS_NOT_MATCH = 'Make sure your password and confirm password the same',
  EMAIL_NOT_EXISTS = 'User with provided email is not registered!',
  PASSWORD_CHANGED = 'Congrats, password was successfully changed!',
  NOT_ALLOWED_OPERATION = 'User cant change values of another user!',
  NEW_USER_CREATED = 'Congrats, new user created!',
  NEW_DRIVER_CREATED = 'Congrats, new driver created!',
  NEW_MERCHANT_CREATED = 'Congrats, new merchant created!',
  PROFILE_CHANGED = 'You successfully changed your profile',
  TRIP_CHANGED = 'You successfully attached user to trip',
  TRIP_USER_NOT_ATTACHED = 'User was not attached to this trip',
}
