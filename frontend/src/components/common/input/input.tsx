import { IconButton } from 'components/common/common';
import {
  FormControl,
  FormControlErrors,
  FormControlPath,
  FC,
  InputType,
} from 'common/types/types';
import { IconName } from 'common/enums/enums';
import { useFormControl } from 'hooks/hooks';
import { getValidClasses } from 'helpers/dom/dom';
import styles from './styles.module.scss';

type Props = {
  label: string;
  name: FormControlPath;
  control: FormControl;
  errors: FormControlErrors;
  type?: InputType;
  placeholder?: string;
  icon?: IconName;
  onIconClick?: React.MouseEventHandler<HTMLElement>;
};

const Input: FC<Props> = ({
  label,
  name,
  control,
  placeholder,
  type = 'text',
  icon,
  onIconClick,
}) => {
  const { field } = useFormControl({ name, control });

  return (
    <label className={styles.input}>
      <input
        {...field}
        type={type}
        placeholder={placeholder}
        className={getValidClasses(
          styles.inputField,
          icon && styles.inputFieldWithLogo,
        )}
      />
      {icon && (
        <IconButton icon={icon} className={styles.icon} onClick={onIconClick} />
      )}
      <span
        className={getValidClasses(
          styles.inputLabel,
          (field.value || placeholder) && styles.transformedLabel,
        )}
      >
        {label}
      </span>
    </label>
  );
};

export { Input };
