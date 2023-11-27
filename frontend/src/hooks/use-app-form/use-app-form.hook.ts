import { useForm } from 'react-hook-form';
import {
  FormControl,
  FormControlErrors,
  FormControlValues,
  ValidationSchema,
  FormHandleSubmit,
  FormWatch,
} from 'common/types/types';
import { getFormValidationResolver } from 'helpers/helpers';

type UseAppFormArgs = {
  defaultValues: Record<string, unknown>;
  validationSchema?: ValidationSchema;
};

type UseAppFormResult<T extends FormControlValues = FormControlValues> = {
  control: FormControl;
  errors: FormControlErrors;
  handleSubmit: FormHandleSubmit<T>;
  watch: FormWatch<T>;
};

const useAppForm = <T extends FormControlValues = FormControlValues>({
  validationSchema,
  defaultValues,
}: UseAppFormArgs): UseAppFormResult<T> => {
  const {
    control,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<FormControlValues>({
    defaultValues,
    resolver: validationSchema
      ? getFormValidationResolver(validationSchema)
      : undefined,
  });

  return {
    control,
    errors,
    handleSubmit: handleSubmit as FormHandleSubmit<T>,
    watch: watch as FormWatch<T>,
  };
};

export { useAppForm };
