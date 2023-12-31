import Multiselect from "multiselect-react-dropdown";
import { TcolumnStrings } from "../types/Tcolumn";

const FilterSelect = ({options, placeholder, onSelectChange, columnKey, selectedValues, }:TfilterSelect) => {
   return (
    <div>
      <Multiselect
        id="css_custom"
        style={{
          multiselectContainer: {
            color: 'black'
          },
        }}
        isObject={false}
        onRemove={(data)=>onSelectChange(data, columnKey)}
        onSelect={(data)=>onSelectChange(data, columnKey)}
        options={options}
        placeholder={placeholder}
        selectedValues={selectedValues}
      />
    </div>
  );
};

type TfilterSelect = {
    options:(string)[],
    placeholder:string,
    columnKey: TcolumnStrings,
    onSelectChange: (selectedInput: string[], key: String) => void,
    selectedValues: String[]
}
export default FilterSelect;
