import React from "react";
import ConferenceNews from "../../containers/conferenceNews/index";

class conferenceNewsPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    render() {

        return (
            <div  className="conferenceNewsPageMain">
               <ConferenceNews history={this.props.history}/>
            </div>
        );
    }
}

export default conferenceNewsPage;