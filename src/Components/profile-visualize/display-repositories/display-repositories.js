import { useContext, useEffect, useState } from 'react'
import userDataContext from '../../../hooks/userDataContext'
import FlipMove from 'react-flip-move'
import RepoCardView from './repo-card-view'
import styled from 'styled-components'

const DisplayRepositories = () => {
  const { isLoading, reposBySizeForkStars } = useContext(userDataContext)
  const [displayData, setDisplayData] = useState()
  const [selects, setSelects] = useState('Size')

  //Modify data according to user filter
  const changeData = (data) => {
    const sortedRepos = [...reposBySizeForkStars]
    if (data === 'Stars') {
      sortedRepos.sort((a, b) => b.stars - a.stars)
    } else if (data === 'Fork') {
      sortedRepos.sort((a, b) => b.forks - a.forks)
    } else if (data === 'Size') {
      sortedRepos.sort((a, b) => b.size - a.size)
    }

    if (sortedRepos.length >= 8) sortedRepos.length = 8
    setDisplayData(sortedRepos)
  }

  useEffect(() => {
    changeData(selects)
  }, [selects])

  const Wrapper = styled.section`
    @import url('https://fonts.googleapis.com/css2?family=Inter&family=Josefin+Sans:wght@400;700&display=swap');
    background: #f8f9ff;
    font-family: Inter, system, -apple-system, BlinkMacSystemFont, Roboto,
      'Segoe UI', Arial, sans-serif;
    font-smooth: always;
    -webkit-font-smoothing: antialiased;
    padding: 2rem 5rem;

    @media (max-width: 500px) {
      padding: 1rem;
    }
  `
  const Container = styled.div`
    max-width: 1400px;
    margin: 0 auto;
  `
  const Header = styled.div`
    border: 1px solid pink;
    display: inline-div;
    padding: 1rem 0;
    font-size: 1.75rem;
    font-weight: 500;
    color: rgb(36, 41, 46);
    margin-bottom: 1rem;

    & a {
      color: pink;
      font-size: 1rem;
      color: rgb(106, 115, 125);
      margin: 0px 1rem;
    }
  `
  const SpanSelect = styled.span`
    border: 1px solid red;
  `
  const CardViewer = styled.div`
    // display: flex;
    // flex-direction: row;
    // flex-wrap: wrap;
    display: grid;
    // justify-items: center;
    grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
    grid-template-rows: repeat(2, 1fr);
    grid-column-gap: 0.4rem;
    grid-row-gap: 1rem;
    // padding: 2rem 5rem;

    @media (max-width: 900px) {
      grid-template-columns: repeat(auto-fit, minmax(270px, 1fr));
      grid-column-gap: 0.2rem;
      grid-row-gap: 1.5rem;
    }
  `
  return (
    <>
      {isLoading && <h2>Loading...</h2>}

      <Wrapper>
        <Container>
          <Header>
            Top Repos <a>by</a>
            <SpanSelect>
              <select
                onChange={(e) => setSelects(e.target.value)}
                value={selects}
              >
                <option value='Size'>Size</option>
                <option value='Stars'>Stars</option>
                <option value='Fork'>Fork</option>
              </select>
            </SpanSelect>
          </Header>
          <CardViewer>
            {reposBySizeForkStars.length >= 1 && displayData ? (
              displayData.map((repo) => {
                return (
                  <RepoCardView
                    key={repo.name}
                    name={repo.name}
                    url={repo.url}
                    language={repo.language}
                    size={repo.size}
                    stars={repo.stars}
                    forks={repo.forks}
                    desc={repo.desc}
                  />
                )
              })
            ) : (
              <h4>No repositories to display!</h4>
            )}
          </CardViewer>
        </Container>
      </Wrapper>
    </>
  )
}
export default DisplayRepositories
