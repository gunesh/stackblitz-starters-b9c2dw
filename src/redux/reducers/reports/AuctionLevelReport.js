
import { SET_AUCTION_LEVEL_REPORT } from '../../actions/reports/reportActions';
const initState = {
    reports: []
};

const reportsReducer = (state = initState, action) => {
    switch (action.type) {

        case SET_AUCTION_LEVEL_REPORT:
            return { ...state, reports: action.reports };
        default:
            return state;
    }
};

export default reportsReducer;