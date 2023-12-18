import { HOW_TO_PLAY_CONTENT} from '../../actions/masterDataFiles/contentActions';
const initState = {
    content: []
};

const ContentReducer = (state = initState, action) => {
    
    switch (action.type) {
        case HOW_TO_PLAY_CONTENT:
            return { ...state, content: action.content };
          
        default:
            return state;
    }
};

export default ContentReducer;