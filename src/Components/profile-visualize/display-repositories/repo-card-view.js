import styled from 'styled-components'

const RepoCardView = (props) => {
  const { name, desc, url, language, size, stars, forks } = props

  const Wrapper = styled.div`
    width: 320px;
    height: 200px;
    border: 1px solid red;
    // margin:5px 0;

    @media (max-width: 900px) {
      width: 270px;
    }
    @media (max-width: 720px) {
      width: 100%;
    }
    & img {
      width: 22px;
    }
  `
  const RepoName = styled.div``
  const RepoDsec = styled.div``
  const InfoWrapper = styled.div``
  const Span = styled.div``

  return (
    <Wrapper>
      <RepoName>
        <img
          src='https://img.icons8.com/windows/32/000000/repository.png'
          alt={name}
        />
        {name}
      </RepoName>
      <RepoDsec>{desc}</RepoDsec>
      <InfoWrapper>
        <Span>{language}</Span>

        <Span>{size}</Span>

        <Span>
          <img
            src='https://img.icons8.com/ios-glyphs/30/000000/star--v1.png'
            alt='stars'
          />{' '}
          {stars}
        </Span>

        <Span>
          <svg
            aria-hidden='true'
            height='16'
            viewBox='0 0 16 16'
            version='1.1'
            width='16'
            data-view-component='true'
            className='octicon octicon-repo-forked mr-2'
          >
            <path
              fillRule='evenodd'
              d='M5 3.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm0 2.122a2.25 2.25 0 10-1.5 0v.878A2.25 2.25 0 005.75 8.5h1.5v2.128a2.251 2.251 0 101.5 0V8.5h1.5a2.25 2.25 0 002.25-2.25v-.878a2.25 2.25 0 10-1.5 0v.878a.75.75 0 01-.75.75h-4.5A.75.75 0 015 6.25v-.878zm3.75 7.378a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm3-8.75a.75.75 0 100-1.5.75.75 0 000 1.5z'
            ></path>
          </svg>
          {forks}
        </Span>
      </InfoWrapper>

      <h4></h4>
    </Wrapper>
  )
}

export default RepoCardView
