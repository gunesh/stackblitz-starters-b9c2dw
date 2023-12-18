// import external modules
import { combineReducers } from "redux";
// import internal(own) modules
import users from "./user";
import roles from "./role";

export default combineReducers({
    users,
    roles
});