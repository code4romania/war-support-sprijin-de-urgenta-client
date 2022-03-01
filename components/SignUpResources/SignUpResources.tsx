import clsx from 'clsx'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'

import Checkbox from '../Form/Checkbox'
import SignUpProducts from '../SignUpProducts'
import SignupVolunteering from '../SignupVolunteering'

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
    2: () => <SignUpProducts />,
    3: () => <SignupVolunteering />,
    4: () => <div>{'Others component'}</div>,
    default: () => <div>{'Others component'}</div>,
  }
  return id ? dictionary[id as keyof typeof dictionary]() : dictionary.default()
}

const SignUpResources = () => {
  const [selectedResourceIds, setSelectedResourceIds] = useState<number[]>([])
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
    <div className="space-y-4">
      <div className="flex flex-col px-8 rounded-md py-7 bg-blue-50">
        <h3 className="mb-4 text-lg font-semibold">
          {t('signup.resources.offer')} *
        </h3>
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
        <p className="mt-8 text-sm font-semibold text-gray-500">
          {t('signup.resources.fillInDetails')}
        </p>
      </div>
      {selectedResourceIds.map((id) => (
        <div key={id} className={clsx('w-full')}>
          {resourceTypeBuilder(id)}
        </div>
      ))}
    </div>
  )
}

export default SignUpResources
