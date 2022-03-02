import type { NextPage } from 'next'
import Button from '@/components/Button'
import clsx from 'clsx'
import { useTranslation } from 'react-i18next'
import Input from '@/components/Form/Input'
import { useForm } from 'react-hook-form'
import { useMemo, useState } from 'react'
import { authenticate } from '@/store/reducers/auth'
import { useAppDispatch } from '@/hooks/useAppDispatch'
import { useRouter } from 'next/router'

const LoginPage: NextPage = () => {
  const [serverErrors, setServerErrors] = useState<{ [key: string]: string[] }>(
    {}
  )
  const router = useRouter()
  const { t } = useTranslation()
  const dispatch = useAppDispatch()
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm()

  // TODO: The actual validation logic will probably be handled by YUP
  const constraints = useMemo(() => {
    return {
      username: {
        required: t('validation.required'),
      },
      password: {
        required: t('validation.required'),
      },
    }
  }, [t])

  const onSubmit = async (values: any) => {
    const res = await dispatch(authenticate(values))

    if (res?.errors) {
      setServerErrors(res.errors)
    } else if (res?.access_token) {
      router.push('/sign-up')
    }
  }

  const handleChange = () => {
    setServerErrors({})
  }

  return (
    <main className={clsx('grid place-items-center', 'py-28')}>
      <section className="space-y-16 w-96">
        <form className="flex flex-col gap-3" onSubmit={handleSubmit(onSubmit)}>
          <Input
            label={t('login.userLabel')}
            errors={errors['username']}
            {...register('username', constraints['username'])}
            onChange={handleChange}
          />
          <Input
            type="password"
            label={t('login.passwordLabel')}
            errors={errors['password']}
            {...register('password', constraints['password'])}
            onChange={handleChange}
          />
          <a href="#" className="self-end text-gray-300 mt-[-16px]">
            {t('login.forgotPass')}
          </a>
          {serverErrors['non_field_errors']?.map((error: string) => (
            <div className={'bg-red-50 p-1 px-2 text-white'}>{error}</div>
          ))}
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
