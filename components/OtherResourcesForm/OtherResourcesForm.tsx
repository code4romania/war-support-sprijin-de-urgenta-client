import clsx from "clsx";
import { useTranslation } from "react-i18next";
import Textarea from "../Form/Textarea";

export interface IOtherResourcesFormProps {
  currentValue: string,
  handleChange: (value: string) => void,
}

const OtherResourcesForm = ({ currentValue, handleChange }: IOtherResourcesFormProps) => {
  const { t } = useTranslation();

  return( 
  <section
  className={clsx(
    'container grid place-items-start',
    'bg-blue-50 rounded',
    'mx-auto px-8 py-7',
  )}
  >
    <h3 className="text-sm">{`${t('describeTheResource')}:`}</h3>
    <Textarea 
    name="Other resources"
    value={currentValue}
    onChange={(e) => {
      handleChange(e.target.value);
    }}
    className={clsx(
      'w-full'
    )}
    />
  </section>
  );
};

export default OtherResourcesForm;
