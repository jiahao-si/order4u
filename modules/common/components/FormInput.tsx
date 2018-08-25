/**
 * 公用组件
 */
import * as React from 'react'

export class FormInput extends React.Component<any, { label: string, placeholder: string }> {

  render(){
    const { label, defaultValue, placeholder, onBlur } = this.props;
    
    return(
      <li>
        
      </li> 
    )
  }
  
}