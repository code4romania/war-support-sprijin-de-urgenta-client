import clsx from 'clsx'
import Link from 'next/link'

export interface IFormEntryButtonProps {
  text: string
  route: string
}

const FormEntryButton = ({ text, route }: IFormEntryButtonProps) => {
  return (
    <Link href={route} passHref>
      <div
        className={clsx(
          'cursor-pointer rounded md px-12 py-11 flex justify-center',
          'bg-blue-900 text-white',
          'hover:bg-blue-100 hover:text-black',
          'hover:transition-colors hover:duration-200'
        )}
      >
        <span className="text-2xl font-semibold">{text}</span>
      </div>
    </Link>
  )
}

export default FormEntryButton
