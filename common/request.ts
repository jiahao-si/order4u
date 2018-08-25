import config from '../configs'

const REQUEST_TIMEOUT = 30000
export interface StatusType {
	code: number
	message: string
}

/**
 * 检查code值，做相应处理。
 */
const checkCode = (status) => {
	const { code, message } = status

	if (code === 0) {
		return
	}
	if (code === 7 || code === 1001 || code === 'NOT-LOGINED') {
		// login.show();
	}
}

const resolveResp = (response, resolve) => {
	let { result, status } = response

	if (0 == status.code) {
		resolve({
			result,
			status,
			isSuccess: true
		})
	} else {
		if (process.env.NODE_ENV === 'development') {
			console.warn(response)
		}

		checkCode(status)
		resolve({
			result: {},
			status,
			isSuccess: false
		})
	}
}

/**
 * 处理{status:{},result:{}}返回结构的请求
 * @param options
 */
export const request = (options: {
	type: string
	url: string
	data: object
	global?: boolean
}) => {
	if ($.support.cors) {
		return new Promise<any>((resolve, reject) => {
			let startTime = Date.now()
			options.global = false

			const timeoutTimer = setTimeout(() => {
				// tips.error('服务器忙，请稍后重试');
				reject(new Error('Server Timeout'))
			}, REQUEST_TIMEOUT)

			$.ajax(
				$.extend({}, options, {
					success: (response) => {
						let endTime = Date.now()
						const code = response && response.status && response.status.code

						resolveResp(response, resolve)
					},
					error: (XMLHttpRequest, textStatus, errorThrown) => {
						let endTime = Date.now()

						reject(textStatus)

						if (process.env.NODE_ENV === 'development') {
							console.warn(XMLHttpRequest)
						}
					},
					xhrFields: {
						withCredentials: true
					},
					beforeSend: () => {
						// tips.showLoading('正在加载...')
					},
					complete: () => {
						clearTimeout(timeoutTimer)
					},
					cache: false
				})
			)
		})
	} else {
		return new Promise<any>((resolve, reject) => {
			// tips.showLoading('正在加载...')
			let iframe = document.createElement('iframe'),
				loadfn = () => {
					let startTime = Date.now()
					let contentWindow = iframe.contentWindow as any

					contentWindow.postSend(
						options,
						(response) => {
							let endTime = Date.now()
							const code = response && response.status && response.status.code
							// tips.stopLoading()
							resolveResp(JSON.parse(JSON.stringify(response)), resolve)
							iframe.parentNode.removeChild(iframe)
						},
						(XMLHttpRequest, textStatus, errorThrown) => {
							let endTime = Date.now()

							// tips.stopLoading()
							reject(textStatus)
						}
					)
				}
			iframe.height = '0'
			iframe.width = '0'
			iframe.src = `${config.proxyUrl}?t=` + new Date().getTime()
			iframe.onload = loadfn
			document.body.appendChild(iframe)
		})
	}
}

export const get = (url: string, data: any = {}) => {
	return request({ type: 'GET', url, data })
}

export const post = (url: string, data: any = {}) => {
	return request({ type: 'POST', url, data })
}
