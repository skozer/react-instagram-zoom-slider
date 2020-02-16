import React, { useRef } from 'react'
import PropTypes from 'prop-types'
import { clamp } from '../../helpers'
import { Dots as StyledDots, Dot as StyledDot } from './Dots.css'

export default function Dots({ activeDotColor, centerDots, currentSlide, dotColor, totalSlides }) {
  const centerOffset = useRef(0)
  const slideOffset = useRef(0)

  const currentCenterOffset = currentSlide - slideOffset.current
  if (currentCenterOffset >= 0 && currentCenterOffset < centerDots) {
    centerOffset.current = currentCenterOffset
  } else {
    slideOffset.current = currentSlide - centerOffset.current
  }

  return (
    <StyledDots>
      {[...Array(totalSlides)].map((_, idx) => {
        const centerPage = parseInt(centerDots / 2, 10) + slideOffset.current
        const distance = Math.abs(idx - centerPage)

        const scaledDistance = clamp(distance - parseInt(centerDots / 2, 10), 0, 3)

        return (
          <StyledDot
            dotColor={dotColor}
            activeDotColor={activeDotColor}
            active={idx === currentSlide}
            distance={scaledDistance}
            // eslint-disable-next-line react/no-array-index-key
            key={idx}
          />
        )
      })}
    </StyledDots>
  )
}

Dots.propTypes = {
  activeDotColor: PropTypes.string,
  centerDots: PropTypes.number,
  currentSlide: PropTypes.number.isRequired,
  dotColor: PropTypes.string,
  totalSlides: PropTypes.number.isRequired,
}

Dots.defaultProps = {
  activeDotColor: '#4e99e9',
  centerDots: 3,
  dotColor: '#dadbdc',
}
