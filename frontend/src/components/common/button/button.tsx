import { FC } from 'common/types/types';
import { Icon } from 'components/common/common';
import { IconName } from 'common/enums/enums';
import { getValidClasses } from 'helpers/helpers';
import styles from './styles.module.scss';

type Props = {
  label: string;
  type?: 'submit' | 'button';
  style?: 'primary';
  className?: string;
  isRounded?: boolean;
  icon?: IconName;
  onClick?: React.MouseEventHandler<HTMLElement>;
  isDisabled?: boolean;
};

const Button: FC<Props> = ({
  label,
  type = 'button',
  style = 'primary',
  className,
  isRounded = true,
  isDisabled = false,
  icon,
  onClick,
}) => {
  const fullClassName = getValidClasses(
    styles.button,
    styles[`button-style-${style}`],
    isRounded && styles['button-rounded'],
    className,
  );

  return (
    <button
      className={fullClassName}
      type={type}
      onClick={onClick}
      disabled={isDisabled}
    >
      {icon && <Icon iconName={icon} className={styles.icon} />}
      {label}
    </button>
  );
};

export { Button };
