import { FC } from 'react';
import { Menu } from './components/menu/menu';
import { DASHBOARD_MENU_ITEMS } from './common/constants';

const Dashboard: FC = () => (
  <>
    <div>Dashboard</div>
    <Menu menuItems={DASHBOARD_MENU_ITEMS} />
  </>
);

export { Dashboard };
