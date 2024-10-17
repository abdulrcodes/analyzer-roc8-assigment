import React, { createContext, useContext, useState } from "react";

const FilterContext = createContext();

export const FilterProvider = ({ children }) => {
  const [ageRange, setAgeRange] = useState("");
  const [gender, setGender] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  return (
    <FilterContext.Provider
      value={{
        ageRange,
        setAgeRange,
        gender,
        setGender,
        startDate,
        setStartDate,
        endDate,
        setEndDate,
      }}
    >
      {children}
    </FilterContext.Provider>
  );
};

export const useFilters = () => {
  return useContext(FilterContext);
};
