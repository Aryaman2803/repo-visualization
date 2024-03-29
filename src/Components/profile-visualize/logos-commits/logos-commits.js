import styled from 'styled-components/macro'
import { getLanguageImages } from '../../../hooks/langugage-images'
import { LanguageImage } from './LanguageImage'
import CommitChart from '../../Charts/commit-chart'
const Wrapper = styled.section`
  background: #f8f9ff;
  padding-bottom: 2rem;
`
const SplitDiv = styled.div`
  width: 45%;

  @media (max-width: 1400px) {
    width: 50%;
  }
  @media (max-width: 900px) {
    width: 80%;
  }
  @media (max-width: 500px) {
    width: 100%;
  }
`
const LanguageContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 70%;
  height: 75%;
  justify-content: center;
  align-content: center;
  margin: 0 auto;
  color: rgb(36, 41, 46);
  @import url('https://fonts.googleapis.com/css2?family=Inter&family=Josefin+Sans:wght@400;700&display=swap');
  font-family: Inter, system, -apple-system, BlinkMacSystemFont, Roboto,
    'Segoe UI', Arial, sans-serif;
  font-smooth: always;
  -webkit-font-smoothing: antialiased;

  & h3 {
    font-family: Inter, system, -apple-system, BlinkMacSystemFont, Roboto,
      'Segoe UI', Arial, sans-serif;
    color: rgb(36, 41, 46);
    font-weight: 500;
    -webkit-font-smoothing: antialiased;
  }
`
const GridContainer = styled.div`
  display: flex;
  width: 80vw;
  margin: 0 auto;
  justify-content: center;
  margin-bottom: 2rem;

  @media (max-width: 1200px) {
    width: 90vw;
  }
  @media (max-width: 900px) {
    & div:nth-child(1) {
      min-height: 250px;
    }
  }
  @media (max-width: 900px) {
    flex-direction: column;
    align-items: center;
  }
  @media (max-width: 500px) {
    flex-direction: column;
    align-items: center;
    width: 100%;
    padding: 0 4px;
  }
`
const Header = styled.header`
  text-align: center;
  padding: 1rem 0;
  color: rgb(36, 41, 46);
  font-size: 1.75rem;
  color: rgb(36, 41, 46);
  @import url('https://fonts.googleapis.com/css2?family=Inter&family=Josefin+Sans:wght@400;700&display=swap');
  font-family: Inter, system, -apple-system, BlinkMacSystemFont, Roboto,
    'Segoe UI', Arial, sans-serif;
  font-smooth: always;
  font-weight: 600;
  -webkit-font-smoothing: antialiased;
`

const LogoCommits = ({ overAllLanguages }) => {
  const lang = []

  for (let o of overAllLanguages) {
    for (let i in getLanguageImages) {
      if (o.toLowerCase() === getLanguageImages[i].name)
        lang.push({
          name: getLanguageImages[i].name,
          imgSrc: getLanguageImages[i].imgSrc,
        })
    }
  }
  const IndividualLanguageImage = lang.map((item) => {
    return (
      <LanguageImage imgSrc={item.imgSrc} key={item.name} name={item.name} />
    )
  })

  return (
    <>
      <Wrapper>
        <GridContainer>
          <SplitDiv>
            <Header>Languages</Header>
            <LanguageContainer>
              {IndividualLanguageImage.length > 0 ? (
                IndividualLanguageImage
              ) : (
                <h3>Nothing to show here!</h3>
              )}
            </LanguageContainer>
          </SplitDiv>
          <SplitDiv>
            <Header>Commits per quarter</Header>
            <CommitChart />
          </SplitDiv>
        </GridContainer>
      </Wrapper>
    </>
  )
}

export default LogoCommits
