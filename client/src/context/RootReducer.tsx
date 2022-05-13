import { combineReducers } from 'redux'

import { dashboardReducer }from './DashboardReducer'

const rootReducer = combineReducers({
  dashboardReducer,
})

export default rootReducer
