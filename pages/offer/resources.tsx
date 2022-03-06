import { NextPage } from 'next'
import FormPage from '@/components/FormPage'
import { FormPageProps } from '@/components/FormPage/FormPage'

const OfferForm: NextPage = () => {
  return <FormPage type={FormPageProps.Offer} />
}

export async function getStaticProps() {
  return {
    props: {
      protected: true,
      redirectTo: '/sign-up/offer',
    },
  }
}

export default OfferForm
