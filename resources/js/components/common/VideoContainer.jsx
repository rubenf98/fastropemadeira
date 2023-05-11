import { Modal } from 'antd';
import React from 'react'
import styled from "styled-components";
import { connect } from 'react-redux';
import { setVideoSrc } from "../../redux/application/actions";


const Container = styled(Modal)`
    

    .ant-modal-body, .ant-modal-content {
        padding: 0px;
        background-color: transparent;
    }
    iframe {
        width: 100%; 
        min-height: 50vh;
        height: 100%; /* 100/56.25 = 560/315 = 1.778 */
    }
`;



function VideoContainer(props) {
    const { videoSrc } = props;
    return (
        <Container
            closable={false}
            centered
            destroyOnClose width={1280}
            visible={videoSrc != undefined}
            onClose={() => props.setVideoSrc(undefined)}
            onCancel={() => props.setVideoSrc(undefined)}
            footer={null}
        >
            <iframe
                width="100%"
                height="350px"
                src={videoSrc}
                title="YouTube video player"
                frameborder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen
            />

        </Container>
    )
}
const mapStateToProps = (state) => {
    return {
        videoSrc: state.application.videoSrc,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        setVideoSrc: (data) => dispatch(setVideoSrc(data)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(VideoContainer);