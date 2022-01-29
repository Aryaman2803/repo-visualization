import React from 'react'
import styled from 'styled-components/macro'
import ReposPerLanguage from '../../Charts/repos-per-language'
import ReposStarsChart from '../../Charts/repos-per-star'

const Wrapper = styled.section`
  background: #f8f9ff;
  font-family: AllianceNo1, system-ui, -apple-system, Segoe UI, Roboto, Ubuntu,
    Cantarell, Noto Sans, sans-serif, BlinkMacSystemFont, Helvetica Neue, Arial,
    Apple Color Emoji, Segoe UI Emoji, Segoe UI Symbol, Noto Color Emoji;
`
const Container = styled.article`
  // text-align: center;
  // border: 1px solid red;
  max-width: 90%;
  margin: 0 auto;
  display: flex;
  justify-content: space-evenly;

  @media (max-width: 900px) {
    flex-direction: column;
    align-items: center;
  }
  @media (max-width: 500px) {
    max-width: 100%;
  }
`

const Span1 = styled.div`
  font-size: 22px;
  text-align: center;
  padding: 1rem 0;
  color: rgb(36, 41, 46);
  font-size: 1.75rem;
  font-weight: 500;
`
const Span2 = styled.div`
  margin-bottom: 3rem;
  text-align: center;
  padding: 1rem 0;
  color: rgb(36, 41, 46);
  font-size: 1.75rem;
  font-weight: 500;

  @media (max-width: 1150px) {
    margin-bottom: 6rem;
  }
  @media (max-width: 900px) {
    margin-bottom: 1rem;
  }
`
const Div = styled.div`
  width: 90%;
  max-width: 450px;
  padding-right: 1rem;

  @media (max-width: 900px) {
    margin-bottom: 2rem;
  }

  @media (max-width: 500px) {
    width: 100%;
    max-width: 100%;
  }
`
const Div2 = styled.div`
  width: 650px;

  @media (max-width: 1150px) {
    width: 450px;
  }
  @media (max-width: 900px) {
    width: 80%;
  }
  @media (max-width: 500px) {
    width: 100%;
  }
`

const Break = styled.div`
  height: 3px;
  width: 80%;
  margin: 0 auto;
  background-image: linear-gradient(to right, #40acff 0%, #d678ff 100%);
  border-radius: 50%;
`
const Repositories = () => {
  return (
    <Wrapper>
      <Break></Break>
      <Container>
        <Div>
          <Span1>Repos per language</Span1>
          <ReposPerLanguage />
        </Div>
        <Div2>
          <Span2>Most Starred</Span2>
          <ReposStarsChart />
        </Div2>
      </Container>
      <Break></Break>
    </Wrapper>
  )
}

export default Repositories
