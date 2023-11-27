import { FC } from 'react';
import { DashboardMenuItem } from 'common/types/types';
import { MenuItem } from '../menu-item/menu-item';
import styles from './styles.module.scss';

type Props = {
  menuItems: DashboardMenuItem[];
};

const Menu: FC<Props> = ({ menuItems }) => (
  <ul className={styles.menu}>
    {menuItems.map((item) => (
      <li key={item.title}>
        <MenuItem item={item} />
      </li>
    ))}
  </ul>
);

export { Menu };
