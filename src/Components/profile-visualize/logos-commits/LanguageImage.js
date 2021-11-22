import styled from 'styled-components/macro'

const StyledImage = styled.img`
  // border: 1px solid red;
  height: 48px;
  width: 48px;
  margin: 10px;

`
export const LanguageImage = ({ imgSrc, name }) => {
  return <StyledImage src={imgSrc} alt={name} />
}
