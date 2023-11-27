const ExceptionMessage = {
  USER_EXISTS: 'Account with this email already exists.',
  INCORRECT_EMAIL:
    'Account with that email does not exist. Try again or create a new account.',
  INCORRECT_CREDENTIALS:
    'Your authentication information is incorrect. Please try again.',
  UNAUTHORIZED_USER: 'Unauthorized user.',
  INVALID_TOKEN: 'Token is invalid.',
} as const;

export { ExceptionMessage };
