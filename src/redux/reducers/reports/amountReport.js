
import { SET_AUCTION_AMOUNT} from '../../actions/reports/reportActions';
const initState = {
    reports: []
};

const reportsReducer = (state = initState, action) => {
    switch (action.type) {

        case SET_AUCTION_AMOUNT:
            return { ...state, reports: action.auctionAmount };
        default:
            return state;
    }
};

export default reportsReducer;