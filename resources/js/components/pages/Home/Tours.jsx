import React, { useEffect } from 'react'
import styled from "styled-components";
import { dimensions, maxWidth } from '../../../helper';
import Carousel from 'react-multi-carousel';
import { colors } from '../../../helper';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { setVideoSrc } from "../../../redux/application/actions";
import { fetchExperiences } from '../../../redux/experience/actions';
import { setFormVisibility } from '../../../redux/form/actions';

const responsive = {
    desktop: {
        breakpoint: { max: 3000, min: 1024 },
        items: 3,
        partialVisibilityGutter: 40
    },
    tablet: {
        breakpoint: { max: 1024, min: 567 },
        items: 2,
        partialVisibilityGutter: 30
    },
    mobile: {
        breakpoint: { max: 567, min: 0 },
        items: 1,
        partialVisibilityGutter: 50
    }
};

const Container = styled.section`
    width: 100%;
    display: block;
`;

const CarouselContainer = styled(Carousel)`
    width: 100%;
    max-width: calc(100vw  - ((100vw - ${maxWidth}) / 2));
    margin: 100px 0px;
    margin-left: auto;
    align-items:stretch ;
`;

const Card = styled.div`
    width: 100%;
    padding: 20px 20px;
    box-sizing: border-box;
    /* box-shadow: 0px 0px 10px 0px rgba(0,0,0,.2); */

    .header {
        background-image: ${props => "url(" + props.background + ")"};
        background-repeat: no-repeat;
        background-size: cover;
        background-position: center;
        min-height: 300px;
        display: flex;
        flex-direction: column;
        padding: 15px;
        box-sizing: border-box;
        position: relative;
        

        h3 {
            color: white;
            font-size: 30px;
            text-transform: capitalize;
        }

        div {
            flex: 1;

            button {
                background-color: white;
                border-radius: 45px;
                width: 45px;
                height: 45px;
                float: right;
                cursor: pointer;

                .video-button {
                    width: 20px;
                    margin: auto;
                    display: block;
                }
            }
        }

        .sticker {
            width: 150px;
            margin: auto;
            display: block;
            position: absolute;
            top: -30px; 
            left: -50px;
            rotate: 18deg;
        }
        
    }

    .content {
        box-shadow: 0px 0px 10px 0px rgba(0,0,0,.2);
        padding-bottom: 20px;
        box-sizing: border-box;
        
        .chars {
            display: flex;
            justify-content: space-between;
            align-items: flex-end;
            border-bottom: 1px solid black;
            padding: 20px 0px;
            box-sizing: border-box;

            .side-border {
                border-left: 1px solid black;
                border-right: 1px solid black;
            }

            .char {
                width: 33%;
                gap: 5px;
                display: flex;
                justify-content: center;
                align-items: center;

                img {
                    width: 17px;
                    height: 17px;
                }

                span {
                color: black;
                opacity: .6;
                font-size: 18px;
                }
            }
        }
        .price {
            margin-top: 20px;
            color: ${colors.main};
            font-size: 50px; 
            margin: auto;
            display: block;
            text-align: center;

            span {
                color: black;
                opacity: .6;
                font-size: 20px; 
            }
        }

        p {
            text-align: center;
            color: black;
            opacity: .6;
            font-size: 18px;
            margin: 20px auto;
            width: 80%;
        }

        .button-container {
            display: flex;
            justify-content: center;
            gap: 10px;
            margin: 20px auto;
        }

        button {
            cursor: pointer;
            display: block;
            background-color: transparent;
            color: ${colors.main};
            border: 2px solid ${colors.main};
            border-radius :12px;
            padding: 10px 40px;
            box-sizing: border-box;
            transition: all .3s ease;

            &:hover {
                color: ${colors.mainHover};
                border: 2px solid ${colors.mainHover};
            }
        }

        .primary {
            color: white;
            background-color: ${colors.main};

            &:hover {
                color: white;
                background-color: ${colors.mainHover};
            }
        }
    }
`;

const Title = styled.div`
    width: 100%;

    h3, h2 {
        margin: auto;display: block;
        text-align: center;
    }

    h3 {
        color: ${colors.main};
        font-family: 'Allura', cursive;
        font-size: clamp(26px, 4vw, 40px);
    }

    h2 {
        font-weight: 900;
        font-size: clamp(30px, 4vw, 50px);
    }
`;


