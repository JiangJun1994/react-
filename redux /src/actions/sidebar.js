export const SET_SIDEBAR_VISIBILITY = Symbol('SET_SIDEBAR_VISIBILITY')
export const UPDATE_HIT_FIELDS = Symbol('UPDATE_HIT_FIELDS')
export const UPDATE_SIDEBAR = Symbol('UPDATE_SIDEBAR')
export const UPDATE_TOTAL_HITS = Symbol('UPDATE_TOTAL_HITS')


export function setSidebarVisibility(visible) {
  return {
    type: SET_SIDEBAR_VISIBILITY,
    visible
  }
}

export function updateHitFields(fields) {
  return {
    type: UPDATE_HIT_FIELDS,
    fields
  }
}

export function updateTotal(total) {
  return {
    type: UPDATE_TOTAL_HITS,
    total
  }
}

export function updateSidebar(source) {
  return {
    type: UPDATE_SIDEBAR,
    source
  }
}

export function updateCount (count){
  return {
    type:updateCount,
    count
  }
}
