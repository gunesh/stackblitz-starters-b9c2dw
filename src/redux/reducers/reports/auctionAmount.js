import { SET_AUCTION_AMOUNT } from '../../actions/reports/reportActions';
const initState = {
    auctionAmount: []
};

const AuctionAmountReducer = (state = initState, action) => {
    switch (action.type) {

        case SET_AUCTION_AMOUNT:
            return { ...state, auctionAmount: action.auctionAmount };
        default:
            return state;
    }
};

export default AuctionAmountReducer;