// const activities = [
//     {
//         img: "/images/activities/beginner.jpg",
//         video: "https://www.youtube.com/embed/w-Upj6l7KR8",
//         title: "Beginner", price: "60", description: "Dare to go canyoning with us and you'll feel an incredible rush of adrenaline as you explore and discover the most pure and virgin island.", chars: ["2-3h", "family", "+8 age"],
//         to: "/tour/beginner/1"
//     },
//     {
//         img: "/images/activities/adventure.jpg",
//         video: "https://www.youtube.com/embed/jUxO_yq7Vdk",
//         title: "Adventure", price: "80", description: "Dare to go canyoning with us and you'll feel an incredible rush of adrenaline as you explore and discover the most pure and virgin island.", chars: ["2-3h", "family", "+8 age"],
//         to: "/tour/adventure/2"
//     },
//     {
//         img: "/images/activities/advanced.jpg",
//         video: "https://www.youtube.com/embed/5diVXzfUfqg",
//         title: "Advanced", price: "120", description: "Dare to go canyoning with us and you'll feel an incredible rush of adrenaline as you explore and discover the most pure and virgin island.", chars: ["2-3h", "family", "+8 age"],
//         to: "/tour/advanced/3"
//     },
//     {
//         img: "/images/activities/extreme.jpg",
//         video: "https://www.youtube.com/embed/AI5X2f9Y3Rc",
//         title: "Extreme", price: "200", description: "Dare to go canyoning with us and you'll feel an incredible rush of adrenaline as you explore and discover the most pure and virgin island.", chars: ["2-3h", "family", "+8 age"],
//         to: "/tour/extreme/4"
//     },
// ];

function Tours({ text, setVideoSrc, fetchExperiences, experiences, setFormVisibility }) {

    useEffect(() => {
        fetchExperiences();
    }, [])

    return (
        <Container>
            <Title>
                <h3>{text.subtitleSection[0]}</h3>
                <h2>{text.titleSection[0]}</h2>
            </Title>
            <CarouselContainer
                ssr
                partialVisible
                itemClass="image-item"
                responsive={responsive}
            >
                {experiences.map((experience, index) => (
                    <Card key={index} background={experience.images[0].image}>
                        <div className='header'>
                            {experience.video && <div><button onClick={() => setVideoSrc(experience.video)}><img className='video-button' src="/icon/activities/play.svg" alt="play button" /></button></div>}

                            {experience.id == 2 && <img className='sticker' src="/icon/activities/sticker.png" alt="best seller" />}

                            <h3>{experience.name[localStorage.getItem("language")]}</h3>
                        </div>
                        <div className="content">
                            <div className='chars'>
                                <div className='char'>
                                    <img src="/icon/activities/time.svg" alt="play button" />
                                    <span>{experience.duration[localStorage.getItem("language")]}</span>
                                </div>
                                <div className='char side-border'>
                                    <img src="/icon/activities/type.svg" alt="play button" />
                                    <span>{experience.target[localStorage.getItem("language")]}</span>
                                </div>
                                <div className='char'>
                                    <img src="/icon/activities/age.svg" alt="play button" />
                                    <span>{experience.age ? (experience.age + " " + text.tours.age) : text.tours.ageAll} </span>
                                </div>

                            </div>
                            <div className='price'>{experience.price}EUR <span>/{text.tours.person}</span></div>
                            <p>{experience.description[localStorage.getItem("language")]}</p>
                            <div className='button-container'>
                                <button onClick={() => setFormVisibility(true)} className='primary'>{text.tours.primaryButton}</button>
                                {(experience.activity_id === "1" || experience.activity_id === 1) && <Link to={"/tour/" + experience.name.en + "/" + experience.id}><button className='secundary'>{text.tours.secundaryButton}</button></Link>}


                            </div>

                        </div>
                    </Card>
                ))}
            </CarouselContainer>
        </Container>
    )
}

const mapDispatchToProps = (dispatch) => {
    return {
        setVideoSrc: (data) => dispatch(setVideoSrc(data)),
        fetchExperiences: (data) => dispatch(fetchExperiences(data)),
        setFormVisibility: (data) => dispatch(setFormVisibility(data)),
    };
};

const mapStateToProps = (state) => {
    return {
        loading: state.experience.loading,
        experiences: state.experience.data,
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Tours);