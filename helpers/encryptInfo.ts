/**
 * 遮掩隐私信息
 */

export function encryptInfo(str = '', type: 'email' | 'phone' | 'cert') {
	if (typeof str === 'number') {
		str = String(str)
	}

	let strLength = str.length
	if (strLength === 0) {
		return
	}

	if (type === 'email') {
		let leftPart = str.split('@')[0] || ''
		let rightPart = str.split('@')[1] || ''
		let leftPartLength = leftPart.length

		if (leftPartLength > 4) {
			return leftPart.substr(0, leftPartLength - 4) + '****' + '@' + rightPart
		} else {
			return leftPart.substr(0, leftPartLength - 1) + '*' + '@' + rightPart
		}
	} else if (type === 'phone') {
		let subStr = str.substring(3, 7)
		return str.replace(subStr, '****')
	} else if (type === 'cert') {
		if (str.length === 18) {
			//身份证保留首尾
			let subStr = str.substring(1, 17)
			return str.replace(subStr, '****************')
		} else {
			let subStr = str.substring(6, 14)
			return str.replace(subStr, '****')
		}
	}
	return
}
