
import { columnKeys } from "../data/constants";
import { TcolumnStrings } from "../types/Tcolumn";
import { Tstate } from "../types/Tcontext";

export const checkforDefault = (filterContext:Tstate) =>{
    return columnKeys.reduce((previousValue: boolean, currValue: string) => {
      if (previousValue) {
        if (filterContext.filterData[currValue as TcolumnStrings].length == 0) {
          return true;
        } else {
          return false;
        }
      } else {
        return false;
      }
    }, true);
}