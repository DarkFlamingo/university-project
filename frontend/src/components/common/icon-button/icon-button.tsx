import { FC } from 'common/types/types';
import { Icon } from 'components/common/common';
import { IconName } from 'common/enums/enums';
import { getValidClasses } from 'helpers/helpers';
import styles from './styles.module.scss';

type Props = {
  icon: IconName;
  type?: 'submit' | 'button';
  className?: string;
  onClick?: React.MouseEventHandler<HTMLElement>;
  isDisabled?: boolean;
};

const IconButton: FC<Props> = ({
  type = 'button',
  className,
  isDisabled = false,
  icon,
  onClick,
}) => {
  const fullClassName = getValidClasses(styles.button, className);

  return (
    <button
      className={fullClassName}
      type={type}
      onClick={onClick}
      disabled={isDisabled}
    >
      <Icon iconName={icon} className={styles.icon} />
    </button>
  );
};

export { IconButton };
