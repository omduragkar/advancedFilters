import React from "react";

export type Tstate = {
  filterData: {
    mod3: never[];
    mod4: never[];
    mod5: never[];
    mod6: never[];
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
};

export type Tdispatch= React.Dispatch<any>;
