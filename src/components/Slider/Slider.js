import React, { useRef, useState, useEffect, useCallback } from 'react'
import { useSpring, animated } from 'react-spring'
import { useDrag } from 'react-use-gesture'
import Slide from '../Slide'
import Dots from '../Dots'
import SlideIndicator from '../SlideIndicator'
import { clamp } from '../../helpers'
import { Slider as StyledSlider, Overlay as StyledOverlay } from './Slider.css'

const AnimatedSlider = animated(StyledSlider)
const AnimatedOverlay = animated(StyledOverlay)

export default function Slider({ slides }) {
  const [{ x, scale }, set] = useSpring(() => ({
    x: 0,
    scale: 1,
    config: { tension: 270, clamp: true },
  }))
  const index = useRef(0)

  // Slide numbers (for display purposes only)
  const [currentSlide, updateSlide] = useState(0)
  const [showIndicator, setIndicator] = useState(true)
  const [zooming, setZooming] = useState(false)

  const onScale = useCallback(
    slideProps => {
      set({ scale: slideProps.scale })
      if (slideProps.scale === 1) {
        setZooming(false)
      } else {
        setZooming(true)
      }
    },
    [set]
  )

  useEffect(() => {
    const timer = setTimeout(() => {
      setIndicator(false)
    }, 5000)
    return () => clearTimeout(timer)
  }, [])

  const bind = useDrag(
    ({
      down,
      movement: [xMovement],
      direction: [xDir],
      distance,
      swipe: [swipeX],
      cancel,
      touches,
    }) => {
      // We don't want to interrupt the pinch-to-zoom gesture
      if (touches > 1) {
        cancel()
      }

      // We have swiped past halfway
      if (!down && distance > window.innerWidth / 2) {
        // Move to the next slide
        const slideDir = xDir > 0 ? -1 : 1
        index.current = clamp(index.current + slideDir, 0, slides.length - 1)

        set({
          x: -index.current * window.innerWidth + (down ? xMovement : 0),
          immediate: false,
        })
      } else if (swipeX !== 0) {
        // We have detected a swipe - update the new index
        index.current = clamp(index.current - swipeX, 0, slides.length - 1)
      }

      // Animate the transition
      set({
        x: -index.current * window.innerWidth + (down ? xMovement : 0),
        immediate: down,
      })

      // Update the slide number for display purposes
      updateSlide(index.current)
    },
    {
      axis: 'x',
      bounds: {
        left: currentSlide === slides.length - 1 ? 0 : -Infinity,
        right: index.current === 0 ? 0 : Infinity,
        top: 0,
        bottom: 0,
      },
      rubberband: true,
      enabled: slides.length > 1,
    }
  )

  return (
    <div>
      {zooming && (
        <AnimatedOverlay
          style={{
            backgroundColor: scale
              .interpolate({ range: [1, 2, 10], output: [0, 0.7, 0.7] })
              .interpolate(opacity => `rgba(0, 0, 0, ${opacity})`),
          }}
        />
      )}

      <SlideIndicator
        totalSlides={slides.length}
        currentSlide={currentSlide}
        isVisible={showIndicator}
        inFront={!zooming}
      />

      <AnimatedSlider
        {...bind()}
        style={{
          transform: x.interpolate(x => `translateX(${x}px`),
        }}
      >
        {slides.map((slide, idx) => (
          <Slide onScale={onScale} key={idx}>
            {slide}
          </Slide>
        ))}
      </AnimatedSlider>

      {slides.length > 1 && (
        <Dots
          slides={slides}
          currentSlide={currentSlide}
          centerDots={slides.length < 6 ? slides.length : undefined}
        />
      )}
    </div>
  )
}
