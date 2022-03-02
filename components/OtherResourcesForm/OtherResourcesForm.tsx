import clsx from "clsx";
import { useTranslation } from "react-i18next";
import Textarea from "../Form/Textarea";

const OtherResourcesForm = ({}) => {
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
    className={clsx(
      'w-full'
    )}
    />
  </section>
  );
};

export default OtherResourcesForm;
