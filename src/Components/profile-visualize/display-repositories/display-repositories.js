import { useContext, useEffect, useState } from 'react'
import userDataContext from '../../../hooks/userDataContext'
import RepoCardView from './repo-card-view'
import styled from 'styled-components/macro'

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
  display: inline-div;
  padding: 1rem 0;
  font-size: 1.75rem;
  font-weight: 500;
  color: rgb(36, 41, 46);
  margin-bottom: 1rem;

  & a {
    color: pink;
    font-size: 1rem;
    padding-top: 2rem;
    color: rgb(106, 115, 125);
    margin: 0px 1rem;
  }
`
const SpanSelect = styled.span`
  // border: 1px solid red;
`
const Select = styled.select`
  width: 100px;
  font-size: 15px;
  font-weight: 500;
  line-height: 1;
  text-align: left;
  color: #6190ff;
  background-color: transparent;
  border: 1px solid rgba(0, 118, 255, 0.1);
  padding: 10px 7px;
  border-radius: 5px;
  outline: none;
  cursor: pointer;
  border: 0px;
  border-radius: 0px;
  transition: all 0.2s ease-in-out 0s;
  border: 1px solid rgba(0, 118, 255, 0.1);
  border-radius: 6px;

  & option {
    font-size: 14px;
    font-weight: 500;
    padding: 10px 7px;
    border-radius: 5px;
    background-color: #f8f9ff;
  }
`
const CardViewer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  grid-template-rows: repeat(2, 1fr);
  grid-column-gap: 0.4rem;
  grid-row-gap: 1rem;
  // padding: 2rem 5rem;

  & h4{
    font-weight:500;
  }

  @media (max-width: 900px) {
    grid-template-columns: repeat(auto-fit, minmax(270px, 1fr));
    grid-column-gap: 0.2rem;
    grid-row-gap: 1.5rem;
  }
`

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

  return (
    <>
      {isLoading && <h2>Loading...</h2>}

      <Wrapper>
        <Container>
          <Header>
            Top Repos <a>by</a>
            <SpanSelect>
              <Select
                onChange={(e) => setSelects(e.target.value)}
                value={selects}
              >
                <option value='Size'>Size</option>
                <option value='Stars'>Stars</option>
                <option value='Fork'>Fork</option>
              </Select>
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
