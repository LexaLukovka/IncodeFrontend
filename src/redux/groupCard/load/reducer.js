import {
  LOAD_GROUP_CARD_FULFILLED,
  LOAD_GROUP_CARD_PENDING,
  LOAD_GROUP_CARD_REJECTED,

  DELETE_GROUP_CARD_FULFILLED,
  DELETE_GROUP_CARD_PENDING,
  DELETE_GROUP_CARD_REJECTED,
} from './action'

const initialState = {
  groupCard: null,
  messages: null,
  errors: [],
  error: false,
  loading: false,
}

const loadReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case LOAD_GROUP_CARD_PENDING:
    case DELETE_GROUP_CARD_PENDING:
      return {
        ...state,
        loading: true,
      }

    case LOAD_GROUP_CARD_REJECTED:
    case DELETE_GROUP_CARD_REJECTED:
      return {
        ...state,
        loading: false,
        error: true,
        errors: payload,

      }

    case LOAD_GROUP_CARD_FULFILLED:
      return {
        ...state,
        loading: false,
        groupCard: payload,
      }

    case DELETE_GROUP_CARD_FULFILLED:
      return {
        ...state,
        loading: false,
        messages: payload,
      }

    default:
      return state
  }
}

export default loadReducer
