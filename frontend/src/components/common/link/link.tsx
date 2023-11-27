import { NavLink as AppLink } from 'react-router-dom';
import { AppRoute } from 'common/enums/enums';
import { FC } from 'common/types/types';

type Props = {
  to: AppRoute;
  className?: string;
};

const Link: FC<Props> = ({ children, to, className }) => (
  <AppLink to={to} className={className}>
    {children}
  </AppLink>
);

export { Link };
