import Link from "next/link";

export interface IFormEntryButtonProps {
  text: string;
  route: string;
}

const FormEntryButton = ({ text, route }: IFormEntryButtonProps) => {
  return (
    <Link href={route}>
      <div className='cursor-pointer bg-sky-500 rounded md px-12 py-7 flex justify-center'>
        <span className='text-2xl font-semibold text-white'>
          {text}
        </span>
      </div>
    </Link>
  );
};

export default FormEntryButton;
