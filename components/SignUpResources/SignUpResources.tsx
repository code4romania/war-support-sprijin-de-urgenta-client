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
  const [selectedResourceIds, setSelectedResourceIds] = useState([1])
  const { t } = useTranslation()

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const isChecked = event.target.checked
    const value = parseInt(event.target.value, 10)

    if (isChecked && !selectedResourceIds.includes(value))
      setSelectedResourceIds([...selectedResourceIds, value])
    else if (!isChecked && selectedResourceIds.includes(value))
      setSelectedResourceIds(selectedResourceIds.filter((id) => id !== value))
  }

  return (
    <div className="flex flex-col">
      <h3 className="mb-2">{t('signup.resources.offer')} *</h3>
      {CATEGORIES.map(({ id, translationKey }) => (
        <Checkbox
          onChange={(event) => handleChange(event)}
          key={id}
          name="resource"
          value={id}
          checked={selectedResourceIds.includes(id)}
        >
          {t(translationKey)}
        </Checkbox>
      ))}
      {selectedResourceIds.map((id) => (
        <div key={id} className={clsx('w-full')}>
          {resourceTypeBuilder(id)}
        </div>
      ))}

      <div className={clsx('w-full lg:w-2/5', 'text-xs')}>
        <p className="py-3">{t('signup.resources.gdpr')}*</p>
        <Checkbox name="da">Da</Checkbox>
      </div>
    </div>
  )
}

export default SignUpResources
