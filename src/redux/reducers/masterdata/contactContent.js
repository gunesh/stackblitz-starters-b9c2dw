import { CONTACT_CONTENT} from '../../actions/masterDataFiles/contentActions';
const initState = {
    content: []
};

const ContentReducer = (state = initState, action) => {
    
    switch (action.type) {
        case CONTACT_CONTENT:
            return { ...state, content: action.content };
        
        default:
            return state;
    }
};

export default ContentReducer;