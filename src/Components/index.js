import React, { useContext } from 'react'
import userDataContext from '../hooks/userDataContext'
import { RotateLoader } from 'react-spinners'
import styled from 'styled-components/macro'
import ProfileVisualize from './profile-visualize/profile-visualize'
import { ReactQueryDevtools } from 'react-query/devtools'

const OverrideWrapper = styled.span`
  display: flex;
  align-item: center;
  justify-content: center;
  align-items: center;
  height: 100%;
`

const ContainerWrapper = styled.section`
  height: 100vh;
`

//! This file will have the homepage for creating 2 parts
//! And loading screen until data is fetched
const Container = () => {
  const { isLoading, apiData, serverError } = useContext(userDataContext)

  // if (isLoading && !serverError) {
  //   return (
  //     <OverrideWrapper>
  //       {' '}
  //       <RotateLoader size={30} color='#24292f' margin={35} />
  //     </OverrideWrapper>
  //   )
  // }
  // if (!isLoading && serverError) return <h1>Errorrr</h1>

  // return (
  //   <>
  //     <ContainerWrapper>
  //       <ReactQueryDevtools initialIsOpen={false} />

  //       {apiData && <ProfileVisualize />}
  //     </ContainerWrapper>
  //   </>
  // )

  return (
    <>
      <ContainerWrapper>
        {isLoading ? (
          <OverrideWrapper>
            <RotateLoader size={30} color='#24292f' margin={35} />
          </OverrideWrapper>
        ) : serverError ? (
          <h1>Error</h1>
        ) : (
          <ProfileVisualize />
        )}
      </ContainerWrapper>
    </>
  )
}

// {isLoading && (
//   <OverrideWrapper>
//     <RotateLoader size={30} color='#24292f' margin={35} />
//   </OverrideWrapper>
// )}
// {serverError && <h1>Errorrr sheesh</h1>}
// {apiData && <ProfileVisualize />}
export default Container
