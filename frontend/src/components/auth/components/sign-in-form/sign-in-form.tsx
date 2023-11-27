import { FC, UserSignInRequestDto, InputType } from 'common/types/types';
import { useAppForm, useAppSelector, useState } from 'hooks/hooks';
import { Button, Input } from 'components/common/common';
import { getNameOf } from 'helpers/helpers';
import { userSignIn as userSignInValidationSchema } from 'validation-schemas/validation-schemas';
import { DataStatus, IconName } from 'common/enums/enums';
import { DEFAULT_SIGN_IN_PAYLOAD } from './common/constants';
import styles from './styles.module.scss';

type Props = {
  onSubmit: (payload: UserSignInRequestDto) => void;
};

const SignInForm: FC<Props> = ({ onSubmit }) => {
  const [isPasswordShowed, setIsPasswordShowed] = useState<boolean>(false);

  const { dataStatus } = useAppSelector(({ auth }) => ({
    dataStatus: auth.dataStatus,
  }));

  const { control, errors, handleSubmit } = useAppForm<UserSignInRequestDto>({
    defaultValues: DEFAULT_SIGN_IN_PAYLOAD,
    validationSchema: userSignInValidationSchema,
  });

  const handleShowPasswordToggle = (): void => {
    setIsPasswordShowed(!isPasswordShowed);
  };

  const isDisabled = dataStatus === DataStatus.PENDING;
  const passwordType: InputType = isPasswordShowed ? 'text' : 'password';

  return (
    <div className={styles.formWrapper}>
      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        <Input
          type="text"
          label="Email"
          name={getNameOf<UserSignInRequestDto>('email')}
          control={control}
          errors={errors}
        />
        <Input
          type={passwordType}
          label="Password"
          name={getNameOf<UserSignInRequestDto>('password')}
          control={control}
          errors={errors}
          icon={IconName.VISIBILITY}
          onIconClick={handleShowPasswordToggle}
        />
        <Button
          className={styles.button}
          style="primary"
          type="submit"
          isDisabled={isDisabled}
          label="Sign in"
        />
      </form>
    </div>
  );
};

export { SignInForm };
