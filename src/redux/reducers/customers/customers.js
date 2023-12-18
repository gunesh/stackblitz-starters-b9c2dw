import { SET_CUSTOMER, SEARCH_CUSTOMER } from '../../actions/customers/customersAction';
const initState = {
    customers: []
};

const customerReducer = (state = initState, action) => {
    switch (action.type) {
        case SET_CUSTOMER:
            return { ...state, customers: action.customer };
        case SEARCH_CUSTOMER:
            return { ...state, customers: action.customer.customer };
        default:
            return state;
    }
};

export default customerReducer;