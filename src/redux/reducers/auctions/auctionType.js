// import internal(own) modules
//import userData from './userData';
import { SET_AUCTION_TYPE,GET_AUCTION_CATEGORIES } from '../../actions/auctions/auctionTypeAction';
const initState = {
    auctionType: [],
    auctionsCategories:[]
};

const auctionTypeReducer = (state = initState, action) => {    
    switch (action.type) {
        case SET_AUCTION_TYPE:
            return { ...state, auctionType: action.auctionsType};
        case GET_AUCTION_CATEGORIES:
            return { ...state, auctionsCategories: action.auctionsCategories};
        default:
            return state;
    }
};

export default auctionTypeReducer;