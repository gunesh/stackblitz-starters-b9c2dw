// import internal(own) modules
//import userData from './userData';
import { SET_USERS,ADD_USER,UPDATE_USER,CHANGE_USER_STATUS} from '../../actions/users/userActions';
const initState = {
    users: []
};

const userReducer = (state = initState, action) => {
    switch (action.type) {

        case SET_USERS:
            return { ...state, users: action.users };
            case ADD_USER:
            return { ...state, users: state.users.concat([action.users]) };
         case CHANGE_USER_STATUS:

       var returndata = state.users.map(item => {
                if (item._id === action.users._id) return action.users;
                return item;
            })
            return { users: returndata }
        
        case UPDATE_USER:
            var returndata = state.users.map(item => {
                if (item._id === action.users._id) return action.users;
                return item;
            })
            return { users: returndata }

        default:
            return state;
    }
};

export default userReducer;