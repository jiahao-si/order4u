import { combineReducers } from 'redux'
import * as ActionType from '../constants/ActionType'

export const RootReducer = combineReducers({

  /**
   * 弹窗状态管理
   */
  dialog: (state = { type: '', isShow: false, isBtnDisabled: false }, action) => {
    switch (action.type) {
      case ActionType.SWITCH_TAB:
        return Object.assign({}, state, action.payload);
      default:
        return state;
    }
  },

})
