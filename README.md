**react-instagram-zoom-slider** is a slider component with pinch to zoom capabilities inspired by Instagram.

[![NPM](https://img.shields.io/npm/v/react-instagram-zoom-slider?style=flat-square)](https://www.npmjs.com/package/react-instagram-zoom-slider)
[![npm bundle size](https://img.shields.io/bundlephobia/minzip/react-instagram-zoom-slider?style=flat-square)](https://bundlephobia.com/result?p=react-instagram-zoom-slider)

## Example

[![react-instagram-zoom-slider demo](https://i.imgur.com/cpz7qNY.gif)](https://skozer.github.io/react-instagram-zoom-slider/)

[**👉 View this interactive demo here**](https://skozer.github.io/react-instagram-zoom-slider/)

## Install

```bash
yarn add react-instagram-zoom-slider react-spring react-use-gesture styled-components
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

### Common Props

Common props you may want to specify include:

| Prop                    | Description                                                                                          | Default    |
| ----------------------- | ---------------------------------------------------------------------------------------------------- | ---------- |
| `slides`                | List of slides to render                                                                             | _Required_ |
| `initialSlide`          | Index of the slide to be rendered by default                                                         | 0          |
| `maxScale`              | Maximum zoom level                                                                                   | 4          |
| `minScale`              | Minimum zoom level                                                                                   | 1          |
| `slideOverlay`          | Content to overlay on the slider                                                                     | null       |
| `slideIndicatorTimeout` | Time in milliseconds until the slide indicator fades out.<br>Set to `null` to disable this behavior. | 5000       |
| `activeDotColor`        | Pagination dot color for the active slide                                                            | #4e99e9    |
| `dotColor`              | Pagination dot color for all other slides                                                            | #dadbdc    |

### Building a custom slider

If you need to customize the slider components beyond what is available
via props, you can use the `useSlider` and `useZoom` hooks to build your
own components with slide and zoom functionality.

## License

MIT Licensed. Copyright © [Sean Kozer](https://github.com/skozer) 2020.
