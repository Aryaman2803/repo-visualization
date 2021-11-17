import React, { useContext } from 'react'
import Navbar from '../navbar/Navbar'
import userDataContext from '../../hooks/userDataContext'
import { ClipLoader, PropagateLoader, RotateLoader } from 'react-spinners'
import styled from 'styled-components/macro'

const OverrideWrapper = styled.span`
  display: flex;
  align-item: center;
  justify-content: center;
  align-items: center;
  height: 100%;
`

const DisplayWrapper = styled.section`
  background: aqua;
  height: 100vh;
`
const Display = () => {
  const { isLoading, apiData, serverError } = useContext(userDataContext)
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
      <Navbar />
      <DisplayWrapper>
        <OverrideWrapper>
          <RotateLoader size={30} color='#24292f' margin={35} />{' '}
        </OverrideWrapper>
        {/* <PropagateLoader css={override} size={20} /> */}
      </DisplayWrapper>
    </>
  )
}
export default Display
