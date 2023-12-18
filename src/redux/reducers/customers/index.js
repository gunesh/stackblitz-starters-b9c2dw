// import external modules
import { combineReducers } from "redux";
// import internal(own) modules
import customers from "./customers";
import customerProfile from "./customerProfile";
import callHistory from "./callhistory";
import purchasehistory from "./purchaseHistory";
export default combineReducers({
    customers,
    customerProfile,
    callHistory,
    purchasehistory
});