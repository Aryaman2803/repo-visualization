import React, { useContext } from 'react'
import Navbar from '../navbar/Navbar'
import userDataContext from '../../hooks/userDataContext'
import styled from 'styled-components/macro'
import UserDetails from './user-details/user-details'

const ProfileVisualize = () => {
  const { isLoading, apiData, serverError } = useContext(userDataContext)
  console.log(apiData)
  const {
    avatar_url,
    bio = null,
    blog,
    html_url,
    login,
    name,
    location,
    created_at,
    // company,
    // email,
    // followers,
    // followers_url,
    // following,
    // following_url,
    // location,
    // public_repos,
    // repos_url,
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
    </>
  )
}
export default ProfileVisualize
