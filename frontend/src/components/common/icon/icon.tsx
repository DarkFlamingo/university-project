import { FC } from 'common/types/types';
import { ReactComponent as Visibility } from '../../../assets/img/icons/common/visibility.svg';
import { getValidClasses } from 'helpers/helpers';
import { IconName } from 'common/enums/enums';
import styles from './styles.module.scss';

const iconNameToIcon = {
  [IconName.VISIBILITY]: Visibility,
};

type Props = {
  iconName: IconName;
  className?: string;
};

const Icon: FC<Props> = ({ iconName, className }) => {
  const SvgIcon = iconNameToIcon[iconName];

  return <SvgIcon className={getValidClasses(styles.icon, className)} />;
};

export { Icon };
