import { FETH_LANGUAGES} from '../../actions/masterDataFiles/languageTranslate';
const initState = {
    language: []
};

const languageTranslateReducer = (state = initState, action) => {
    
    switch (action.type) {
        case FETH_LANGUAGES:
            return { ...state, language: action.language.language_translations };
          
        default:
            return state;
    }
};

export default languageTranslateReducer;