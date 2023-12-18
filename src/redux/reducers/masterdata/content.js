import { SET_CONTENT,CONTACT_CONTENT,UPDATE_CONTENT} from '../../actions/masterDataFiles/contentActions';
const initState = {
    content: []
};

const ContentReducer = (state = initState, action) => {
    
    switch (action.type) {
        case SET_CONTENT:
            return { ...state, content: action.content };
             case UPDATE_CONTENT:
            return { ...state, content: action.content };
        default:
            return state;
    }
};

export default ContentReducer;