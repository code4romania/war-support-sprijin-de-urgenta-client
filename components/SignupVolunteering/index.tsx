import {FC} from "react";
import clsx from "clsx";
import {useTranslation} from "react-i18next";
import Checkbox from "@/components/Form/Checkbox";
import CheckboxWithDescription from "@/components/SignupVolunteering/CheckboxWithDescription";
import Textarea from "@/components/Form/Textarea";

const SignupVolunteering: FC = () => {
  const { t } = useTranslation();
  return (
    <div className={clsx('bg-blue-100 bg-opacity-50 rounded-md p-4')}>
      <h2 className="mb-8">{t('signup.volunteering.header')}</h2>
      <div className="max-w-xs">
        <CheckboxWithDescription
          name="volunteering_resource"
          value="psychologist"
        >
          {t('signup.volunteering.psychologist')}
        </CheckboxWithDescription>
        <CheckboxWithDescription
          name="volunteering_resource"
          value="medic"
        >
          {t('signup.volunteering.medic')}
        </CheckboxWithDescription>
        <CheckboxWithDescription
          name="volunteering_resource"
          value="nurse"
        >
          {t('signup.volunteering.nurse')}
        </CheckboxWithDescription>
        <CheckboxWithDescription
          name="volunteering_resource"
          value="lawyer"
        >
          {t('signup.volunteering.lawyer')}
        </CheckboxWithDescription>
        <CheckboxWithDescription
          name="volunteering_resource"
          value="cook"
        >
          {t('signup.volunteering.cook')}
        </CheckboxWithDescription>
        <CheckboxWithDescription
          name="volunteering_resource"
          value="manager"
        >
          {t('signup.volunteering.manager')}
        </CheckboxWithDescription>
        <CheckboxWithDescription
          name="volunteering_resource"
          value="translator"
        >
          {t('signup.volunteering.translator')}
        </CheckboxWithDescription>
        <Checkbox
          name="volunteering_resource"
          value="other"
        >
          {t('signup.volunteering.other')}
        </Checkbox>
        <Textarea
          name="volunteering_resource_other_description"
          className={clsx('ml-5')}
        />
      </div>

    </div>
  );
}

export default SignupVolunteering;
