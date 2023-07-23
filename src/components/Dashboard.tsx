import { useDispatch, useSelector } from "react-redux";
import { UPDATE_FILTER, UPDATE_FILTER_DATA, selectFilter } from "../redux/filterSlice";
import { useEffect, useState } from "react";
import { TcolumnStrings } from "../types/Tcolumn";
import FilterSelect from "./FilterSelect";
import DataTableComponent from "./DataTable";
const Dashboard = () => {
  const filterContext = useSelector(selectFilter);
  const dispatch = useDispatch();
  const onSelectChange = (selectedInput:string[], key:TcolumnStrings)=>{
    dispatch(UPDATE_FILTER({
      key,
      value:selectedInput
    }));
    
  }
  const getKeys = ()=>Object.keys(filterContext.filterData);
  const applyFilters = () => {
    // Get the keys of the filterContext
    const filterKeys = Object.keys(filterContext.filterData);
    
    // Apply filters to the data
    let newData = filterContext.data.filter((item) => {
      
      const returnVal =  filterKeys.every((key) => {
        // If the filter data is empty, keep the item
        if (filterContext.filterData[key].length === 0) {
          return true;
        }
        // Check if the item's value for the key is included in the selected filter values
        return filterContext.filterData[key].includes(String(item[key]));
      });
      return returnVal; 
    });
    dispatch(UPDATE_FILTER_DATA(newData))
  };

  useEffect(() => {
    applyFilters();
  }, [filterContext.filterData]);

  return (
    <div>
      {getKeys()?.map((values)=>(
        <FilterSelect
        key={Math.random()}
        options={filterContext.filterOptions[values]}
        placeholder = {`Select for ${values}`}
        onSelectChange={onSelectChange}
        columnKey={values}
        selectedValues={filterContext.filterData[values]}
      />
      ))}
      <DataTableComponent data={ filterContext.filteredData}/>
    </div>
  )
}

export default Dashboard