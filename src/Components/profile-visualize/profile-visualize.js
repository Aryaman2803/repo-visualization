import React, { useContext } from 'react'
import Navbar from '../navbar/Navbar'
import userDataContext from '../../hooks/userDataContext'
import UserDetails from './user-details/user-details'
import LogoCommits from './logos-commits/logos-commits'

const ProfileVisualize = () => {
  const { isLoading, apiData, serverError } = useContext(userDataContext)
  // console.log(apiData)
  const {
    avatar_url,
    bio = null,
    blog,
    html_url,
    login,
    name,
    location,
    created_at,
    repos_url,
    // company,
    // email,
    // followers,
    // followers_url,
    // following,
    // following_url,
    // location,
    // public_repos,
  } = apiData
  return (
    <>
      <Navbar login={login} />
      <UserDetails
        avatar_url={avatar_url}
        bio={bio}
        blog={blog}
        name={name}
        login={login}
        html_url={html_url}
        location={location}
        created_at={created_at}
      />
      <LogoCommits />
    </>
  )
}
export default ProfileVisualize
