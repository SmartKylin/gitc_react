import React, { Component } from 'react';
import PropTypes from 'prop-types';
// import $ from 'jquery'
import './AgendaPople.scss';
import storage from '../../helper/storage'
import { TOKEN } from "../../helper/login";
import CollectedModal from 'components/CollectedModal'
import { message } from 'antd'
import defaultAvatar from '../../images/default-avatar.jpg'
import zhibo from '../../images/zhibotupian.jpg'


import { collectDocument, collectGuest } from "../../services/collect";

const formatDate = (str) => {
	if (!str) return '待定'
	let date = new Date(str).toLocaleDateString()
	let dateAry = date.split('/').slice(1)
	let res = dateAry[0] + '月' + dateAry[1] + '号'
	return res
}
class AgendaPople extends Component {
	constructor(props) {
		super(props);
		this.state = {
			collectModelVisible: 'none',
			guestStatus: false,
			fileStatus: false,
			a: false,
			linkColor: true,
			linkColor2: true,
			wtop:''
			/*link1: true,
			link2: true,
			link3: true,
			link3: true*/
		}
		this._handleClick = this._handleClick.bind(this)
		this._handleOffClick = this._handleOffClick.bind(this)
		this.mounse = this.mounse.bind(this)
		this.mounout = this.mounout.bind(this)
		this.mounse2 = this.mounse2.bind(this)
		this.mounout2 = this.mounout2.bind(this)
	}

	static propTypes = {
		type: PropTypes.string,
	};

	_handleClick() {
		this.setState({
			a: true,
            wtop:document.documentElement.scrollTop || document.body.scrollTop
		})
        console.log(document.documentElement.scrollTop,'123123');
        document.body.style.height = '100%'
        document.documentElement.style.height = '100%'
        document.body.style.overflow = 'hidden'
		document.documentElement.style.overflow = 'hidden'
    }
	_handleOffClick(e) {
		e.stopPropagation()
		this.setState({
			a: false
		})
        document.body.style.height = '100%'
        document.documentElement.style.height = '100%'
        document.body.style.overflow = 'visible'
        document.documentElement.style.overflow = 'visible'
        document.documentElement.scrollTop = this.state.wtop
        document.body.scrollTop = this.state.wtop


	}
	mounse(e) {
		this.setState({
			linkColor: false
		})
	}
	mounout() {
		this.setState({
			linkColor: true
		})
	}
	mounse2(e) {
		this.setState({
			linkColor2: false
		})
	}
	mounout2() {
		this.setState({
			linkColor2: true
		})
	}
	mounseup(e) {
		// $('html').css('height', '100%')
		// $('body').css('height', '100%')
		// $('body').css('overflow', 'hidden')
		// $('html').css('overflow', 'hidden')
	}
	unmounseup(e) {
		// $('body').css('overflow', 'auto')
	}
	/*toggleLink1(e) {
		this.setState({
			link1: !this.state.link1
		})
	}
	toggleLink2(e) {
		this.setState({
			link2: !this.state.link2
		})
	}*/
	toggleLink3(e) {
		let { files__url } = this.props.data
		if (!files__url) {
			message.info('没有相应文档~')
		}
	}


	componentWillMount() {
		// document.title = "大会议程";
	}
	componentDidMount() {
	}
	// 收藏嘉宾
	_collectGuest = () => {
		let { id, collect } = this.props.data
		let { openPop, setLoginCb, closePop } = this.props
		let phone = storage.get(storage.PHONE_KEY)
		let cb = this._collectGuest
		if (collect || this.state.guestStatus) {
			return
		}
		const failure = (msg) => {
			openPop()
			setLoginCb(cb)
			message.info(msg)
		}

		if (!phone) {
			openPop()
			setLoginCb(cb)
			return
		}

		const success = (data) => {
			if (data.status) {
				// closePop()
				this.setState({
					// 打开收藏成功模态框
					collectModelVisible: 'block',
					guestStatus: true,
				})
			} else {
				failure(data.msg)
			}
		}
		collectGuest({ phone, person: id, token: TOKEN })
			.then(res => res && res.json())
			.then(success)
	}

	// 收藏文档
	_collectDocument = () => {
		let { files__id, file_collect } = this.props.data
		let { openPop, setLoginCb } = this.props
		let phone = storage.get(storage.PHONE_KEY)
		let cb = this._collectDocument

		if (this.state.documentStatus || file_collect) {
			return
		}
		const failure = (msg) => {
			openPop()
			setLoginCb(cb)
			message.info(msg)
		}

		if (!phone) {
			openPop()
			setLoginCb(cb)
			return
		}

		const success = (data) => {
			if (data.status) {
				// closePop()
				this.setState({
					// 打开收藏成功模态框
					collectModelVisible: 'block',
					documentStatus: true,
				})
			} else {
				failure(data.msg)
			}
		}

		if (!files__id) {
			message.info('没有相应文档~')
		}
		collectDocument({ phone, file: files__id, token: TOKEN })
			.then(res => res && res.json())
			.then(success)
	}

