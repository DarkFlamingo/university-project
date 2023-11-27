import { UseFormHandleSubmit } from 'react-hook-form';
import { FormControlValues } from './form-control-values.type';

type FormHandleSubmit<T extends FormControlValues> = UseFormHandleSubmit<T>;

export { type FormHandleSubmit };
