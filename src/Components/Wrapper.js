import useFetch from '../hooks/useFetch'
import Container from '.'
import userDataContext from '../hooks/userDataContext'
import { useParams } from 'react-router-dom'

const Wrapper = () => {
  const { username } = useParams()

  const {
    isLoading,
    apiData,
    serverError,
    overAllLanguages,
    commitsTimeline,
    reposPerLanguage,
    starGazers,
    reposBySizeForkStars,
  } = useFetch(username)

  const userData = {
    isLoading,
    apiData,
    serverError,
    overAllLanguages,
    commitsTimeline,
    reposPerLanguage,
    starGazers,
    reposBySizeForkStars,
  }

  // console.log(userData)

  return (
    <userDataContext.Provider value={userData}>
      <Container />
    </userDataContext.Provider>
  )
}
export default Wrapper
