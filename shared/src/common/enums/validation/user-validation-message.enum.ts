import { UserValidationRule } from './user-validation-rule.enum';

const UserValidationMessage = {
  EMAIL_REQUIRE: 'Email is required',
  EMAIL_WRONG: 'Email is wrong',
  FIRSTNAME_REQUIRE: 'Firstname is required',
  FIRSTNAME_MIN_LENGTH: `Firstname must have a minimum of ${UserValidationRule.FIRSTNAME_MIN_LENGTH} characters`,
  LASTNAME_REQUIRE: 'Lastname is required',
  LASTNAME_MIN_LENGTH: `Lastname must have a minimum of ${UserValidationRule.LASTNAME_MIN_LENGTH} characters`,
} as const;

export { UserValidationMessage };
