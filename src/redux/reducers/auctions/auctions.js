// import internal(own) modules
//import userData from './userData';
import { SET_AUCTIONS,ADD_AUCTIONS } from '../../actions/auctions/auctionsActions';
const initState = {
    auctions: []
};

const auctionsReducer = (state = initState, action) => {
    switch (action.type) {

        case SET_AUCTIONS:
            return { ...state, auctions: action.auctions };
        case ADD_AUCTIONS:
            return { ...state, auctions: state.auctions.concat([action.auctions]) };

        default:
            return state;
    }
};

export default auctionsReducer;