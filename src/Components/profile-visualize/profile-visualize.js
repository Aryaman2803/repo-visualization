import React, { useContext } from 'react'
import Navbar from '../navbar/Navbar'
import userDataContext from '../../hooks/userDataContext'
import UserDetails from './user-details/user-details'
import LogoCommits from './logos-commits/logos-commits'
import Repositories from './repos-per-language'
import DisplayRepositories from './display-repositories/display-repositories'

const ProfileVisualize = () => {
  const { isLoading, apiData, serverError, overAllLanguages } =
    useContext(userDataContext)
  const {
    avatar_url,
    bio = null,
    blog,
    html_url,
    login,
    name,
    location,
    created_at,
    public_repos,
    followers,
    following,
  } = apiData
  return (
    <>
      <Navbar login={login} avatar_url={avatar_url} />
      {!isLoading && !serverError && (
        <UserDetails
          avatar_url={avatar_url}
          bio={bio}
          blog={blog}
          name={name}
          login={login}
          html_url={html_url}
          location={location}
          created_at={created_at}
          public_repos={public_repos}
          followers={followers}
          following={following}
        />
      )}
      <LogoCommits overAllLanguages={overAllLanguages} />
      <Repositories />
      <DisplayRepositories />
    </>
  )
}
export default ProfileVisualize
