import { FC } from 'react';
import { Link } from 'components/common/common';
import { DashboardMenuItem } from 'common/types/types';
import styles from './styles.module.scss';

type Props = {
  item: DashboardMenuItem;
};

const MenuItem: FC<Props> = ({ item }) => (
  <Link className={styles.item} to={item.route}>
    {item.title}
  </Link>
);

export { MenuItem };
