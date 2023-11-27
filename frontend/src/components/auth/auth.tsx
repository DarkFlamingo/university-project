import { FC } from 'react';
import { useLocation, useAppDispatch, useAppSelector } from 'hooks/hooks';
import { SignInForm, SignUpForm } from './components/components';
import { Navigate } from 'components/common/common';
import { auth as authActions } from 'store/actions';
import { UserSignUpRequestDto, UserSignInRequestDto } from 'common/types/types';
import { AppRoute } from 'common/enums/enums';
import styles from './styles.module.scss';

const Auth: FC = () => {
  const { user } = useAppSelector(({ auth }) => ({
    user: auth.user,
  }));

  const hasUser = Boolean(user);
  if (hasUser) {
    return <Navigate to={AppRoute.ROOT} />;
  }

  const { pathname } = useLocation();
  const dispatch = useAppDispatch();

  const handleSignInSubmit = (payload: UserSignInRequestDto): void => {
    dispatch(authActions.signIn(payload));
  };

  const handleSignUpSubmit = (payload: UserSignUpRequestDto): void => {
    dispatch(authActions.signUp(payload));
  };

  const getScreen = (screen: string): React.ReactElement | null => {
    switch (screen) {
      case AppRoute.SIGN_IN: {
        return <SignInForm onSubmit={handleSignInSubmit} />;
      }
      case AppRoute.SIGN_UP: {
        return <SignUpForm onSubmit={handleSignUpSubmit} />;
      }
    }

    return null;
  };

  return <div className={styles.authContainer}>{getScreen(pathname)}</div>;
};

export { Auth };
