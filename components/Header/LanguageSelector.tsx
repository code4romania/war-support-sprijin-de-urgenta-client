import Dropdown from '@/components/Form/Dropdown'
import { ChangeEvent, FC, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { LanguageCode, setLocale } from '../../store/reducers/locale'
import i18n from 'i18next'

interface ILocaleState {
  locale: string
}

const LanguageSelector: FC = () => {
  const dispatch = useDispatch()

  const currentLocale = useSelector((state: ILocaleState) => {
    return state.locale
  })

  useEffect(() => {
    i18n.changeLanguage(currentLocale)
  }, [currentLocale])

  const onChange = (e: ChangeEvent<HTMLSelectElement>) => {
    dispatch(setLocale(e.target.value as LanguageCode))
  }

  return (
    <Dropdown
      name="locale"
      id="locale"
      onChange={onChange}
      value={currentLocale}
      noValidations={true}
    >
      <option value="ro">RO</option>
      <option value="en">EN</option>
      <option value="uk">UK</option>
      <option value="ru">RU</option>
    </Dropdown>
  )
}

export default LanguageSelector
