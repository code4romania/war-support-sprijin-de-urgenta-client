import { useTranslation } from 'react-i18next'

const SubHeader = ({}) => {
  const { t } = useTranslation('common')

  return (
    <section className="bg-[#EFC400] py-[10px] flex items-center w-full ">
      <div className="flex justify-end gap-1 mx-auto layout">
        <p className="font-base">
          {t('homepage.get_all_info_you_need')}{' '}
          <a
            href="https://www.dopomoha.ro"
            rel="noreferrer"
            target="_blank"
            className="font-bold underline underline-offset-2"
          >
            Dopomoha.ro
          </a>
        </p>
      </div>
    </section>
  )
}

export default SubHeader
