import React from "react";
import { EmployeeStore } from "./EmployeeStore";

export const stores = {
    employeeStore: new  EmployeeStore(),
}

export const StoreContext = React.createContext(stores);
export const useStores = () => React.useContext(StoreContext);