import { SET_CALL_HISTORY } from '../../actions/customers/customersAction';
const initState = {
    callhistory: []
};

const callhistoryReducer = (state = initState, action) => {
    switch (action.type) {
        case SET_CALL_HISTORY:
            return { ...state, callhistory: action.callhistory };
        default:
            return state;
    }
};

export default callhistoryReducer;