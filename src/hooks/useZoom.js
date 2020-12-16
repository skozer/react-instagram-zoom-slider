import { useRef, useEffect, useCallback } from 'react'
import { useSpring } from 'react-spring'
import { isTouchesInsideRect, getMiddleTouchOnElement, getLengthOfLine, clamp } from '../helpers'

export default function useZoom({ minScale, maxScale, onScale, retain }) {
  const element = useRef(null)
  const initialBoundingRect = useRef(null)
  const firstTouch = useRef(null)
  const initialPinchLength = useRef(null)
  const difference = useRef(null)

  const [{ scale, middleTouchOnElement, translateX, translateY }, set] = useSpring(() => ({
    scale: 1,
    middleTouchOnElement: [0, 0],
    translateX: 0,
    translateY: 0,
    immediate: true,
    onFrame: ({ scale: currentScale }) => {
      if (typeof onScale === 'function') {
        onScale({ scale: currentScale })
      }
    },
  }))

  const handleTouchStart = useCallback(
    event => {
      if (event.touches.length !== 2) {
        return
      }

      if (retain ? !initialBoundingRect.current : true) {
        initialBoundingRect.current = element.current.getBoundingClientRect()
      }

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
      if (retain ? !initialPinchLength.current : true) {
        initialPinchLength.current = getLengthOfLine(touch1, touch2)
      }

      set({ middleTouchOnElement: [clientX, clientY], immediate: true })
    },
    [set]
  )

  const handleTouchMove = useCallback(
    event => {
      if (firstTouch.current) {
        const currentMiddleTouchOnElement = getMiddleTouchOnElement(
          event.touches,
          initialBoundingRect.current,
          difference.current
        )

        if (!retain ? event.touches.length : event.touches.length === 2) {
          const [touch1, touch2] = event.touches
          const currentPinchLength = getLengthOfLine(touch1, touch2)
          set({ scale: clamp(currentPinchLength / initialPinchLength.current, minScale, maxScale) })
        }
        set({
          translateX: currentMiddleTouchOnElement.clientX - firstTouch.current[0],
          translateY: currentMiddleTouchOnElement.clientY - firstTouch.current[1],
          immediate: true,
        })
      }
    },
    [set]
  )

  const handleTouchEnd = useCallback((event) => {
    if (retain && event.touches.length === 1 && event.changedTouches.length === 1) {
      const { clientX, clientY } = event.changedTouches[0]
      difference.current = { clientX: event.touches[0].clientX - clientX, clientY: event.touches[0].clientY - clientY }
    }

    if (retain ? event.touches.length < 1 : true) {
      set({
        scale: 1,
        translateX: 0,
        translateY: 0,
        immediate: false,
      })

      firstTouch.current = null
      initialPinchLength.current = null
      initialBoundingRect.current = null
      difference.current = null
    }

  }, [set])

  useEffect(() => {
    element.current.ontouchstart = handleTouchStart
    element.current.ontouchmove = handleTouchMove
    element.current.ontouchend = handleTouchEnd
  }, [handleTouchStart, handleTouchMove, handleTouchEnd])

  return [element, scale, translateX, translateY, middleTouchOnElement]
}
