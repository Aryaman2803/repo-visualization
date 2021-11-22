import styled from 'styled-components/macro'
import { getLanguageImages } from '../../../hooks/langugage-images'
import { LanguageImage } from './LanguageImage'
const Wrapper = styled.section`
  background: #f8f9ff;
`

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 2fr;
  grid-gap: 1rem;
  border: 1px solid red;
  grid-auto-rows: minmax(200px, auto);
  grid-template-areas: 'language commits';
  //   padding: 2rem 2rem;

  @media(max-width:800px){
  }

`
const StyledLanguages = styled.div`
  border: 1px solid hotpink;
    max-width: 60%;
  padding: 1rem;
  justify-self:end;

  @media(max-width:900px){
    max-width:100%;
  }
`
const StyledCommits = styled.div`
  grid-area: commits;
  border: 1px solid teal;
   
`
const StyledImagesContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  
`


const LogoCommits = ({ overAllLanguages }) => {
  const lang = []
  const iv = (() => {
    for (let o of overAllLanguages) {
      for (let i in getLanguageImages) {
        if (o.toLowerCase() === getLanguageImages[i].name)
          lang.push({
            name: getLanguageImages[i].name,
            imgSrc: getLanguageImages[i].imgSrc,
          })
      }
    }
  })()
  const IndividualLanguageImage = lang.map((item) => {
    return (
      <LanguageImage imgSrc={item.imgSrc} key={item.name} name={item.name} />
    )
  })
  return (
    <Wrapper>
      <GridContainer>
        <StyledLanguages>
          <h4>Languages</h4>
          <StyledImagesContainer>
            {IndividualLanguageImage}
          </StyledImagesContainer>
        </StyledLanguages>
        <StyledCommits>
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry's standard dummy text ever
          since the 1500s, when an unknown printer took a galley of type and
          scrambled it to make a type specimen book. It has survived not only
          five centuries, but also the leap into electronic typesetting,
          remaining essentially unchanged. It was popularised in the 1960s with
          the release of Letraset sheets containing Lorem Ipsum passages, and
          more recently with desktop publishing software like Aldus PageMaker
          including versions of Lorem Ipsum.
        </StyledCommits>
      </GridContainer>
    </Wrapper>
  )
}

export default LogoCommits
