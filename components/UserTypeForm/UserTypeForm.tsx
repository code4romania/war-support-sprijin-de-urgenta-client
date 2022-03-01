import { useTranslation } from 'react-i18next'
import { ChangeEvent } from "react";
import { useDispatch } from "react-redux";
import { ActionType } from "@/store/reducers/steps";
import Dropdown from "../Form/Dropdown";
import { setUserType, UserType, userTypeOptions } from '@/store/reducers/signup';

const UserTypeForm = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
    dispatch(setUserType(e.target.value as UserType))
    dispatch({ type: ActionType.INCREASE })
  };

  return(
    <div
      className={`bg-blue-50 h-${userTypeOptions.length * 50 + 5} px-4 py-4 rounded-md`}
    >
      <Dropdown
        name="userType"
        label={t("signup.userType.type")}
        onChange={handleChange}
      >
        {
          userTypeOptions.map((
            option: UserType,
            idx: number
          ) => {
            return(
              <option
                key={`user-type-option-${idx}`}
                value={option}
              >
                {t(`signup.userType.options.${idx}`)}
              </option>
            )
          })
        }
      </Dropdown>
    </div>
  )
};

  export default UserTypeForm;
