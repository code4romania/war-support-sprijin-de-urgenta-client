import { NextPage } from 'next'
import FormPage from '@/components/FormPage'

const OfferForm: NextPage = () => {
  return <FormPage type={'offer'} />
}

export async function getStaticProps() {
  return {
    props: {
      protected: true,
      redirectTo: '/sign-up/offer'
    },
  }
}

export default OfferForm
