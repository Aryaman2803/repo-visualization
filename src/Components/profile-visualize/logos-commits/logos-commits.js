import styled from 'styled-components/macro'
import { getLanguageImages } from '../../../hooks/langugage-images'
import { LanguageImage } from './LanguageImage'
import CommitChart from '../../../hooks/commit-chart'
const Wrapper = styled.section`
  background: #f8f9ff;
`

const GridContainer = styled.div`
  display: flex;
  // border: 1px solid red;
  width: 80vw;
  margin: 0 auto;
  justify-content: center;
  // min-width: 300px;
  // min-height: 300px;

  @media (max-width: 900px) {
    flex-direction: column;
    align-items: center;
  }
  @media (max-width: 500px) {
    flex-direction: column;
    align-items: center;
    width:100%;
    padding:0 4px;
  }
`
const StyledLanguages = styled.div`
  // border: 1px solid orange;
  max-width: 50%;
  padding: 0 2rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  @media (max-width: 900px) {
    max-width: 100%;
    padding: 1rem;
  }
`
const StyledCommits = styled.div`
  // border: 1px solid teal;
  width: 50%;

  @media (max-width: 900px) {
    width: 100%;
    height:100%;
  }
`
const StyledImagesContainer = styled.div`
  width: 80%;
  // margin:0 auto;
  // border: 1px solid red;
  display: flex;
  flex-wrap: wrap;

  @media (max-width: 900px) {
    width: 100%;
    padding: 1rem;
  }
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
          <CommitChart />
        </StyledCommits>
      </GridContainer>
    </Wrapper>
  )
}

export default LogoCommits
