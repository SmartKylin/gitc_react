import React, {Component} from 'react'
import './index.scss'
import SpeechItem from '../../../../components2/SpeechItem'
import AccordionHeader from '../../../../components2/AccordionHeader'

export default class extends Component {
  constructor(props) {
    super(props)
    this.state = {
      collapsed: false,
    }
  }
  
  changeCollapse = () => {
    this.setState({
      collapsed: !this.state.collapsed
    })
  }
  render () {
    let {collapsed} = this.state
    let {name, enName, list, bgImg} = this.props
    return (
      <div className="my-accordion">
        <AccordionHeader
          name={name}
          changeCollapse={this.changeCollapse}
          bgImg={bgImg}
          enName={enName}
          collapsed={collapsed}
        />
        {
          collapsed
          ? <div className="accor-content">
              {
                list && list.length
                ? list.map((item, ind) => (
                  <SpeechItem key={ind} speecher={item}/>
                ))
                : null
              }
          </div>
          : null
        }
      </div>
    )
  }
}