import React from 'react'
import ScrollAnimation from 'react-animate-on-scroll';

function AnimationContainer({ animation, children, delay = 0 }) {
    return (
        <ScrollAnimation animateIn={animation} animateOnce offset={0} delay={delay}>
            {children}
        </ScrollAnimation>
    )
}

export default AnimationContainer
