
import { SET_SUCCESS_ORDERS} from '../../actions/reports/reportActions';
const initState = {
    reports: []
};

const reportsReducer = (state = initState, action) => {
    switch (action.type) {

        case SET_SUCCESS_ORDERS:
            return { ...state, reports: action.reports };
        default:
            return state;
    }
};

export default reportsReducer;