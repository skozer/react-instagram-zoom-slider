**react-instagram-zoom-slider** is a slider component with pinch to zoom capabilities inspired by Instagram.

[![NPM](https://img.shields.io/npm/v/react-instagram-zoom-slider?style=flat-square)](https://www.npmjs.com/package/react-instagram-zoom-slider)
[![npm bundle size](https://img.shields.io/bundlephobia/minzip/react-instagram-zoom-slider?style=flat-square)](https://bundlephobia.com/result?p=react-instagram-zoom-slider)

## Install

```bash
yarn add react-instagram-zoom-slider
```

## Usage

```jsx
import React, { Component } from 'react'
import ZoomSlider from 'react-instagram-zoom-slider'

function App() {
  const slides = [<img src="..." alt="First slide" />, <img src="..." alt="Second slide" />]

  return <ZoomSlider slides={slides} />
}
```

## License

MIT Licensed. Copyright © [Sean Kozer](https://github.com/skozer) 2020.
