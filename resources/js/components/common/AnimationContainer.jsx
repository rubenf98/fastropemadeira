import React from 'react'
import ScrollAnimation from 'react-animate-on-scroll';

function AnimationContainer({ animation, children }) {
    return (
        <ScrollAnimation animateIn={animation} animateOnce>
            {children}
        </ScrollAnimation>
    )
}

export default AnimationContainer
