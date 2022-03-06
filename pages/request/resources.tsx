import { NextPage } from 'next'
import FormPage from '@/components/FormPage'

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
