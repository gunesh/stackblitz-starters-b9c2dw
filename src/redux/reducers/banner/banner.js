
import { SET_BANNER } from '../../actions/banner/bannerAction';
const initState = {
    banner: []
};

const bannerReducer = (state = initState, action) => {
    
    switch (action.type) {
        case SET_BANNER:
            return { ...state, banner: action.banner };
        //  case ADD_CHANNEL:
        //              return { ...state, chanels: state.chanels.concat([action.chanels]) }; 
                     
        // case UPDATE_CHANNEL:
        //     var returndata = state.chanels.map(item => {
        //         if (item._id === action.chanels.id) return action.chanels;
        //         return item;
                
        //     })
        //      case CHANGE_CHANNEL_STATUS:
        //     var returndata = state.chanels.map(item => {
        //         if (item._id === action.chanels.id) return action.chanels.chanel;
        //         return item;
                
        //     })
        default:
            return state;
    }
};

export default bannerReducer;