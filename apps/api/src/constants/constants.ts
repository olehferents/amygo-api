export const constant = {
  MAX_FILE_SIZE: 6 * 1024 * 1024,
  ALLOWED_MIME_TYPES: [
    'image/jpeg',
    'image/jpg',
    'image/png',
    'image/svg',
    'image/tiff',
    'image/webp',
  ],
  ALLOWED_MIME_TYPES_DOCUMENTS: [
    'application/msword',
    'application/pdf',
    'text/plain',
  ],

  IMAGE_DEFAULT_URL:
    'https://www.freedigitalphotos.net/images/img/homepage/394230.jpg',
  RATE_LIMIT_SECONDS: 15 * 60 * 1000,
  RATE_LIMIT_MAX_REQUESTS: 100,

  MIN_DATE_OF_PREORDER: 60 * 60 * 1000,
  MAX_DATE_OF_PREORDER: 7 * 24 * 60 * 60 * 1000,

  UTC: 2 * 60 * 60 * 1000,

  NOTIFY_DRIVERS_OF_PREORDER: 61 * 60 * 1000, //  1 and 1min hours before the trip!!! for Testing UI Validator allow 1 hour
  NOTIFY_USER_THAT_DRIVER_COMING: 60.5 * 60 * 1000, //  hour and half min before the trip
};
