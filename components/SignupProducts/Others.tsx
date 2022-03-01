import Checkbox from "@/components/Form/Checkbox";
import Textarea from "@/components/Form/Textarea";
import { FC } from "react";
import { useTranslation } from "react-i18next";

const Others: FC = () => {
  const { t } = useTranslation();

  return (
    <div className="flex">
      <Checkbox>
        {t('signup.products.others')}
      </Checkbox>
      <Textarea />
    </div>
  )
}

export default Others;
