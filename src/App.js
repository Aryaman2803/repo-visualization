import useFetch from './hooks/useFetch'

const App = () => {
  const { isLoading, apiData, serverError } = useFetch(
    'https://api.github.com/users/aryaman2803'
  )
  console.log(apiData)
  // const {
  //   avatar_url,
  //   bio = null,
  //   blog,
  //   company,
  //   email,
  //   followers,
  //   followers_url,
  //   following,
  //   following_url,
  //   html_url,
  //   location,
  //   public_repos,
  //   repos_url,
  //   name,
  // } = apiData
  return (
    <>
      {/* {isLoading && !serverError ? (
        <h2>Loading...</h2>
      ) : !apiData ? (
        <h2>Loading...</h2>
      ) : (
        <div>
          <h2>User: {apiData.name}</h2>
        </div>
      )} */}
      {apiData && <h1>User: {apiData.name}</h1>}
    </>
  )
}

export default App
