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
    <div className="example">
      <h1>Simple example</h1>
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

      <h1>Example with overlay</h1>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. At eveniet dolorem, iure dolor
        velit sequi ad laborum facilis assumenda maxime obcaecati aspernatur eaque nulla, culpa,
        aliquam porro officia ut veritatis!
      </p>
      <ZoomSlider
        slides={slides}
        slideOverlay={
          <button
            type="button"
            onClick={() => alert('Added to favourites!')}
            style={{
              position: 'absolute',
              width: 40,
              top: 10,
              left: 10,
              padding: 0,
              appearance: 'none',
              border: 'none',
              background: 'none',
            }}
          >
            <img
              alt="Heart icon"
              src="data:image/svg+xml;base64,PHN2ZwpmaWxsPSJyZ2JhKDI1NSwyNTUsMjU1LDAuOCkiCnhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIKdmlld0JveD0iMCAwIDUwIDUwIgo+CjxwYXRoIGQ9Ik0gMjUgNDQuMjk2ODc1IEwgMjQuMzYzMjgxIDQzLjc2OTUzMSBDIDIzLjM2MzI4MSA0Mi45NDE0MDYgMjIuMDE5NTMxIDQyLjAyNzM0NCAyMC40Njg3NSA0MC45Njg3NSBDIDE0LjMwODU5NCAzNi43NjU2MjUgNSAzMC40MTQwNjMgNSAyMC4yODUxNTYgQyA1IDE0LjA2MjUgMTAuMDk3NjU2IDkgMTYuMzYzMjgxIDkgQyAxOS43MTQ4NDQgOSAyMi44NTE1NjMgMTAuNDU3MDMxIDI1IDEyLjk1NzAzMSBDIDI3LjE0ODQzOCAxMC40NTcwMzEgMzAuMjg5MDYzIDkgMzMuNjM2NzE5IDkgQyAzOS45MDIzNDQgOSA0NSAxNC4wNjI1IDQ1IDIwLjI4NTE1NiBDIDQ1IDMwLjQxNDA2MyAzNS42OTE0MDYgMzYuNzY1NjI1IDI5LjUzMTI1IDQwLjk2ODc1IEMgMjcuOTc2NTYzIDQyLjAyNzM0NCAyNi42MzY3MTkgNDIuOTQxNDA2IDI1LjYzNjcxOSA0My43Njk1MzEgWiIgLz4KPC9zdmc+Cg=="
            />
          </button>
        }
      />
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. At eveniet dolorem, iure dolor
        velit sequi ad laborum facilis assumenda maxime obcaecati aspernatur eaque nulla, culpa,
        aliquam porro officia ut veritatis!
      </p>
    </div>
  )
}

ReactDOM.render(<Example />, document.getElementById('root'))
