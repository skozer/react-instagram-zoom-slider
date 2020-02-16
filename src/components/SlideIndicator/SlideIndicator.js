import React from 'react'
import PropTypes from 'prop-types'
import { animated, useTransition } from 'react-spring'
import { SlideIndicator as StyledSlideIndicator } from './SlideIndicator.css'

const AnimatedSlideIndicator = animated(StyledSlideIndicator)

export default function SlideIndicator({ currentSlide, inFront, isVisible, totalSlides }) {
  const transitions = useTransition(isVisible, null, {
    from: { opacity: 1 },
    enter: { opacity: 1 },
    leave: { opacity: 0 },
  })

  if (totalSlides < 2) {
    return null
  }

  return (
    <>
      {transitions.map(
        ({ item, key, props }) =>
          item && (
            <AnimatedSlideIndicator key={key} inFront={inFront} style={{ ...props }}>
              {currentSlide + 1}/{totalSlides}
            </AnimatedSlideIndicator>
          )
      )}
    </>
  )
}

SlideIndicator.propTypes = {
  currentSlide: PropTypes.number.isRequired,
  inFront: PropTypes.bool,
  isVisible: PropTypes.bool,
  totalSlides: PropTypes.number.isRequired,
}

SlideIndicator.defaultProps = {
  inFront: true,
  isVisible: true,
}
