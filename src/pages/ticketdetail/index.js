import React, {Component} from 'react'
import ChildContainer from 'containers/child_container'

export default class extends Component {
  render() {
    return (
      <ChildContainer>
        <div style={{background: '#fff'}}>
          门票详情去
        </div>
      </ChildContainer>
    )
  }
}