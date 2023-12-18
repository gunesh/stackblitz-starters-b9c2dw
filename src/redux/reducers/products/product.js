
import { SET_PRODUCT,ADD_PRODUCT,UPDATE_PRODUCT,CHANGE_PRODUCT_STATUS } from '../../actions/product/productAction';
const initState = {
    products: []
};

const productReducer = (state = initState, action) => {
    switch (action.type) {
        case SET_PRODUCT:
            return { ...state, products: action.products};
             case ADD_PRODUCT:
             return { ...state, products: state.products.concat([action.products]) };
             case UPDATE_PRODUCT:
            var returndata = state.products.map(item => {
                if (item._id === action.products.id) return action.products;
                return item;
                
            })
            case CHANGE_PRODUCT_STATUS:
            var returndata = state.products.map(item => {
                if (item._id === action.products.id) return action.products;
                return item;
                
            })
        default:
            return state;
    }
};

export default productReducer;