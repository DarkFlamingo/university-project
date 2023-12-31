import * as Joi from 'joi';
import { getNameOf } from '~/helpers/helpers';
import { UserSignUpRequestDto } from '~/common/types/types';
import {
  UserValidationMessage,
  UserValidationRule,
} from '~/common/enums/enums';

const userSignUp = Joi.object({
  [getNameOf<UserSignUpRequestDto>('email')]: Joi.string()
    .trim()
    .email({ tlds: { allow: false } })
    .required()
    .messages({
      'string.email': UserValidationMessage.EMAIL_WRONG,
      'string.empty': UserValidationMessage.EMAIL_REQUIRE,
    }),
  [getNameOf<UserSignUpRequestDto>('firstname')]: Joi.string()
    .trim()
    .min(UserValidationRule.FIRSTNAME_MIN_LENGTH)
    .rule({ message: UserValidationMessage.FIRSTNAME_MIN_LENGTH })
    .required()
    .messages({
      'string.empty': UserValidationMessage.FIRSTNAME_REQUIRE,
    }),
  [getNameOf<UserSignUpRequestDto>('lastname')]: Joi.string()
    .trim()
    .min(UserValidationRule.LASTNAME_MIN_LENGTH)
    .rule({ message: UserValidationMessage.LASTNAME_MIN_LENGTH })
    .required()
    .messages({
      'string.empty': UserValidationMessage.LASTNAME_REQUIRE,
    }),
  [getNameOf<UserSignUpRequestDto>('password')]: Joi.string().trim().required(),
});

export { userSignUp };
