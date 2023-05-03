import React from 'react'
import styled from "styled-components";
import { dimensions, maxWidth } from '../../../helper';
import Carousel from 'react-multi-carousel';
import { colors } from '../../../helper';
import { Link } from 'react-router-dom';

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
        partialVisibilityGutter: 0
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
        

        h3 {
            color: white;
            font-size: 30px;
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

                img {
                    width: 20px;
                    margin: auto;
                    display: block;
                }
            }
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

const activities = [
    {
        img: "https://images.unsplash.com/photo-1549989476-69a92fa57c36?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60",
        video: "https://images.unsplash.com/photo-1549989476-69a92fa57c36?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60",
        title: "Beginner", price: "60", description: "Dare to go canyoning with us and you'll feel an incredible rush of adrenaline as you explore and discover the most pure and virgin island.", chars: ["2-3h", "family", "+8 age"],
        to: "/tour/beginner"
    },
    {
        img: "https://images.unsplash.com/photo-1549989476-69a92fa57c36?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60",
        video: "https://images.unsplash.com/photo-1549989476-69a92fa57c36?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60",
        title: "Adventure", price: "80", description: "Dare to go canyoning with us and you'll feel an incredible rush of adrenaline as you explore and discover the most pure and virgin island.", chars: ["2-3h", "family", "+8 age"],
        to: "/tour/adventure"
    },
    {
        img: "https://images.unsplash.com/photo-1549989476-69a92fa57c36?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60",
        video: "https://images.unsplash.com/photo-1549989476-69a92fa57c36?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60",
        title: "Advanced", price: "120", description: "Dare to go canyoning with us and you'll feel an incredible rush of adrenaline as you explore and discover the most pure and virgin island.", chars: ["2-3h", "family", "+8 age"],
        to: "/tour/advanced"
    },
    {
        img: "https://images.unsplash.com/photo-1549989476-69a92fa57c36?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60",
        video: "https://images.unsplash.com/photo-1549989476-69a92fa57c36?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60",
        title: "Extreme", price: "200", description: "Dare to go canyoning with us and you'll feel an incredible rush of adrenaline as you explore and discover the most pure and virgin island.", chars: ["2-3h", "family", "+8 age"],
        to: "/tour/extreme"
    },
];

function Tours() {
    return (
        <Container>
            <Title>
                <h3>Travel far enough, meet yourself</h3>
                <h2>MOST POPULAR TOURS</h2>
            </Title>
            <CarouselContainer
                ssr
                partialVisible
                itemClass="image-item"
                responsive={responsive}
            >
                {activities.map((activity, index) => (
                    <Card key={index} background={activity.img}>
                        <div className='header'>
                            <div><button><img src="/icon/activities/play.svg" alt="play button" /></button></div>


                            <h3>{activity.title}</h3>
                        </div>
                        <div className="content">
                            <div className='chars'>
                                <div className='char'>
                                    <img src="/icon/activities/time.svg" alt="play button" />
                                    <span>{activity.chars[0]}</span>
                                </div>
                                <div className='char side-border'>
                                    <img src="/icon/activities/type.svg" alt="play button" />
                                    <span>{activity.chars[1]}</span>
                                </div>
                                <div className='char'>
                                    <img src="/icon/activities/age.svg" alt="play button" />
                                    <span>{activity.chars[2]}</span>
                                </div>

                            </div>
                            <div className='price'>{activity.price}EUR <span>/person</span></div>
                            <p>{activity.description}</p>
                            <div className='button-container'>
                                <button className='primary'>Book now</button>
                                <Link to={activity.to}><button className='secundary'>See more</button></Link>

                            </div>

                        </div>
                    </Card>
                ))}
            </CarouselContainer>
        </Container>
    )
}

export default Tours