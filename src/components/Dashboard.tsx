import { useDispatch, useSelector } from "react-redux";
import {
  INITIALVALUE,
  UPDATE_FILTER,
  UPDATE_FILTERED_DATA,
  UPDATE_FILTER_DATA,
  selectFilter,
} from "../redux/filterSlice";
import { useEffect } from "react";
import { TcolumnStrings } from "../types/Tcolumn";
import FilterSelect from "./FilterSelect";
import DataTableComponent from "./DataTable";
import { columnKeys } from "../data/constants";
const Dashboard = () => {
  const filterContext = useSelector(selectFilter);
  const dispatch = useDispatch();
  const onSelectChange = (selectedInput: string[], key: TcolumnStrings) => {
    dispatch(
      UPDATE_FILTER({
        key,
        value: selectedInput,
      })
    );
  };
  const checkforDefault = ()=>(columnKeys.reduce(
    (previousValue: boolean, currValue: string) => {
      if (previousValue) {
        if (filterContext.filterData[currValue].length == 0) {
          return true;
        } else {
          return false;
        }
      } else {
        return false;
      }
    },
    true
  ));
  const getKeys = () => Object.keys(filterContext.filterData);
  const applyFilters = () => {
    // Get the keys of the filterContext
    // const filterKeys = Object.keys(filterContext.filterData);
    
    // Apply filters to the data
    // filterKeys.map()
    console.log("{applying filter}")
    let newData = [...filterContext.data];
    if(checkforDefault())
    {
      dispatch(UPDATE_FILTERED_DATA(newData));

    }else{
      columnKeys.map(key=>{
        if(filterContext.filterData[key].length > 0)
        {
          newData = newData.filter((item) => filterContext.filterData[key].includes(String(item[key])))
        }
        console.log({newData})
      });
      dispatch(UPDATE_FILTERED_DATA(newData));
    }
    changeFilter(newData);
    
  };
  console.log({filterContext})
  const changeFilter = (filteredData) => {
    let filterSelect = {
      ...filterContext.filterData
    };
    // console.log({ checkforDefault });
    if (checkforDefault()) {
      console.log("Default check")
      dispatch(UPDATE_FILTER_DATA(INITIALVALUE.filterOptions));
    } else {
      
      let valuestocheck = columnKeys.filter((elm:TcolumnStrings)=>filterContext.filterData[elm].length != 0)

      columnKeys.forEach((elm:TcolumnStrings) => {
        let impcheck = valuestocheck.find(v=>v == elm);
        console.log({impcheck})
        let addtoSet = [];
        let checkData = [...filterContext.data];
        if(impcheck){
          let tocheck = valuestocheck.filter(v=>v != elm);
          if(tocheck.length == 0){
            addtoSet = INITIALVALUE.filterOptions[elm].filter(el=>!filterContext.filterData[elm].includes(el));
          }else{
            checkData = checkData.filter(data=>{
              return tocheck.every(key=>filterContext.filterOptions[key].includes(String(data[key])))
            })
            addtoSet = Array.from(new Set(checkData.map(v=>String(v[elm]))));
            console.log({addtoSet});
          }
        }else{
          checkData = filteredData;
          console.log({checkData, elm});
          addtoSet = Array.from(new Set(checkData.map(v=>String(v[elm]))));
          console.log({addtoSet, elm, checkData});
        }
        filterSelect[elm] = addtoSet;
        // if(valuestocheck.length == 1 && valuestocheck[0] == elm)  {
        // }else{
        //   let newSet = new Set();
        //   filterContext.data.map(vals=>{
        //     // valuestocheck.map(val=>{
        //     //   if(val!=elm)
        //     //   {
        //     //     if(filterContext.filterData[val].length > 0 && filterContext.filterData[val].includes(String(vals[val]))){
        //     //       console.log({
        //     //         vals,
        //     //         elm,
        //     //         tr:filterContext.filterData[val].includes(String(vals[val])),
        //     //         ltr:filterContext.filterData[val],
        //     //         rtr:String(vals[val]),
        //     //         val,
        //     //       })
        //     //       newSet.add(vals[elm]);
        //     //     }
        //     //   }
        //     // })
        //   })
        //   console.log({newSet, filterContext})
        //   addtoSet = Array.from(newSet);
        // }
        // filterSelect[elm] = addtoSet; 
      })
      console.log({
        filterSelect
      })
      
      console.log({filterSelect})
      dispatch(UPDATE_FILTER_DATA(filterSelect));
      // dispatch(UPDATE_FILTER_DATA(filterSelect));

    }}
      //   filterSelect.filter((values) => {
      //     let newSet = new Set();
      //     columnKeys.map((val) => {
      //       if (val != elm) {
      //         if (filterContext?.filterData[val]?.length > 0) {
      //           if (
      //             filterContext?.filterData[val]?.includes(String(values[val]))
      //           ) {
      //             newSet.add(values[elm]);
      //           }
      //         } else {
      //           newSet.add(values[elm]);
      //         }
      //       }
      //     });
      //   });
      //   if (filterContext?.filterData[elm]?.length > 0) {
      //     newArray[elm] = filterContext?.filterData[elm];
      //     filterSelect = filterSelect.filter((vals) => {
      //       return filterContext?.filterData[elm].includes(String(vals[elm]));
      //     });
      //   } else {
      //     let newObj = new Set();
      //     filterSelect.forEach((dat) => {
      //       dat[elm] && newObj.add(String(dat[elm]));
      //     });
      //     newArray[elm] = Array.from(newObj) ? Array.from(newObj) : [];
      //   }
      // });
      // dispatch(UPDATE_FILTER_DATA(newArray));
  //   }
  // };

  useEffect(() => {
    applyFilters();
  }, [filterContext.filterData]);

  return (
    <div>
      {getKeys()?.map((values) => (
        <FilterSelect
          key={Math.random()}
          options={filterContext.filterOptions[values]}
          placeholder={`Select for ${values}`}
          onSelectChange={onSelectChange}
          columnKey={values}
          selectedValues={filterContext.filterData[values]}
        />
      ))}
      <DataTableComponent data={filterContext.filteredData} />
    </div>
  );
};

export default Dashboard;
