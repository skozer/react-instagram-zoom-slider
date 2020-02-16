/* eslint-disable import/no-extraneous-dependencies */
import React from 'react'
import ReactDOM from 'react-dom'
import ZoomSlider from 'react-instagram-zoom-slider'
import './index.css'

const IMG_URLS = [
  'https://source.unsplash.com/mMa_cpvxeBU/1600x1600',
  'https://source.unsplash.com/ulJYHTb86Bo/1600x1600',
  'https://source.unsplash.com/GCm0tha8IGY/1600x1600',
  'https://source.unsplash.com/T0nxUz68lG0/1600x1600',
  'https://source.unsplash.com/2d4lAQAlbDA/1600x1600',
  'https://source.unsplash.com/qQQdRI_Y7iw/1600x1600',
]

const slides = IMG_URLS.map(src => <img src={src} alt="Pascale Dress - Floral" draggable="false" />)

function Example() {
  return (
    <div className="App">
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. At eveniet dolorem, iure dolor
        velit sequi ad laborum facilis assumenda maxime obcaecati aspernatur eaque nulla, culpa,
        aliquam porro officia ut veritatis!
      </p>
      <ZoomSlider slides={slides} />
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. At eveniet dolorem, iure dolor
        velit sequi ad laborum facilis assumenda maxime obcaecati aspernatur eaque nulla, culpa,
        aliquam porro officia ut veritatis!
      </p>
    </div>
  )
}

ReactDOM.render(<Example />, document.getElementById('root'))
