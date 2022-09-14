import React from 'react'
import styled, { keyframes } from "styled-components";
import ReactPlayer from 'react-player';
import Reservation from './Home/Reservation';
import About from './Home/About';
import { colors, maxWidth } from '../../helper';
import Activities from './Home/Activities';
import Feedback from './Home/Feedback';
import Team from './Home/Team';
import Partner from './Home/Partner';
import { dimensions } from "../../helper";
import OrderForm from './OrderForm';
import AnimationContainer from '../common/AnimationContainer';



const writingUpAnimation = keyframes`
  0% {
    opacity: 0;
    transform: translateY(20%);
  }
  
  100% {
    opacity: 1;
    transform: translateY(0);
  }
`;

const writingDownAnimation = keyframes`
  0% {
    opacity: 0;
    transform: translateY(-20%);
  }
  
  100% {
    opacity: 1;
    transform: translateY(0);
  }
`;

const changeColor = keyframes`
  0% {
    color: black;
  }

  100% {
    color: white;
  }
`;


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
    position: relative;
    height: ${props => props.height};
    overflow-y: hidden;
    z-index: 10;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0px 20px;
    box-sizing: border-box;

    video {
        width:100%;
        height: 100% ;
        object-fit:cover;
        position: absolute; 
        left: 0; 
        right: 0; 
        top: 0;
        bottom: 0;
        z-index: -2;
    }

`;

const Letter = styled.div`
    animation: ${props => props.up ? writingUpAnimation : writingDownAnimation} .3s ease-in both, ${changeColor} .2s linear both;
    animation-delay: ${props => props.delay}, ${props => props.colorDelay + "ms"};
    opacity: 0;
    display: inline-block;
    margin-right: ${props => props.space ? "1%" : "0px"};
`;

const HeaderContent = styled.div`
    margin: auto;
    width: 100%;
    max-width: ${maxWidth};
    
    .left {
        text-align: left;
    }

    .right {
        text-align: right;
    }

    h1 {
        font-size: 3.9vw;
        font-weight: bold;
        margin-bottom: 0px;
        font-family: Poppins;
        line-height: 1em;
        

        .blue {
            color: ${colors.main};
        }

        @media (max-width: ${dimensions.xs}){
            font-size: 24px;
            text-align: left !important;
        }

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

    @media (max-width: ${dimensions.md}) {
        width: 40px;
    }

`;

const Section = styled.div`
    max-width: ${maxWidth};
    margin: 100px auto;
    display: block;
`;

const BackgroundImage = styled.div`
    position: absolute; 
    left: 0; 
    right: 0; 
    top: 0;
    bottom: 0;
    width: 100vw;
    height: 100vh;
    z-index: -3;

    div {
        width: 100%;
        height: 100%;

        img {
            width: 100%;
            height: 100%;
            object-fit:cover;
        }
    }
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
        const delaySize = (text.header[0].length + text.header[1].length - 6) * 50;
        var upCounter = 0;
        var downCounter = 1;
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
                    <AnimationContainer delay={2000} animation="fadeIn">
                        <video preload='auto' playsInline muted loop autoPlay controls={false}>
                            <source src={"/fastrope_header.mp4"} type="video/mp4" />
                            {text.videoError}
                        </video>

                    </AnimationContainer>
                    <BackgroundImage>
                        <AnimationContainer delay={2000} animation="fadeIn">
                            <picture>
                                <source srcSet="/wallpaper.jpg" />
                                <img src="/wallpaper.webp" alt="canyoning wallpaper" loading="eager" />
                            </picture>

                        </AnimationContainer>
                    </BackgroundImage>
                    <HeaderContent>
                        <h1 className='left'>
                            {text.header[0].map((letter, index) => {
                                if (letter) {
                                    upCounter++;
                                    return (
                                        <Letter colorDelay={delaySize} space={text.header[0][index + 1] ? false : true} up delay={50 * upCounter + "ms"}>{letter}</Letter>
                                    )
                                }
                            })}
                        </h1>
                        <h1 className='right'>
                            <Letter space colorDelay={delaySize} delay={upCounter * 50 + "ms"}><span className='blue'>&</span></Letter>
                            {text.header[1].map((letter, index) => {
                                if (letter) {
                                    downCounter++;
                                    return (
                                        <Letter colorDelay={delaySize} space={text.header[1][index + 1] ? false : true} up delay={(upCounter * 50) + (50 * downCounter) + "ms"}>{letter}</Letter>
                                    )
                                }
                            })}
                        </h1>

                        <Reservation delaySize={delaySize} data={activities} text={text} openForm={this.openForm} />

                    </HeaderContent>

                    <ScrollAction onClick={this.handleScrollClick} src="/icon/arrow_down.svg" alt="scroll" />
                </Header>


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
