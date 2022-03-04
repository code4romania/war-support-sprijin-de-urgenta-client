import { NextPage } from 'next'
import FormPage from '@/components/FormPage'

const RequestForm: NextPage = () => {
  return <FormPage type={'request'} />
}

export async function getStaticProps() {
  return {
    props: {
      protected: true,
      redirectTo: '/sign-up/resources'
    },
  }
}

export default RequestForm
