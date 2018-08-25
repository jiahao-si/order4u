/**
 * 容器组件
 */
import * as React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'lib'
import {
  
} from '../components'
import * as listActions from "../actions/listactions";

const mapDispatchToProps = dispatch => Object.assign({ dispatch }, bindActionCreators({
  actions: listActions
}, dispatch));


@connect(state  => state, mapDispatchToProps)
export class Container extends React.Component<any, any> {
  state = {

  }


  render() {

    return(
      <div>hello order4u</div>
    )
  } 

  componentWillUnmount() {
  
    
  }
}

