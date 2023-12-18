// import internal(own) modules
//import userData from './userData';
import { SAVE_LOCATION } from '../../actions/location/locationActions';
const initState = {
    location: []
};

const locationReducer = (state = initState, action) => {
    switch (action.type) {

        case SAVE_LOCATION:
            return { ...state, location: action.location };
        // case ADD_PACKAGES:
        //     return { ...state, payment: state.payment.concat([action.payment]) };

        default:
            return state;
    }
};

export default locationReducer;