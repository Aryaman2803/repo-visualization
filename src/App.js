import useFetch from './hooks/useFetch'
import Display from './Components/display/Display'
import userDataContext from './hooks/userDataContext'

const App = () => {
  const { isLoading, apiData, serverError } = useFetch(
    'https://api.github.com/users/aryaman2803'
  )
  const userData = { isLoading, apiData, serverError }
  return (
    <>
      <userDataContext.Provider value={userData}>
        <Display />
      </userDataContext.Provider>
    </>
  )
}

export default App
