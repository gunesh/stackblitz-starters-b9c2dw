// import internal(own) modules
//import userData from './userData';
import { SET_EPISODE,ADD_EPISODE,UPDATE_EPISODE,CHANGE_EPISODE_STATUS } from '../../actions/episode/episodeAction';
const initState = {
    episode: []
};

const episodeReducer = (state = initState, action) => {
    switch (action.type) {
        case SET_EPISODE:
            return { ...state, episode: action.episode};
        case ADD_EPISODE:
        return { ...state, episode: state.episode.concat([action.episode]) };
        case UPDATE_EPISODE:
            var returndata = state.episode.map(item => {
                if (item._id === action.episode.id) return action.episode;
                return item;
                
            })
              case CHANGE_EPISODE_STATUS:
            var returndata = state.episode.map(item => {
                if (item._id === action.episode.id) return action.episode;
                return item;
                
            })

        default:
            return state;
    }
};

export default episodeReducer;