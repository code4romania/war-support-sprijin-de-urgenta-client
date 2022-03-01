import clsx from 'clsx'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'

import Checkbox from '../Form/Checkbox'
import Radio from '../Form/Radio'

interface ICategory {
  name: string
  id: number
  translationKey: string
}

// TODO - Link this with api call (hardcoded for the moment).
const CATEGORIES: ICategory[] = [
  {
    name: 'Servicii',
    id: 1,
    translationKey: 'services',
  },
  {
    name: 'Produse',
    id: 2,
    translationKey: 'products',
  },
  {
    name: 'Voluntariat',
    id: 3,
    translationKey: 'volunteer',
  },
  {
    name: 'Altele',
    id: 4,
    translationKey: 'others',
  },
]

// TODO - Add here component accordingly with the selection
const resourceTypeBuilder = (id: number) => {
  const dictionary = {
    1: () => <div>{'Services component'}</div>,
    2: () => <div>{'Products component'}</div>,
    3: () => <div>{'Volunteer component'}</div>,
    4: () => <div>{'Others component'}</div>,
    default: () => <div>{'Others component'}</div>,
  }
  return id ? dictionary[id as keyof typeof dictionary]() : dictionary.default()
}

const SignUpResources = () => {
  const { t } = useTranslation()
  const [selectedResourceId, setSelectedResourceId] = useState(1)
  return (
    <div className="flex flex-col">
      <h3 className="mb-2">{t('signup.resources.offer')} *</h3>
      {CATEGORIES.map(({ id, translationKey }) => (
        <Radio
          onChange={() => setSelectedResourceId(id)}
          key={id}
          name="resource"
          value={id}
          checked={id === selectedResourceId}
        >
          {t(translationKey)}
        </Radio>
      ))}
      <div className={clsx('w-full')}>
        {resourceTypeBuilder(selectedResourceId)}
      </div>
      <div className={clsx('w-full lg:w-2/5', 'text-xs')}>
        <p className="py-3">{t('signup.resources.gdpr')}*</p>
        <Checkbox>Da</Checkbox>
      </div>
    </div>
  )
}

export default SignUpResources
