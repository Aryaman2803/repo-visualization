import { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components/macro'

const Section = styled.section`
  height: 100vh;
  // display: flex;
  // flex-direction: column;
  // justify-content: center;
  // align-items: center;
  background: rgb(248, 249, 255);
`
const Header = styled.header`
  display: flex;
  flex-direction: row;
  background: #1a2020;
  color: rgb(248, 249, 255);
  letter-spacing: 2px;
  justify-content: center;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica,
    Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol';
  font-weight: 600;
  opacity: 0.9;
  text-align: center;
  align-items: center;
  padding: 3rem 0;
  font-size: 3rem;

  border-bottom: 1px solid;
  border-image-slice: 1;
  border-width: 10px;
  // border-image-source: linear-gradient(to left, #6dc7ff, #e6abff);
  border-image-source: linear-gradient(
    to right,
    rgb(64, 172, 255) 0%,
    rgb(214, 120, 255) 100%
  );

  // border-image-source: linear-gradient(to left, #743ad5, #d53a9d);

  & img {
    margin-right: 1rem;
  }
  @media (max-width: 700px) {
    font-size: 2.4rem;

    & img {
      width: 50px;
      height: 50px;
    }
  }

  @media (max-width: 500px) {
    font-size: 2rem;
    margin-right: 0;
  }
`
const Form = styled.form`
  display: flex;
  justify-content: center;
  margin-top: 10rem;
  flex-direction: row;
`

const InputBox = styled.input`
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica,
    Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol';
  padding: 0.75rem;
  border: none;
  background-color: transparent;
  font-size: 2rem;
  width: 500px;
  height: 50px;
  border-bottom: 1px solid black;
  &:focus {
    outline: none;
  }

  @media (max-width: 700px) {
    width: 350px;
    padding: 0;
  }
  @media (max-width: 500px) {
    width: 250px;
    padding: 0;
    font-size: 1.3rem;
  }
`
const Button = styled.button`
  font-size: 1.2rem;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica,
    Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol';
  padding: 0 0.5rem;
  background: #4f46e5;
  color: white;
  font-weight: 400;
  display: flex;
  align-items: center;
  border-radius: 3px;
  outline: none;
  border: none;
  cursor: pointer;
  div {
    margin-left: 0.6rem;
    padding-top: 6px;
    opacity: 0.6;
  }

  @media (max-width: 500px) {
    font-size: 1rem;
  }
`
const ErrorContainer = styled.div`
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica,
    Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol';
  font-weight: 300;
  margin-top: 1rem;
  text-align: center;
  font-size: 1.1rem;
  color: red;
`

const Suggestion = styled.div`
  width: 50%;
  margin: 4rem auto;
  font-weight:300;
  & span {
    font-size: 0.9rem;
    font-style: italic;
    display: block;
    margin-bottom:5px;
  }

  @media(max-width:700px){
    width:70%;
  }
  @media(max-width:500px){
    width:90%;
  }
`
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
  const handleChange = (name) => {
    if (Error && name !== '') setError(false)
    setProfile(name)
  }

  return (
    <Section>
      <Header>
        <img src='/images/logo.png' alt='logo' width='70px' height='70px' />
        Github Profile Visualizer
      </Header>
      <Form onSubmit={handleSubmit}>
        <InputBox
          type='text'
          value={profile}
          onChange={(e) => handleChange(e.target.value)}
          autoFocus={true}
          placeholder='profile name'
        ></InputBox>
        <Button type='submit' value='submit'>
          Fetch profile
          <div>
            <svg
              stroke='currentColor'
              fill='none'
              strokeWidth='2'
              viewBox='0 0 24 24'
              strokeLinecap='round'
              strokeLinejoin='round'
              height='1em'
              width='1em'
              xmlns='http://www.w3.org/2000/svg'
            >
              <line x1='22' y1='2' x2='11' y2='13'></line>
              <polygon points='22 2 15 22 11 13 2 9 22 2'></polygon>
            </svg>
          </div>
        </Button>
      </Form>

      {Error && (
        <ErrorContainer>
          Something went wrong, please check the user profile!
        </ErrorContainer>
      )}

      <Suggestion>
        <span>
          Not sure where to look first? Here are some interesting profiles:
        </span>
        metafizzy, facebook, reactjs, mzabriskie, deepmind, pmndrs, the-pudding,
        animate-css, marmelab, vuejs, gcanti,
        ant-design, jaredpalmer
      </Suggestion>
    </Section>
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
