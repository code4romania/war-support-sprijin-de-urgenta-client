import Dropdown from "../Form/Dropdown";
import { useTranslation } from 'react-i18next'
import { useEffect, useState } from "react";

export interface IUserTypeFormProps {
  defaultProp: string;
}

const UserTypeForm = ({}: IUserTypeFormProps) => {
  const { t } = useTranslation();
  const [options, setOptions] = useState<null | string[]>(null);

  useEffect(() => {
    if (options === null) {
      setOptions(t("signUp.userType.options"))
    }
  });

  return(
    <section>
      <form>
        <Dropdown 
          name="user-type-dropdown"
          label={t("signUp.userType.type")}
        >
          {options?.map((option: string) => {
            return(
              <option>
                {option}
              </option>
            )
          })}
        </Dropdown>
      </form>
    </section>
  )
};

  export default UserTypeForm;
