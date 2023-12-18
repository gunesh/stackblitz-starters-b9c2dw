import { combineReducers } from "redux";
// import internal(own) modules
import failOrderReports from "./failOrderReports";
import successOrderReports from "./successOrderReports";
import auctionAmount from "./amountReport";
import liveAuction from "./liveAuction";
import EpisodeLevelReports from "./episodeReports";
import AuctionLevelReports from "./AuctionLevelReport";
import successProductOrder from './successProduct';
export default combineReducers({
    failOrderReports,
    successOrderReports,
    auctionAmount,
    liveAuction,
    EpisodeLevelReports,
    AuctionLevelReports,
    successProductOrder
});