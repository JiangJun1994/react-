import {
  SET_SIDEBAR_VISIBILITY,
  UPDATE_HIT_FIELDS,
  UPDATE_SIDEBAR,
  UPDATE_TOTAL_HITS,
  updateCount,
} from '../actions/sidebar'

// var state = {
//   count:0,
// }

export default (state = {} , action) => {
  
  switch (action.type) {
    case SET_SIDEBAR_VISIBILITY:
      return {
        ...state,
        visible: action.visible
      }
    case UPDATE_HIT_FIELDS:
      return {
        ...state,
        fields: action.fields
      }
    case UPDATE_SIDEBAR:
      return {
        ...state,
        source: action.source
      }
    case UPDATE_TOTAL_HITS: 
      return {
        ...state,
        total: action.total
      }
    case updateCount:
      var final = JSON.parse(action.count) +1
      return {
        ...state,
        count:final
      }
    default:
      return state
  }
}
