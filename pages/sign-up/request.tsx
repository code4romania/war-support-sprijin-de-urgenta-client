import type { NextPage } from 'next'

import SignupPage from '@/components/SignupPage'
import { FormPageProps } from '@/components/FormPage/FormPage'

const SignUp: NextPage = () => {
  return <SignupPage resourceType={FormPageProps.Request} />
}

export default SignUp
