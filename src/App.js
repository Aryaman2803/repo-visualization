import { useState } from 'react'
import axios from 'axios'
import { useEffect } from 'react/cjs/react.development'
import { useNavigate } from 'react-router-dom'

const App = () => {
  const [profile, setProfile] = useState('')
  const [Error, setError] = useState(false)
  const navigate = useNavigate()
  const handleSubmit = async (e) => {
    e.preventDefault()
    const url = `https://api.github.com/users/${profile}`

    try {
      const fetch = await axios.get(url)
      if (fetch.status === 200) {
        setProfile('')
        navigate(`user/${profile}`)
      }
    } catch (error) {
      console.log(error, 'error ho gaya')
      setProfile('')
      setError(true)
    }
  }

  // useEffect(() => {}, [profile])
  return (
    <section>
      <form onSubmit={handleSubmit}>
        <input
          type='text'
          value={profile}
          onChange={(e) => setProfile(e.target.value)}
        ></input>
        <button type='submit' value='submit'>
          submit
        </button>
      </form>

      {Error && <h3>Something went wrong</h3>}
    </section>
  )
}

// const App = () => {
//   const {
//     isLoading,
//     apiData,
//     serverError,
//     overAllLanguages,
//     commitsTimeline,
//     reposPerLanguage,
//     starGazers,
//     reposBySizeForkStars,
//   } = useFetch('facebook')
//   const userData = {
//     isLoading,
//     apiData,
//     serverError,
//     overAllLanguages,
//     commitsTimeline,
//     reposPerLanguage,
//     starGazers,
//     reposBySizeForkStars,
//   }
//   return (
//     <userDataContext.Provider value={userData}>
//       <Container />
//     </userDataContext.Provider>
//   )
// }

export default App
