/**
 * @jest-environment node
 */
/* eslint-disable no-undef */
import React from 'react'
import { renderToString } from 'react-dom/server'
import Slider from '.'

describe('Server-side rendering', () => {
  it('renders on a server without crashing', () => {
    const slides = [<img src="..." alt="First slide" />, <img src="..." alt="Second slide" />]
    const renderOnServer = () => renderToString(<Slider initialSlide={1} slides={slides} />)

    expect(renderOnServer).not.toThrow()
  })
})
