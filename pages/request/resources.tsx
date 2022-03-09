import { NextPage } from 'next'
import FormPage from '@/components/FormPage'
import { FormPageProps } from '@/components/FormPage/FormPage'

const RequestForm: NextPage = () => {
  return <FormPage type={FormPageProps.Request} />
}

export async function getStaticProps() {
  return {
    props: {
      protected: true,
      redirectTo: '/sign-up/request',
    },
  }
}

export default RequestForm
