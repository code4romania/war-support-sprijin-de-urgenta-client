import Input from "@/components/Form/Input";
import Dropdown from "@/components/Form/Dropdown";

const BuildingMaterials: FC = () => {
  return (
    <div>
      <Input label="Produs"/>
      <div>
        <Input type="number" label="Cantitate" />
        <Input label="Ambalaj" />
      </div>
      <div>
        <Dropdown label={"Locatie resursa:"}>
          <option>Cluj</option>
        </Dropdown>

        <Dropdown label="Localitate">
          <option>Cluj napoca</option>
        </Dropdown>
      </div>
    </div>
  )
}
export default BuildingMaterials;
