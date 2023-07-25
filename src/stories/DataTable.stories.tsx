
import Dashboard from "../components/Dashboard";
import DataTableComponent from "../components/DataTable";

export default {
    title:"Components/Table",
    component: Dashboard,
}

export const dataTable = ()=> <DataTableComponent
data={[
    {
      "number": 12,
      "mod3": 0,
      "mod4": 0,
      "mod5": 2,
      "mod6": 0
    },
    {
      "number": 24,
      "mod3": 0,
      "mod4": 0,
      "mod5": 4,
      "mod6": 0
    },
    {
      "number": 36,
      "mod3": 0,
      "mod4": 0,
      "mod5": 1,
      "mod6": 0
    },
]}

 />