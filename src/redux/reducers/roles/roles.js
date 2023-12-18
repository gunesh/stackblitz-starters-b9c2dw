// import internal(own) modules
//import userData from './userData';
import { SET_ROLES } from '../../actions/roles/rolesActions';
const initState = {
    roles: []
};

const roleReducer = (state = initState, action) => {
    switch (action.type) {

        case SET_ROLES:
            return { ...state, roles: action.roles };

        default:
            return state;
    }
};

export default roleReducer;