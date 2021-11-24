import react from 'react'
import styled from 'styled-components/macro'
import PropTypes from 'prop-types'
import format from 'date-fns/format'

const Wrapper = styled.section`
  display: flex;
  align-items: center;
  flex-direction: column;
  background: #f8f9ff;
`
const UserImage = styled.img`
  width: 150px;
  height: 150px;
  border-radius: 50%;
  margin-top: 3rem;
  border: double 6px transparent;
  background-image: linear-gradient(#6dc7ff, #e6abff),
    linear-gradient(to bottom, #40acff 0%, #d678ff 80%);
  background-origin: border-box;

  background-clip: content-box, border-box;
  @media (max-width: 500px) {
    width: 100px;
    height: 100px;
  }
`
const UserName = styled.div`
  margin-top: 1rem;
  font-size: 2.5rem;
  font-weight: 700;
  color: #24292f;

  @media (max-width: 500px) {
    font-size: 2rem;
  }
`
const UserId = styled.a`
  margin-top: 1rem;
  font-size: 1.5rem;
  font-weight: 500;
  min-height: 35px;
  //   border: 1px solid red;
  background: linear-gradient(to right, #40acff 0%, #d678ff 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  cursor: pointer;
  &:hover {
    border-bottom: 2px solid #40acff;
  }
  @media (max-width: 500px) {
    font-size: 1.2rem;
  }
`
const Location = styled.div`
  max-width: 500px;
  margin-top: 8px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 1rem;
  font-weight: 500;
  color: #24292f;

  & a {
    display: flex;
    align-items: center;
    margin-right: 1rem;
  }
  & a:nth-child(1) {
    padding-right: 1rem;
    & img {
      margin-right: 10px;
    }
  }
  & a:nth-child(2) {
    & img {
      margin-right: 10px;
    }
  }

  @media (max-width: 500px) {
    display: block;
    & a:nth-child(1) {
      margin-bottom: 5px;
    }
  }
`
const StyledBio = styled.div`
  //   border: 1px solid hotpink;
  max-width: 500px;
  font-size: 16px;
  color: #24292f;
  font-weight: 300;
  margin-top: 0.8rem;
`

const StyledInfoContainer = styled.div`
  display: flex;
  margin-top: 0.3rem;
`

const StyledInfo = styled.div`
  box-shadow: rgba(0, 0, 0, 0.1) 0px 0px 5px 0px,
    rgba(0, 0, 0, 0.1) 0px 0px 1px 0px;
  // box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;

  margin: 1rem;
  display: flex;
  flex-direction: column;
  border-radius: 2px;

  & span {
    text-align: center;
    width: 130px;
    padding: 7px 0;
    font-weight: 600;
    letter-spacing: 1px;
  }
  & span:nth-child(1) {
    font-size: 1.5em;
    background: linear-gradient(to right, #40acff 0%, #d678ff 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
  & span:nth-child(2) {
    font-size: 0.9em;
    color: #24292f;
    font-weight: 600;
  }
  @media (max-width: 500px) {
    margin: 1rem 0.7rem;
    & span {
      width: 100px;
    }
    & span:nth-child(2){
      font-size:12px;
      letter-spacing: 1px;
    }
  }
`
const UserDetails = ({
  avatar_url,
  bio,
  blog,
  name,
  login,
  html_url,
  location,
  created_at,
  public_repos,
  followers,
  following,
}) => {
  const date = new Date(created_at)
  const date_month = format(date, 'MMMM dd, yyyy')
  return (
    <Wrapper>
      <UserImage
        src={avatar_url}
        alt={`${name} profile picture`}
        aria-label={`${name} profile picture`}
      />
      <UserName> {name} </UserName>
      <UserId href={html_url} target='_blank' rel='noopener noreferrer'>
        @{login}
      </UserId>

      <Location>
        <a>
          <img
            src='/images/location.png'
            width='25px'
            height='25px'
            aria-label={`location is ${location}`}
            alt={location}
          />
          {location}
        </a>
        <a>
          <img
            src='/images/calendar.png'
            width='25px'
            height='25px'
            alt='calander icon'
            aria-label='calander icon'
          />
          {`Joined ${date_month}`}
        </a>
      </Location>
      <StyledInfoContainer>
        <StyledInfo>
          <span>{public_repos}</span>
          <span>REPOSITORIES</span>
        </StyledInfo>
        <StyledInfo>
          <span>{followers}</span>
          <span>FOLLOWERS</span>
        </StyledInfo>
        <StyledInfo>
          <span>{following}</span>
          <span>FOLLOWING</span>
        </StyledInfo>
      </StyledInfoContainer>

      {bio && <StyledBio>{bio}</StyledBio>}
    </Wrapper>
  )
}

UserDetails.prototype = {
  avatar_url: PropTypes.string.isRequired,
  bio: PropTypes.string.isRequired,
  blog: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  login: PropTypes.string.isRequired,
  html_url: PropTypes.string.isRequired,
  created_at: PropTypes.string.isRequired,
}
export default UserDetails
