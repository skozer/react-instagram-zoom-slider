import React, { useRef, useEffect, useCallback } from 'react'
import { useSpring, animated, interpolate } from 'react-spring'
import { isTouchesInsideRect, getMiddleTouchOnElement, getLengthOfLine, clamp } from '../../helpers'
import { Slide as StyledSlide } from './Slide.css'

const MIN_SCALE = 1
const MAX_SCALE = 4

const AnimatedSlide = animated(StyledSlide)

export default function Slide({ children, onScale }) {
  const element = useRef(null)
  const initialBoundingRect = useRef(null)
  const firstTouch = useRef(null)
  const initialPinchLength = useRef(null)

  const [{ scale, middleTouchOnElement, translateX, translateY }, set] = useSpring(() => ({
    scale: 1,
    middleTouchOnElement: [0, 0],
    translateX: 0,
    translateY: 0,
    immediate: true,
    onFrame: ({ scale }) => {
      if (typeof onScale === 'function') {
        onScale({ scale })
      }
    },
  }))

  const handleTouchStart = useCallback(
    event => {
      if (event.touches.length !== 2) {
        return
      }

      initialBoundingRect.current = element.current.getBoundingClientRect()

      if (
        !event.touches.length ||
        !isTouchesInsideRect(event.touches, initialBoundingRect.current)
      ) {
        return
      }

      event.preventDefault()

      const [touch1, touch2] = event.touches
      const { clientX, clientY } = getMiddleTouchOnElement(
        event.touches,
        initialBoundingRect.current
      )

      firstTouch.current = [clientX, clientY]
      initialPinchLength.current = getLengthOfLine(touch1, touch2)

      set({ middleTouchOnElement: [clientX, clientY], immediate: true })
    },
    [set]
  )

  const handleTouchMove = useCallback(
    event => {
      if (firstTouch.current) {
        const middleTouchOnElement = getMiddleTouchOnElement(
          event.touches,
          initialBoundingRect.current
        )

        const [touch1, touch2] = event.touches
        const currentPinchLength = getLengthOfLine(touch1, touch2)

        const scale = clamp(currentPinchLength / initialPinchLength.current, MIN_SCALE, MAX_SCALE)
        const translateX = middleTouchOnElement.clientX - firstTouch.current[0]
        const translateY = middleTouchOnElement.clientY - firstTouch.current[1]

        set({ scale, translateX, translateY, immediate: true })
      }
    },
    [set]
  )

  const handleTouchEnd = useCallback(() => {
    set({
      scale: 1,
      translateX: 0,
      translateY: 0,
      immediate: false,
    })

    firstTouch.current = null
    initialPinchLength.current = null
    initialBoundingRect.current = null
  }, [set])

  useEffect(() => {
    element.current.ontouchstart = handleTouchStart
    element.current.ontouchmove = handleTouchMove
    element.current.ontouchend = handleTouchEnd
  }, [handleTouchStart, handleTouchMove, handleTouchEnd])

  return (
    <AnimatedSlide
      ref={element}
      style={{
        transform: interpolate(
          [scale, translateX, translateY],
          (scale, translateX, translateY) =>
            `translate3d(${translateX}px, ${translateY}px, 0) scale3d(${scale}, ${scale}, 1)`
        ),
        transformOrigin: middleTouchOnElement.interpolate((x, y) => `${x}px ${y}px 0`),
      }}
    >
      {children}
    </AnimatedSlide>
  )
}
