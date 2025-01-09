import { useState } from "react"
import SignUpForm from "../Components/SignUpForm"
import LoginForm from "../Components/LoginForm"

function AuthPage(props) {

  const [signup,setSignup] = useState(true) 

  function togglePage() {
    setSignup(!signup);

  }




  return (
    <>
    <h1>Sign Up or  Log In</h1>
    <>
    {signup 
    ?
  <SignUpForm setUser={props.setUser} />
  :
  <LoginForm setUser={props.setUser} />
    }
    </>
    <h2>Or go here to {signup ? 'Log In' : 'Register'} </h2>
    <button onClick={togglePage}>{signup ? 'Log In' : 'Register'}</button>
    </>

  )
}

export default AuthPage