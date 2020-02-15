import React from 'react'
import { animated, useTransition } from 'react-spring'
import { SlideIndicator as StyledSlideIndicator } from './SlideIndicator.css'

const AnimatedSlideIndicator = animated(StyledSlideIndicator)

export default function SlideIndicator({ isVisible, currentSlide, totalSlides, inFront }) {
  const transitions = useTransition(isVisible, null, {
    from: { opacity: 1 },
    enter: { opacity: 1 },
    leave: { opacity: 0 },
  })

  if (totalSlides < 2) {
    return null
  }

  return transitions.map(
    ({ item, key, props }) =>
      item && (
        <AnimatedSlideIndicator key={key} inFront={inFront} style={{ ...props }}>
          {currentSlide + 1}/{totalSlides}
        </AnimatedSlideIndicator>
      )
  )
}

SlideIndicator.defaultProps = {
  isVisible: true,
}
