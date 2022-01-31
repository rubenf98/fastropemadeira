import React from 'react'
import styled from "styled-components";
import { Row } from 'antd';
import AnimationContainer from '../../common/AnimationContainer';

const Container = styled(Row)`
   img {
       width: 20%;
       filter: contrast(0);
   }
`;

function Partner() {
    return (
        <AnimationContainer animation="fadeInUp">
            <Container type="flex" justify="space-around" align="middle">
                <img loading="lazy" src="/partner/thisismadeiraisland.webp" alt="thisismadeiraisland" />
                <img loading="lazy" src="/partner/tripadvisor.webp" alt="tripadvisor" />
                <img loading="lazy" src="/partner/rebolo.webp" alt="rebolo" />
                <img loading="lazy" src="/partner/belocal.webp" alt="belocal" />
            </Container>
        </AnimationContainer>
    )
}

export default Partner
