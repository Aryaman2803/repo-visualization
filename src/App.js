import useFetch from './hooks/useFetch'
import userDataContext from './hooks/userDataContext'
import Container from './Components'
const App = () => {
  
  const { isLoading, apiData, serverError } = useFetch(
    'https://api.github.com/users/aryaman2803'
  )
  const userData = { isLoading, apiData, serverError }
  return (
    <>
      <userDataContext.Provider value={userData}>
        <Container />
      </userDataContext.Provider>
    </>
  )
}

export default App
