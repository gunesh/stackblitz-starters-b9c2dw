
import { SET_EPISODE_LEVEL } from '../../actions/reports/reportActions';
const initState = {
    reports: []
};

const reportsReducer = (state = initState, action) => {
    switch (action.type) {

        case SET_EPISODE_LEVEL:
            return { ...state, reports: action.reports };
        default:
            return state;
    }
};
export default reportsReducer;
