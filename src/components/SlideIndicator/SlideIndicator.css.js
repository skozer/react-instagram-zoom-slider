import styled from 'styled-components'

export const SlideIndicator = styled.div`
  background-color: rgba(0, 0, 0, 0.7);
  color: white;
  display: inline-block;
  z-index: ${props => (props.inFront ? 20 : 0)};
  position: absolute;
  right: 20px;
  margin-top: 20px;
  border-radius: 15px;
  font-size: 14px;
  padding: 6px;
  letter-spacing: 1px;
  user-select: none;
  pointer-events: none;
`
