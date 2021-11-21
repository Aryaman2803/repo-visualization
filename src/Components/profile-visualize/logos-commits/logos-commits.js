import styled from 'styled-components/macro'

const Wrapper = styled.section`
  background: #f8f9ff;
`

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 2fr;
  grid-gap: 1rem;
  border: 1px solid red;
  grid-auto-rows: minmax(300px, auto);
  grid-template-areas: 'language commits';
  //   padding: 2rem 2rem;
`
const StyledLanguages = styled.div`
  border: 1px solid hotpink;
  //   max-width: 70%;
`
const StyledCommits = styled.div`
  grid-area: commits;
  border: 1px solid teal;
  //   max-width: 70%;
`

const LogoCommits = () => {
  return (
    <Wrapper>
      <GridContainer>
        <StyledLanguages>
          heloo my name is jin songLorem Ipsum is simply dummy text of the
          printing and typesetting industry. Lorem Ipsum has been the industry's
          standard dummy text ever since the 1500s, when an unknown printer took
          a galley of type and scrambled it to make a type specimen book. It has
          survived not only five centuries, but also the leap into electronic
          typesetting, remaining essentially unchanged. It was popularised in
          the 1960s with the release of Letraset sheets containing Lorem Ipsum
          passages, and more recently with desktop publishing software like
          Aldus PageMaker including versions of Lorem Ipsum.
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
