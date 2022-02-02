import { useNavigate } from 'react-router-dom';
const Error = ()=>{

    const navigate = useNavigate()
return (
    <>
    <h1>Go back to main page!</h1>
    <button onClick={()=>{navigate('/')}}>Go</button>
    </>
)
}

export default Error;
