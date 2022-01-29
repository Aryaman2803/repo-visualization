import styled from 'styled-components/macro'

const Wrapper = styled.div`
  width: 320px;
  min-height: 200px;
  padding: 1rem 2rem;
  border-radius: 0.25rem;
  box-shadow: rgb(0 0 0 / 20%) 0px 10px 30px -15px;
  transition: all 200ms cubic-bezier(0.23, 1, 0.32, 1) 0s;
  background-color: rgb(255, 255, 255, 0.8);

  @media (max-width: 900px) {
    width: 270px;
  }
  @media (max-width: 720px) {
    width: 100%;
  }
`
const RepoName = styled.div`
  @import url('https://fonts.googleapis.com/css2?family=Roboto+Mono:wght@400;700&display=swap');

  padding: 0.5rem 0;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  color: rgb(36, 41, 46);
  font-size: 20px;
  font-family: 'Roboto Mono', monospace;
  font-weight: 700;
  letter-spacing: -0.5px;

  & img {
    width: 20px;
    margin-right: 0.5rem;
    vertical-align: middle;
  }
`
const RepoDsec = styled.div`
  padding: 0.5rem 4px;
  height: 95px;

  display: -webkit-box;
  -webkit-line-clamp: 4;
  -webkit-box-orient: vertical;
  overflow: hidden;

  font-size: 14px;
  color: rgb(88, 96, 105);
  // margin-bottom: 1rem;
  line-height: 1.5;
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400&display=swap');
  font-family: Inter, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial,
    Sans-Serif;
`
const InfoWrapper = styled.div`
  display: flex;
  padding-top: 1rem;
  padding-bottom: 0.5rem;
  font-size: 13px;
  color: rgb(106, 115, 125);
  justify-content: space-evenly;
`
const Span = styled.div`
  margin-right: 1rem;
  & img,
  svg {
    width: 18px;
    margin-right: 0.5rem;
    vertical-align: sub;
  }
`
const A = styled.a`
  color: red;
  cursor: pointer;
  text-decoration: none;
`
const RepoCardView = (props) => {
  const { name, desc, url, language, size, stars, forks } = props

  return (
    <Wrapper>
      <A href={url} target='_blank' rel='noreferrer'>
        <RepoName>
          <img
            src='https://img.icons8.com/windows/32/000000/repository.png' width='20px' height='20px'
            alt={name}
          />
          {name}
        </RepoName>
        <RepoDsec>{desc}</RepoDsec>
        <InfoWrapper>
          <Span>{language}</Span>

          <Span>{size} KB</Span>

          <Span>
            <img
              src='https://img.icons8.com/ios-glyphs/30/000000/star--v1.png'
              width='18px' height='18px'
              alt='stars'
            />
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
      </A>
    </Wrapper>
  )
}

export default RepoCardView
