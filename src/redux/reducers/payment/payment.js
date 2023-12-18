// import internal(own) modules
//import userData from './userData';
import { SET_PAYMENT } from '../../actions/payments/payments';
const initState = {
    payment: []
};

const paymentReducer = (state = initState, action) => {
    switch (action.type) {

        case SET_PAYMENT:
            return { ...state, payment: action };
        // case ADD_PACKAGES:
        //     return { ...state, payment: state.payment.concat([action.payment]) };

        default:
            return state;
    }
};

export default paymentReducer;