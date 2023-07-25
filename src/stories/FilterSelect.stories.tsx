import Dashboard from "../components/Dashboard";
import FilterSelect from "../components/FilterSelect";

export default {
    title:"Components/Filters",
    component: Dashboard,
}

export const FilterDiv = ()=> (
    <FilterSelect
    options={["1","2","3"]}
    placeholder="Select for mod3"
    onSelectChange={()=>{}}
    columnKey="mod3"
    selectedValues={["1"]}

    />)