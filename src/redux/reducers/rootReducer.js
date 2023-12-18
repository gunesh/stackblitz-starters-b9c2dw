// import external modules
import { combineReducers } from "redux";
// import internal(own) modules
import authReducer from "./authindex";
import userReducer from "./users/";
import reportsReducer from "./reports/";
import masterdataReducer from "./masterdata/";
import bannerReducer from "./banner"
import auctionsReducer from "./auctions/";
import chanelReducer from "./chanels";
import showsReducer from "./shows";
import productReducer from "./products";
import episodeReducer from "./episode";
import uploadImgReducer from "./imageUpload"
import paymentReducer from "./payment";
import customerReducer from "./customers"
import languageReducer from "./languages"
import locationReducer from "./locations"
import notificationReducer from "./notification"  // smhkm2 new changes
import { reducer as toastrReducer } from "react-redux-toastr";

const rootReducer = combineReducers({
   userdata: userReducer,
   auctionsdata:auctionsReducer,
   reportsdata:reportsReducer,
   imageData:uploadImgReducer,
   chaneldata:chanelReducer,
   episodedata:episodeReducer,
   showsdata:showsReducer,
   productdata:productReducer,
   paymentdata:paymentReducer,
   bannerdata:bannerReducer,
   masterdata: masterdataReducer,
   auth: authReducer,
   languagedata:languageReducer,
   locationdata:locationReducer,
   customerData :customerReducer,
   notificationData :notificationReducer,  // smhkm2 new changes
   toastr: toastrReducer, // <- Mounted at toastr.
//    chatApp: chatReducer,
//    customizer: customizer
});

export default rootReducer;
