import { SET_PACKAGES,ADD_PACKAGES } from '../../actions/masterDataFiles/packagesActions';
const initState = {
    packages: []
};

const auctionsReducer = (state = initState, action) => {
    switch (action.type) {

        case SET_PACKAGES:
            return { ...state, packages: action.packages };
            case ADD_PACKAGES:
                 return { ...state, packages: state.packages.concat([action.packages.package])}
        default:
            return state;
    }
};

export default auctionsReducer;