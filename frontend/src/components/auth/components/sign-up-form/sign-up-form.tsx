import { userSignUp as userSignUpValidationSchema } from 'validation-schemas/validation-schemas';
import { useAppForm, useAppSelector } from 'hooks/hooks';
import { getNameOf } from 'helpers/helpers';
import { UserSignUpRequestDto, FC } from 'common/types/types';
import { Button, Input, Link } from 'components/common/common';
import { DEFAULT_REGISTER_PAYLOAD } from './common/constants';
import { AppRoute, DataStatus } from 'common/enums/enums';
import styles from './styles.module.scss';

type Props = {
  onSubmit: (payload: UserSignUpRequestDto) => void;
};

const SignUpForm: FC<Props> = ({ onSubmit }) => {
  const { dataStatus } = useAppSelector(({ auth }) => ({
    dataStatus: auth.dataStatus,
  }));

  const { control, errors, handleSubmit } = useAppForm<UserSignUpRequestDto>({
    defaultValues: DEFAULT_REGISTER_PAYLOAD,
    validationSchema: userSignUpValidationSchema,
  });

  const isDisabled = dataStatus === DataStatus.PENDING;

  return (
    <div className={styles.formWrapper}>
      <h1 className={styles.title}>Sign Up</h1>
      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        <p>
          <Input
            type="text"
            label=""
            placeholder="email"
            name={getNameOf<UserSignUpRequestDto>('email')}
            control={control}
            errors={errors}
          />
          <Input
            type="text"
            label=""
            placeholder="firstname"
            name={getNameOf<UserSignUpRequestDto>('firstname')}
            control={control}
            errors={errors}
          />
          <Input
            type="text"
            label=""
            placeholder="lastname"
            name={getNameOf<UserSignUpRequestDto>('lastname')}
            control={control}
            errors={errors}
          />
          <Input
            type="password"
            label=""
            placeholder="password"
            name={getNameOf<UserSignUpRequestDto>('password')}
            control={control}
            errors={errors}
          />
        </p>
        <Button
          className={styles.button}
          style="primary"
          type="submit"
          isDisabled={isDisabled}
          label="Sign up"
        />
      </form>
      <div className={styles.subtitle}>
        <span>Already have an account? </span>
        <Link className={styles.link} to={AppRoute.SIGN_IN}>
          Sign In
        </Link>
      </div>
    </div>
  );
};

export { SignUpForm };
