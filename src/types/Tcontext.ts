import React from "react";

export type Tstate = {
  filterData: {
    mod3: String[];
    mod4: String[];
    mod5: String[];
    mod6: String[];
  };
  filterOptions: {
    mod3: string[];
    mod4: string[];
    mod5: string[];
    mod6: string[];
  };
  data: {
    number: number;
    mod3: number;
    mod4: number;
    mod5: number;
    mod6: number;
  }[];
  filteredData: {
    number: number;
    mod3: number;
    mod4: number;
    mod5: number;
    mod6: number;
  }[];
};

export type Tdispatch = React.Dispatch<any>;
