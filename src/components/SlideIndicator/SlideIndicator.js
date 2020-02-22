import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { animated, useTransition } from 'react-spring'
import { defaultProps } from '../../constants'
import { SlideIndicator as StyledSlideIndicator } from './SlideIndicator.css'

const AnimatedSlideIndicator = animated(StyledSlideIndicator)

export default function SlideIndicator({
  currentSlide,
  inFront,
  slideIndicatorTimeout,
  totalSlides,
}) {
  const [isVisible, setVisible] = useState(true)

  useEffect(() => {
    if (slideIndicatorTimeout !== null) {
      const timer = setTimeout(() => {
        setVisible(false)
      }, slideIndicatorTimeout)
      return () => clearTimeout(timer)
    }
  }, [])

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
  slideIndicatorTimeout: PropTypes.number,
  totalSlides: PropTypes.number.isRequired,
}

SlideIndicator.defaultProps = {
  inFront: true,
  slideIndicatorTimeout: defaultProps.slideIndicatorTimeout,
}
