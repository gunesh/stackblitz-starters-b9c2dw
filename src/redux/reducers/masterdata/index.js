// import external modules
import { combineReducers } from "redux";
// import internal(own) modules
import packages from "./package";
import auctionCategory from './auctionCategory';
import banner from './banner';
import content from "./content";
import contactContent from "./contactContent";
import howToPlayContent from "./howToPlayContent";
import termContent from "./termContent"
import translateLanguages from "./translateLanguages";
import settingdata from './settingData';
export default combineReducers({
    packages,
    auctionCategory,
    banner,
    content,
    contactContent,
    howToPlayContent,
    termContent,
    translateLanguages,
    settingdata
});