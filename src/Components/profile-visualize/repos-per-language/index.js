import React from 'react'
import styled from 'styled-components/macro'
import ReposPerLanguage from '../../../hooks/repos-per-language'

const Wrapper = styled.section`
  background: #f8f9ff;
  //   border: 1px solid teal;
`
const Container = styled.article`
  text-align: center;
  //   border: 1px solid red;
`
const Div = styled.div`
  display: inline-block;
  vertical-align: top;
  //   border: 1px solid purple;
  width: 100%;
  max-width: 450px;

  @media (min-width: 1000px) {
    margin: 0 1rem;
  }
  @media (max-width: 1000px) {
    margin: 0 1rem;
    max-width: 400px;
  }
  @media (max-width: 500px) {
    margin: 1rem 0;
  }
`
const Break = styled.div`
  height: 3px;
  width: 80%;
  margin: 0 auto;
  background-image: linear-gradient(to right, #40acff 0%, #d678ff 100%);
  border-radius:50%;
  margin-bottom:2rem;
`
const Repositories = () => {
  return (
    <Wrapper>
      <Break></Break>
      <Container>
        <Div>
          <ReposPerLanguage />
        </Div>
        <Div>
          <ReposPerLanguage />
        </Div>
      </Container>
    </Wrapper>
  )
}

export default Repositories
