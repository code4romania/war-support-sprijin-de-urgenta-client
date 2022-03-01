import type { NextPage } from 'next'
import Button from '@/components/Button'
import clsx from 'clsx'
import { useTranslation } from 'react-i18next'
import Input from '@/components/Form/Input';
import { useForm } from "react-hook-form";
import { useMemo } from "react";

const LoginPage: NextPage = () => {
  const { t } = useTranslation();

  const { handleSubmit, register, formState: { errors } } = useForm();

  // TODO: The actual validation logic will probably be handled by YUP
  const constraints = useMemo(() => {
    return ({
      userName: {
        required: t('validation.required'),
      },
      password: {
        required: t('validation.required'),
      }
    });
  }, [t]);

  const onSubmit = (values: unknown) => {
    console.log('values', values)
  }

  return (
    <main className={clsx('grid place-items-center', 'py-28')}>
      <section className="space-y-16 w-96">
        <form className="flex flex-col gap-3" onSubmit={handleSubmit(onSubmit)}>
          <Input
            label={t('login.userLabel')}
            errors={errors['userName']}
            {...register('userName', constraints['userName'])}
          />
          <Input
            type="password"
            label={t('login.passwordLabel')}
            errors={errors['password']}
            {...register('password', constraints['password'])}
          />
          <a href="#" className="self-end text-gray-300 mt-[-16px]">
            {t('login.forgotPass')}
          </a>
          <div className="space-y-4">
            <Button
              type="submit"
              text={t('login.submit')}
              size="medium"
              variant="primary"
            />
            <Button
              text={t('login.signUp')}
              size="medium"
              variant="secondary"
            />
          </div>
        </form>
      </section>
    </main>
  )
}

export default LoginPage
