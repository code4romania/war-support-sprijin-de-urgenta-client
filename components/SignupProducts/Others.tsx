import Checkbox from "@/components/Form/Checkbox";
import Textarea from "@/components/Form/Textarea";
import { FC } from "react";
import { useTranslation } from "react-i18next";

const Others: FC = () => {
  const { t } = useTranslation();

  return (
    <div className="flex">
      <Checkbox
        className={"mr-5 self-start"}
        name={`products_others`}
      >
        {t('signup.products.others')}
      </Checkbox>
      <Textarea name="products_others_content"/>
    </div>
  )
}

export default Others;
