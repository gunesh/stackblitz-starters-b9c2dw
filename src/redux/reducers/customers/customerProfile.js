
import { SET_CUSTOMER_PROFILE } from '../../actions/customers/customerProfileAction';
const initState = {
    customers: []
};

const customerProfileReducer = (state = initState, action) => {

    switch (action.type) {
    
         case SET_CUSTOMER_PROFILE:
              return { ...state, customers: action.customer.customer}; 
        default:
            return state;
    }
};

export default customerProfileReducer;