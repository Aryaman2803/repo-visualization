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
  cursor: pointer;

  @media (max-width: 500px) {
    margin-right: 1rem;
    font-size:0.8rem;
  }
`
const UserContainer=styled.div`
display:flex;
margin-right:2rem;
justify-content:space-around;
align-items: center;

& img{
  border-radius:50px;
  margin-right:1rem;
}

@media(max-width:500px){
  align-items:center;
  margin-right:0;
}

`
const Navbar = ({ login,avatar_url }) => {
  return (
    <StyledNavbar>
      <img src='/images/logo.png' width='50px' height='50px'  alt="logo" aria-label="logo"/>
      <UserContainer>
      <img src={avatar_url} width='30px' height='30px' alt="logo" aria-label="user"/>
      <LoginNmae>{login}</LoginNmae>
      </UserContainer>
    </StyledNavbar>
  )
}

export default Navbar
