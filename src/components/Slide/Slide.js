import React from 'react'
import PropTypes from 'prop-types'
import { animated, interpolate } from 'react-spring'
import { useZoom } from '../../hooks'
import { defaultProps } from '../../constants'
import { Slide as StyledSlide } from './Slide.css'

const AnimatedSlide = animated(StyledSlide)

export default function Slide({ children, onScale, minScale, maxScale }) {
  const [element, scale, translateX, translateY, middleTouchOnElement] = useZoom({
    minScale,
    maxScale,
    onScale,
  })

  return (
    <AnimatedSlide
      ref={element}
      style={{
        transform: interpolate(
          [scale, translateX, translateY],
          (sc, x, y) => `translate3d(${x}px, ${y}px, 0) scale3d(${sc}, ${sc}, 1)`
        ),
        transformOrigin: middleTouchOnElement.interpolate((x, y) => `${x}px ${y}px 0`),
      }}
    >
      {children}
    </AnimatedSlide>
  )
}

Slide.propTypes = {
  children: PropTypes.node.isRequired,
  onScale: PropTypes.func,
  minScale: PropTypes.number,
  maxScale: PropTypes.number,
}

Slide.defaultProps = {
  onScale: undefined,
  maxScale: defaultProps.maxScale,
  minScale: defaultProps.minScale,
}
