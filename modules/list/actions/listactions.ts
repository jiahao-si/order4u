import * as api from '../Api'
import * as ActionType from '../constants/ActionType'

/**
 * 修改状态action
 */
export const changeValueAction = (type, payload) => {
	return async (dispatch, getState) => {
		dispatch({
			type,
			payload
		})
	}
}

/**
 * 关闭dialog
 */
export const closeDialog = () => {
	return (dispatch, getState) => {
		dispatch({
			type: ActionType.SWITCH_TAB,
			payload: {
				type: '',
				isShow: false,
				isBtnDisabled: false
			}
		})
		dispatch(changeValueAction(ActionType.SWITCH_TAB, []))
	}
}
