import React, {Component} from 'react'
import RoadShowImg from '../../images2/road-show_02.png'

export default class extends Component {
  render () {
    return (
      <div className="router-page" style={{paddingTop: '20px'}}>
        <img src={RoadShowImg} alt="" style={{width: '100%', height: '10.28rem'}}/>
      </div>
    )
  }
}