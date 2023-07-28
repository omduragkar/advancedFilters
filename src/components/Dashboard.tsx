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
import { checkforDefault } from "../helpers/checkForDefault";
const Dashboard = () => {
  const filterContext = useSelector(selectFilter);
  const dispatch = useDispatch();
  const onSelectChange = (selectedInput: string[], key: String) => {
    dispatch(
      UPDATE_FILTER({
        key: key as TcolumnStrings,
        value: selectedInput,
      })
    );
  };
  const getKeys = () => Object.keys(filterContext.filterData);
  const applyFilters = () => {
    // console.log("{applying filter}");
    let newData = [...filterContext.data];
    if (checkforDefault(filterContext)) {
      dispatch(UPDATE_FILTERED_DATA(newData));
    } else {
      columnKeys.forEach((key) => {
        if (filterContext.filterData[key as TcolumnStrings].length > 0) {
          newData = newData.filter((item) =>
            filterContext.filterData[key as TcolumnStrings].includes(
              String(item[key as TcolumnStrings])
            )
          );
        }
      });
      dispatch(UPDATE_FILTERED_DATA(newData));
    }
    changeFilter(newData);
  };
  // console.log({ filterContext });
  const changeFilter = (
    filteredData: {
      number: number;
      mod3: number;
      mod4: number;
      mod5: number;
      mod6: number;
    }[]
  ) => {
    let filterSelect = {
      ...filterContext.filterData,
    };
    if (checkforDefault(filterContext)) {
      // console.log("Default check");
      dispatch(UPDATE_FILTER_DATA(INITIALVALUE.filterOptions));
    } else {
      let valuestocheck = columnKeys.filter(
        (elm) => filterContext.filterData[elm as TcolumnStrings].length != 0
      );

      columnKeys.forEach((elm) => {
        let impcheck = valuestocheck.find((v) => v == elm);
        // console.log({ impcheck });
        let addtoSet = [];
        let checkData = filterContext.data;
        if (impcheck) {
          let tocheck = valuestocheck.filter((v) => v != elm);
          if (tocheck.length == 0) {
            addtoSet = INITIALVALUE.filterOptions[elm as TcolumnStrings].filter(
              (el) =>
                !filterContext.filterData[elm as TcolumnStrings].includes(el)
            );
          } else {
            checkData = checkData.filter((data) => {
              return tocheck.every((key) =>
                filterContext.filterOptions[key as TcolumnStrings].includes(
                  String(data[key as TcolumnStrings])
                )
              );
            });
            addtoSet = Array.from(
              new Set(checkData.map((v) => String(v[elm as TcolumnStrings])))
            );
            // console.log({ addtoSet });
          }
        } else {
          checkData = filteredData;
          // console.log({ checkData, elm });
          addtoSet = Array.from(
            new Set(checkData.map((v) => String(v[elm as TcolumnStrings])))
          );
          // console.log({ addtoSet, elm, checkData });
        }
        filterSelect[elm as TcolumnStrings] = addtoSet;
      });
      // console.log({
      //   filterSelect,
      // });

      // console.log({ filterSelect });
      dispatch(UPDATE_FILTER_DATA(filterSelect));
      // dispatch(UPDATE_FILTER_DATA(filterSelect));
    }
  };
  useEffect(() => {
    applyFilters();
  }, [filterContext.filterData]);

  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          paddingBottom: "1rem",
          alignItems: "center",
          gap: "0.5rem",
        }}
      >
        {getKeys()?.map((values) => (
          <div>
            <FilterSelect
              key={Math.random()}
              options={filterContext.filterOptions[values as TcolumnStrings]}
              placeholder={`Select for ${values}`}
              onSelectChange={onSelectChange}
              columnKey={values as TcolumnStrings}
              selectedValues={
                filterContext.filterData[values as TcolumnStrings]
              }
            />
          </div>
        ))}
      </div>
      <DataTableComponent data={filterContext.filteredData} />
    </div>
  );
};

export default Dashboard;
