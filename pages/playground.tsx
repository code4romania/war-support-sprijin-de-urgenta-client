import clsx from 'clsx'
import type { NextPage } from 'next'
import { useTranslation } from 'react-i18next'
// import Checkbox from "@/components/Form/Checkbox";
// import Radio from "@/components/Form/Radio";
import Textarea from "@/components/Form/Textarea";

const HomePage: NextPage = () => {
  const { t } = useTranslation()
  return (
    <main className={clsx('layout h-full')}>
      {/*<Checkbox name="type" value="services">Servicii</Checkbox>*/}
      {/*<Checkbox name="type_a" value="services">Servicii</Checkbox>*/}
      {/*<Checkbox name="type_b" value="services">Servicii</Checkbox>*/}
      {/*<Checkbox name="type_c" value="services">Servicii</Checkbox>*/}

      {/*<Radio name="radio_type" value="services">Servicii</Radio>*/}
      {/*<Radio name="radio_type" value="Produse">Produse</Radio>*/}
      {/*<Radio name="radio_type" value="Voluntariat">Voluntariat</Radio>*/}
      {/*<Radio name="radio_type" value="Altele">Altele</Radio>*/}

      <Textarea
        name="details"
      />
    </main>
  )
}

export default HomePage
