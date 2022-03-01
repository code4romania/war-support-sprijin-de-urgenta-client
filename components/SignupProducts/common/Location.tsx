import Dropdown from "@/components/Form/Dropdown";
import { FC } from "react";

const Location: FC = () => {
  return (
    <div>
      <Dropdown label={"Locatie resursa:"}>
        <option>Cluj</option>
      </Dropdown>

      <Dropdown label="Localitate">
        <option>Cluj napoca</option>
      </Dropdown>
    </div>
  )
}

export default Location;
