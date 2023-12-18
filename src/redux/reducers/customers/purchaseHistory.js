import { SET_PURCHASE_HISTORY } from '../../actions/customers/customerProfileAction';
const initState = {
    purchasehistory: []
};

const purchasehistoryReducer = (state = initState, action) => {
    switch (action.type) {
        case SET_PURCHASE_HISTORY:
            return { ...state, purchasehistory: action.purchasehistory };
        default:
            return state;
    }
};

export default purchasehistoryReducer;