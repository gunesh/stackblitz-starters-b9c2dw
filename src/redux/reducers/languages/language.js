// import internal(own) modules
//import userData from './userData';
import { SAVE_LANGUAGE } from '../../actions/language/languageAction';
const initState = {
    language: []
};

const languageReducer = (state = initState, action) => {
    switch (action.type) {

        case SAVE_LANGUAGE:
            return { ...state, language: action.language };
        // case ADD_PACKAGES:
        //     return { ...state, payment: state.payment.concat([action.payment]) };

        default:
            return state;
    }
};

export default languageReducer;