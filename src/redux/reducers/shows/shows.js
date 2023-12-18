
import { SET_SHOWS,ADD_SHOWS,UPDATE_SHOWS,CHANGE_SHOWS_STATUS } from '../../actions/Shows/showsAction';
const initState = {
    shows: []
};

const showsReducer = (state = initState, action) => {
    switch (action.type) {
        case SET_SHOWS:
            return { ...state, shows: action.shows };
            case ADD_SHOWS:
             return { ...state, shows: state.shows.concat([action.shows]) };
            
         case UPDATE_SHOWS:
            var returndata = state.shows.map(item => {
                if (item._id === action.shows.id) return action.shows;
                return item;
                
            })
             case CHANGE_SHOWS_STATUS:
            var returndata = state.shows.map(item => {
                if (item._id === action.shows.id) return action.shows;
                return item;
                
            })
            
        default:
            return state;
    }
};



export default showsReducer;