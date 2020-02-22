import React from 'react'
import PropTypes from 'prop-types'
import { animated } from 'react-spring'
import useSlider from '../../hooks/useSlider'
import Slide from '../Slide'
import Dots from '../Dots'
import SlideIndicator from '../SlideIndicator'
import {
  MAX_SCALE_DEFAULT,
  MIN_SCALE_DEFAULT,
  ACTIVE_DOT_COLOR_DEFAULT,
  DOT_COLOR_DEFAULT,
} from '../../constants'
import {
  Overlay as StyledOverlay,
  SlideOverlay as StyledSlideOverlay,
  Slider as StyledSlider,
} from './Slider.css'

const AnimatedOverlay = animated(StyledOverlay)
const AnimatedSlider = animated(StyledSlider)

export default function Slider({
  slides,
  slideOverlay,
  slideIndicatorTimeout,
  activeDotColor,
  dotColor,
}) {
  const [zooming, scale, currentSlide, showIndicator, bind, x, onScale] = useSlider({
    slides,
    slideIndicatorTimeout,
  })

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

      <StyledSlideOverlay inFront={!zooming}>
        {slideOverlay}
        <SlideIndicator
          totalSlides={slides.length}
          currentSlide={currentSlide}
          isVisible={showIndicator}
        />
      </StyledSlideOverlay>

      <AnimatedSlider
        // eslint-disable-next-line react/jsx-props-no-spreading
        {...bind()}
        style={{
          transform: x.interpolate(slideX => `translateX(${slideX}px`),
        }}
      >
        {slides.map((slide, idx) => (
          // eslint-disable-next-line react/no-array-index-key
          <Slide onScale={onScale} key={idx}>
            {slide}
          </Slide>
        ))}
      </AnimatedSlider>

      {slides.length > 1 && (
        <Dots
          totalSlides={slides.length}
          currentSlide={currentSlide}
          centerDots={slides.length < 6 ? slides.length : undefined}
          dotColor={dotColor}
          activeDotColor={activeDotColor}
        />
      )}
    </div>
  )
}

Slider.propTypes = {
  /** List of slides to render */
  slides: PropTypes.arrayOf(PropTypes.node).isRequired,
  /** Maximum zoom level */
  maxScale: PropTypes.number,
  /** Minimum zoom level */
  minScale: PropTypes.number,
  /** Content to overlay on the slider */
  slideOverlay: PropTypes.node,
  /** Time in ms until the slide indicator fades out. Set to `null` to disable this behavior. */
  slideIndicatorTimeout: PropTypes.number,
  /** Pagination dot color for the active slide */
  activeDotColor: PropTypes.string,
  /** Pagination dot color for all other slides */
  dotColor: PropTypes.string,
}

Slider.defaultProps = {
  maxScale: MAX_SCALE_DEFAULT,
  minScale: MIN_SCALE_DEFAULT,
  slideOverlay: null,
  slideIndicatorTimeout: 5000,
  activeDotColor: ACTIVE_DOT_COLOR_DEFAULT,
  dotColor: DOT_COLOR_DEFAULT,
}
