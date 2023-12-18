import { SET_AUCTION_CATEGORY,ADD_AUCTION_CATEGORY,UPDATE_AUCTION_CATEGORY ,CHANGE_STATUS} from '../../actions/masterDataFiles/auctionCategoryActions';
const initState = {
    auctionCategory: []
};

const auctionsCategoryReducer = (state = initState, action) => {
    switch (action.type) {

        case SET_AUCTION_CATEGORY:
            return { ...state, auctionCategory: action.auctionCategory };
            case ADD_AUCTION_CATEGORY:
                 return { ...state, auctionCategory: state.auctionCategory.concat([action.auctionCategory])}
                   case UPDATE_AUCTION_CATEGORY:
            var returndata = state.auctionCategory.map(item => {
                if (item._id === action.auctionCategory.id) return action.auctionCategory;
                return item;
                
            })
              case CHANGE_STATUS:
            var returndata = state.auctionCategory.map(item => {
                if (item._id === action.auctionCategory.id) return action.auctionCategory;
                return item;
                
            })
        default:
            return state;
    }
};

export default auctionsCategoryReducer;