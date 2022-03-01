import { FC } from "react";
import Checkbox from "@/components/Form/Checkbox";
import { useTranslation } from "react-i18next";
import Input from "@/components/Form/Input";
import Textarea from "@/components/Form/Textarea";
import Dropdown from "@/components/Form/Dropdown";
import Location from "@/components/SignupProducts/common/Location";

const TextileProduct: FC = () => {
  const { t } = useTranslation();

  return (
    <div>
      <Checkbox>
        Haine:
      </Checkbox>
      <div>
        <Checkbox>
          Femei
        </Checkbox>
        <Checkbox>
          Barbati
        </Checkbox>
        <Checkbox>
          Copii
        </Checkbox>
        <Input label="varsta:" />
      </div>

      <Checkbox>
        Paturi
      </Checkbox>

      <Checkbox>
        Cuverturi
      </Checkbox>

      <Checkbox>
        Saci de dormit
      </Checkbox>

      <div>
        <Checkbox>
          Altele:
        </Checkbox>
        <Textarea />
      </div>

      <div>
        <Input
          label="Cantitate:"
          type="number"
          labelPosition="horizontal"
        />
        <Input label="ambalaj" labelPosition="horizontal" />
      </div>

      <Location />
    </div>
  )
}

export default TextileProduct;
