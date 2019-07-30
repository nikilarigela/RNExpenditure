import {
  ADD_EXPENSE,
  REMOVE_EXPENSE,
  ADD_USER,
  REMOVE_USER
} from "../constants/actions";

const initialState = {};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_EXPENSE: {
      const { user, amount, label, id, date } = action.payload;

      return {
        ...state,
        [user]: { data: [...state[user].data, { amount, label, id, date }] }
      };
    }

    case REMOVE_EXPENSE: {
      const { user, id } = action.payload;

      const data = state[user].data.filter(item => item.id !== id);

      return { ...state, [user]: { data } };
    }

    case ADD_USER: {
      const { user } = action.payload;
      return { ...state, [user]: { data: [] } };
    }

    case REMOVE_USER: {
      delete state[action.payload.user];
      return { ...state };
    }
    default:
      return state;
  }
};

export default reducer;
