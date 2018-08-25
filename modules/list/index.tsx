import * as React from 'react'
import { Provider } from 'react-redux'
import { Container } from './containers/Container'
import { rootStore } from './stores/rootStore'

const store = rootStore()

export class ListApp extends React.Component<any, any> {
	render() {
		return (
			<Provider store={store}>
				<Container />
			</Provider>
		)
	}
}
