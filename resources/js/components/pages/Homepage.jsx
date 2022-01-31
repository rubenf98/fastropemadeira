import React from 'react'
import styled, { keyframes } from "styled-components";
import ReactPlayer from 'react-player';
import Reservation from './Home/Reservation';
import About from './Home/About';
import { maxWidth } from '../../helper';
import Activities from './Home/Activities';
import Feedback from './Home/Feedback';
import Team from './Home/Team';
import Partner from './Home/Partner';
import { dimensions } from "../../helper";
import OrderForm from './OrderForm';
import AnimationContainer from '../common/AnimationContainer';






const jump = keyframes`
  0% {
    bottom: 20px;
  }

  15% {
    bottom: 30px;
  }
  
  30% {
    bottom: 20px;
  }
`;

const Header = styled.div`
    background: url("/header_wallpaper.webp");
    background-position: center;
    background-size: cover;
    background-repeat: no-repeat;
    position: relative;
    height: ${props => props.height};
    overflow-y: hidden;
    z-index: 10;
`;

const Overlay = styled.div`
    position: absolute; 
    left: 0; 
    right: 0; 
    top: 0;
    bottom: 0;
    background: #000000a2;
`;


const HeaderContent = styled.div`
    margin: auto;
    position: absolute;
    top: 0; left: 0; bottom: 0; right: 0;
    width: 90vw;
    height: 40vh;

    h1, h2 {
        color: white;
        margin: auto;
        display: block;
        text-align: center;
    }
    h1 {
        font-size: 7vw;
        font-weight: bold;
        margin-bottom: 0px;
        font-family: 'Enclave Demo';
        line-height: 1em;

        @media (max-width: ${dimensions.xs}){
            font-size: 8vw;
        }

    }
    h2 {
        font-size: 1.3vw;
        text-transform: uppercase;

        @media (max-width: ${dimensions.xs}){
            font-size: .9em;
        }

    }

    div { 
        width: 70vw;
        height: 2px;
        margin: 20px auto;
        display: block;
        position: relative;

        &:before {
            content: "";
            position: absolute;
            top: 0;
            left: 15%;
            right: 15%;
            width: 70%;
            height: 2px;
            background-image: linear-gradient(to right, transparent, #8f8f8f, transparent);
        }

        @media (max-width: ${dimensions.xs}){
            width: 90vw;
        }

    }
`;

const Player = styled(ReactPlayer)`
    width: 100% !important;
    height: 100% !important;
    overflow: hidden;

    video {
        min-width: 100%;
        width: auto !important ;
        height: auto !important ;
    }
`;

const ScrollAction = styled.img`
    width: 60px;
    padding: 10px;
    border: 1px solid white;    
    position: absolute;
    bottom: 20px;
    border-radius: 50%;
    right: 0;
    left: 0;
    margin-right: auto;
    margin-left: auto;
    cursor: pointer;
    animation: ${jump} 3s ease-in-out infinite;
`;

const Section = styled.div`
    max-width: ${maxWidth};
    margin: 100px auto;
    display: block;
`;

const Title = styled.div`
    width: 100%;
    text-align: center;
    margin: 150px auto;
    position: relative;
    overflow: hidden;
    display: flex;
    align-items: middle;
    justify-content:center;
    padding: 20px;

    @media (max-width: ${dimensions.md}) {
        margin: 100px auto;
    }

    h1 {
        font-size: 3em;
        margin-bottom: 0px;

        @media (max-width: ${dimensions.md}) {
            font-size: 2.5em;
        }
    }

    .background-text {
        font-family: 'Poppins', sans-serif;
        z-index: -1;
        font-size: 10em;
        font-weight: bold;
        color: #00000011;
        text-transform: uppercase;
        position: absolute; 
        top: 50%;   
        left: 50%;
        transform: translate(-50%, -50%);

        @media (max-width: ${dimensions.md}) {
            font-size: 8em;
        }

        @media (max-width: ${dimensions.sm}) {
            font-size: 16vw;
        }
    }   
`;




class Homepage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            screenHeight: "700px",
            formVisible: false,
            initForm: undefined,
            activities: [],
        }
    }

    closeForm = () => {
        this.setState({
            formVisible: false,
        })
    };

    openForm = (value) => {
        this.setState({
            initForm: value,
            formVisible: true,
        })
    };


    updateDimensions = () => {
        this.setState({
            screenHeight: document.body.clientHeight,

        })
    };

    componentDidMount() {
        this.updateDimensions();
        window.addEventListener('resize', this.updateDimensions);
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.updateDimensions);
    }

    handleScrollClick = () => {
        window.scrollTo(0, this.state.screenHeight + 150);
    }

    render() {
        const { text } = require('../../../assets/' + localStorage.getItem('language') + "/homepage");
        const { screenHeight, activities } = this.state;
        return (
            <div style={{ position: "relative" }}>

                <OrderForm
                    visible={this.state.formVisible}
                    onCreate={this.closeForm}
                    onCancel={this.closeForm}
                    initForm={this.state.initForm}
                />

                <Header height={screenHeight + "px"}>
                    <Player muted config={{ file: { attributes: { disablePictureInPicture: true } } }} loop url='/pending-video.webm' playing controls={false} />
                    <Overlay />
                    <HeaderContent>
                        <h1>Fast Rope Madeira</h1>
                        <div />
                        <h2>{text.header}</h2>
                    </HeaderContent>
                    <ScrollAction onClick={this.handleScrollClick} src="/icon/arrow_down.svg" alt="scroll" />
                </Header>

                <Reservation data={activities} text={text} openForm={this.openForm} />
                <Section>
                    <About text={text} />
                </Section>

                <Title>
                    <AnimationContainer animation="fadeIn">
                        <h1 >{text.subtitleSection[0]}</h1>
                    </AnimationContainer>
                    <div className='background-text'>{text.titleSection[0]}</div>
                </Title>

                <Activities text={text} />

                <Title>
                    <AnimationContainer animation="fadeIn">
                        <h1 >{text.subtitleSection[1]}</h1>
                    </AnimationContainer>
                    <div className='background-text'>{text.titleSection[1]}</div>
                </Title>
                <Section>
                    <Feedback text={text} />
                </Section>

                <Title>
                    <AnimationContainer animation="fadeIn">
                        <h1 >{text.subtitleSection[2]}</h1>
                    </AnimationContainer>
                    <div className='background-text'>{text.titleSection[2]}</div>
                </Title>
                <Section>
                    <Team />
                </Section>

                <Title>
                    <AnimationContainer animation="fadeIn">
                        <h1 >{text.subtitleSection[3]}</h1>
                    </AnimationContainer>
                    <div className='background-text'>{text.titleSection[3]}</div>
                </Title>
                <Section style={{ marginBottom: "150px" }}>
                    <Partner />
                </Section>
            </div>
        )
    }
}

export default Homepage
