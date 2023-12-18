
import { SET_CHANEL,ADD_CHANNEL,UPDATE_CHANNEL, CHANGE_CHANNEL_STATUS } from '../../actions/chanels/chanelAction';
const initState = {
    chanels: []
};

const chanelReducer = (state = initState, action) => {
    
    switch (action.type) {
        case SET_CHANEL:
            return { ...state, chanels: action.chanels };
         case ADD_CHANNEL:
                     return { ...state, chanels: state.chanels.concat([action.chanels]) }; 
                     
        case UPDATE_CHANNEL:
            var returndata = state.chanels.map(item => {
                if (item._id === action.chanels.id) return action.chanels;
                return item;
                
            })
        case CHANGE_CHANNEL_STATUS:
            var returndata = state.chanels.map(item => {
                if (item._id === action.chanels.id) return action.chanels.chanel;
                return item;
                
            })
        default:
            return state;
    }
};

export default chanelReducer;