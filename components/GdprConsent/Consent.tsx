import clsx from "clsx";
import { ErrorOption, Path, UseFormRegister } from "react-hook-form";
import { useTranslation } from "react-i18next";
import Checkbox from "../Form/Checkbox";
import { InputElementProps } from "../Form/types";

export type IConsentProps<TFormValues> = {
  text: string;
  className?: string;
  name: Path<TFormValues>;
  errors?: ErrorOption
  register?: UseFormRegister<TFormValues>
} & Omit<InputElementProps, 'name'>

const Consent = <TFormValues extends Record<string, unknown>>({
  text,
  className,
  name,
  register,
  ...rest
}: IConsentProps<TFormValues>) => {
  const { t } = useTranslation();
  return (
    <div className={clsx(className)}>
      <p className={clsx('mb-4')}>{text}</p>
      <Checkbox name={name} {...register && register(name)} {...rest}>{t('yes')}</Checkbox>
    </div>
  )
};

export default Consent;