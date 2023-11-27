import { FC } from 'react';
import { useEffect, useAppDispatch } from 'hooks/hooks';
import { Routes, Route, PrivateRoute } from 'components/common/common';
import { Auth } from 'components/auth/auth';
import { storage } from 'services/services';
import { auth as authActions } from 'store/actions';
import { AppRoute, StorageKey } from 'common/enums/enums';
import { Dashboard } from 'components/dashboard/dashboard';

const App: FC = () => {
  const dispatch = useAppDispatch();

  const hasToken = Boolean(storage.getItem(StorageKey.TOKEN));

  useEffect(() => {
    if (hasToken) {
      dispatch(authActions.loadCurrentUser());
    }
  }, [dispatch]);

  return (
    <Routes>
      <Route path={AppRoute.SIGN_IN} element={<Auth />} />
      <Route path={AppRoute.SIGN_UP} element={<Auth />} />
      <Route
        path={AppRoute.ROOT}
        element={
          <PrivateRoute
            redirectTo={AppRoute.SIGN_IN}
            component={<Dashboard />}
          />
        }
      />
    </Routes>
  );
};

export { App };
