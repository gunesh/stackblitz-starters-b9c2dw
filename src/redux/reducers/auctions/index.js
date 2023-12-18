// import external modules
import { combineReducers } from "redux";
// import internal(own) modules
import auctions from "./auctions";
import auctionType from "./auctionType"
export default combineReducers({
    auctions,
    auctionType
});