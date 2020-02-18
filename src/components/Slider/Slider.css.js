import styled from 'styled-components'

export const Slider = styled.div`
  display: grid;
  grid-auto-flow: column;
  width: 100%;
  user-select: none;
  touch-action: pan-y;
  -webkit-user-drag: none;
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
`

export const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
`
