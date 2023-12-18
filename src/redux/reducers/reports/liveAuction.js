

import { LIVE_AUCTION} from '../../actions/reports/reportActions';
const initState = {
    reports: []
};

const reportsReducer = (state = initState, action) => {
    switch (action.type) {

        case LIVE_AUCTION:
            return { ...state, reports: action.reports };
        default:
            return state;
    }
};

export default reportsReducer;