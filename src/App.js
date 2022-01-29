import useFetch from './hooks/useFetch'
import userDataContext from './hooks/userDataContext'
import Container from './Components'

const App = () => {
  const {
    isLoading,
    apiData,
    serverError,
    overAllLanguages,
    commitsTimeline,
    reposPerLanguage,
    starGazers,
    reposBySizeForkStars,
  } = useFetch('facebook')
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
  return (
    <userDataContext.Provider value={userData}>
      <Container />
    </userDataContext.Provider>
  )
}

export default App
