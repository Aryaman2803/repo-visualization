import react from 'react'
import styled from 'styled-components/macro'

const StyledNavbar = styled.nav`
  background: #24292f;
  color: #ffffff;
  padding: 0.8rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
`
const LoginNmae = styled.span`
  margin-right: 3rem;
  cursor: pointer;
  font-size: 18px;

  @media (max-width: 500px) {
    margin-right: 1rem;
  }
`
const Navbar = ({ login }) => {
  return (
    <StyledNavbar>
      <img src='/images/logo.png' width='50px' height='50px'  alt="logo" aria-label="logo"/>
      <LoginNmae>{login}</LoginNmae>
    </StyledNavbar>
  )
}

export default Navbar
