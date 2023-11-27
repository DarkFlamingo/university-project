import { UseFormWatch } from 'react-hook-form';
import { FormControlValues } from './form-control-values.type';

type FormWatch<T extends FormControlValues> = UseFormWatch<T>;

export { type FormWatch };
