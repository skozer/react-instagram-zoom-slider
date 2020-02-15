import React, { useRef } from 'react'
import { clamp } from '../../helpers'
import { Dots as StyledDots, Dot as StyledDot } from './Dots.css'

export default function Dots({ slides, currentSlide, centerDots, dotColor, activeDotColor }) {
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
      {slides.map((_, idx) => {
        const centerPage = parseInt(centerDots / 2, 10) + slideOffset.current
        const distance = Math.abs(idx - centerPage)

        const scaledDistance = clamp(distance - parseInt(centerDots / 2, 10), 0, 3)

        return (
          <StyledDot
            dotColor={dotColor}
            activeDotColor={activeDotColor}
            active={idx === currentSlide}
            distance={scaledDistance}
            key={idx}
          />
        )
      })}
    </StyledDots>
  )
}

Dots.defaultProps = {
  centerDots: 3,
  dotColor: '#dadbdc',
  activeDotColor: '#4e99e9',
}
