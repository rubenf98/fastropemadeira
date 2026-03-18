import React from "react";
import Header from "./Home/Header";
import Tours from "./Home/Tours";
import VideoContainer from "./Home/VideoContainer";
import Team from "./Home/Team";
import RevPartner from "./Home/RevPartner";
import { connect } from "react-redux";

class Homepage extends React.Component {
    render() {
        const { text } = require(
            "../../../assets/" + this.props.language + "/homepage",
        );

        return (
            <div>
                <Header text={text.header} />

                <Tours text={text} />

                <VideoContainer text={text} />

                <Team text={text} />

                <RevPartner text={text} />
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        language: state.application.language,
    };
};

export default connect(mapStateToProps, null)(Homepage);