	// 关闭收藏成功的模态框
	closeModal = () => {
		this.setState({
			collectModelVisible: 'none'
		})
	}
	
	render() {
		const { data } = this.props;
		return (
			<li className="popele-box" id="a" onClick={this.props.flag || this.props.flag1 ?"":this._handleClick}>
				<div className="popele-box-left">
					{data ? <img src={data.pic ? data.pic : this.props.flag?zhibo:defaultAvatar} alt="" className="header-img" /> : ""}
					<div className="header-icon">
						<span className="l">
							<div className={"popele-box-1 " + (this.state.guestStatus || data.collect ? 'collected' : '')}></div>
						</span>
						<span className="c">
							<div className={"popele-box-2 " + (this.state.fileStatus || data.file_collect ? 'collected' : '')}></div>
						</span>
						<span className="r">
							<div className="popele-box-3"></div>
						</span>
					</div>
				</div>
				<div className="popele-box-right">
					<div className="popele-box-title">
						<span className="popele-box-l">{data.stheme}</span>
						{data ? <span className="popele-box-r">{data.stime}</span> : ''}
					</div>
					<div className="popele-name-title">
						{data && this.props.flag ?(<span className="popele-name-lA">全程直播开幕盛况</span>): (<span className="popele-name-l">{data.name}</span>: "")}
						{data && this.props.flag ?(<span className="popele-name-r"></span>): (<span className="popele-name-r">{data.company}丨{data.position}</span>: '')}
					</div>

					{data && this.props.flag  ? (<p className="popele-box-text sl">主办方、协办方致辞，大会主席团成员共同亮相启动仪式，正式开启GITC年度盛典。</p>): (<p className="popele-box-text sl">演讲内容:{data.sintroduce}</p> : '')}

				</div>
				<div className="windowPop" style={{ display: this.state.a ? "block" : 'none' }}
					onTouchStart={this.mounseup.bind(this)}
					onTouchEnd={this.unmounseup.bind(this)}
				>

					<div className="windowBox">
						<div className="windowBox-header">
							{/*<img src="" alt=""  className="header-img"/>*/}
							<img src={data.pic || defaultAvatar} className="header-img" alt="" />
							<div className="windowBox-btn-color" onClick={this._handleOffClick}>
								<div className="close-btn"></div>
							</div>

						</div>
						<div className="windowBox-name">{data.name}</div>
						<div className="windowBox-work">{data.company} {data.position}</div>
						<div className="windowBox-date">
							<div className="windowBox-date-l">
								<span className="windowBox-date-l-icon"></span>
								<span>{data.meet}</span>
								<span>{data.meetaddr || '待定'}</span>
							</div>
							<div className="windowBox-date-r">
								<span className="windowBox-date-r-icon"></span>
								<span>{formatDate(data.sdata)}</span>
								<span style={{marginLeft: '3px'}}>{data.stime || '待定'}</span>
							</div>
						</div>
						<div className="win-l">
							<div className="windowBox-title">
								<span style={{color: '#0d1428'}}>演讲主题：</span>
								{data.stheme}
								</div>
						</div>

						<p className="windowBox-text" onTouchStart={this.mounse}
							onTouchEnd={this.mounout} style={{ borderColor: this.state.linkColor ? "" : "#ccc" }}>
							<span style={{color: '#0d1428'}}>主题介绍：</span>
							{data.sintroduce || '待定'}</p>
						<p className="windowBox-text" onTouchStart={this.mounse2}
							onTouchEnd={this.mounout2} style={{ borderColor: this.state.linkColor2 ? "" : "#ccc" }}>
							<span style={{color: '#0d1428' ,fontWeight: '600'}}>个人简介:</span>
							{data.summary}</p>
						<div className="windowBox-icon-content">
							<div className="windowBox-icon">
								<div className="windowBox-iconlink   windowBox-icon-mln" onClick={this._collectGuest}><div className={'windowBox-iconlink-l1 ' + (this.state.guestStatus || data.collect ? 'collected' : '')} ></div></div><div style={{ width: '0.8rem' }}>	</div>
								<div className="windowBox-iconlink  windowBox-icon-mlnr" onClick={this._collectDocument}><div className={"windowBox-iconlink-l2 " + (this.state.fileStatus || data.file_collect ? 'collected' : '')}></div></div><div style={{ width: '0.8rem' }}></div>
								{/*<div style={{ borderColor: this.state.link3 ? '#ccc' : 'blue' }} className="windowBox-iconlink  windowBox-icon-mlnr" onClick={this.toggleLink3.bind(this)}><div className="windowBox-iconlink-l3"></div></div>*/}
								<div className="windowBox-iconlink  windowBox-icon-mlnr" onClick={this.toggleLink3.bind(this)}>
									<a className="windowBox-iconlink-l3" href={data.files__url}></a>
								</div>
							</div>
						</div>
					</div>
				</div>
				<CollectedModal closeModal={this.closeModal} display={this.state.collectModelVisible} />
			</li>
		);
	}
}

export default AgendaPople;
