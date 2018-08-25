import * as React from 'react'
import { ListApp } from './modules/list'
// import { Router, Route, IndexRoute } from 'react-router'
import * as ReactDOM from 'react-dom'

ReactDOM.render(
	<div>
		{/* <Router history={history}>
			<Route path="/">
				<IndexRoute component={ListApp} />
				<Route path="/demo">
					<IndexRoute component={ListApp} />
				</Route>
			</Route>
		</Router> */}
	</div>,
	document.getElementById('container') as HTMLElement
)
