import { useState } from "react"
import userServices from "../utilities/users-services";  
import usersServices from "../utilities/users-services";

function LoginForm({ setUser }) {

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");

  function handleChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError("");
  }

  async function handleSubmit(e) {
    e.preventDefault();
    // console.log(formData);
    const credentials = { ...formData };
    console.log(credentials);
    try{
      // the promise returned by the login service method will resolve to the user object included in the payload of the JWT
      const user = await usersServices.login(credentials)
      console.log(user);
      setUser(user)

    }
    catch(err){
      setError('login failed')
    }
  }

  return (
    <>
    <h2>Login to start using your own calendar</h2>
      <div>
        <form autoComplete="off" onSubmit={handleSubmit}>
            <label>Email Address (needs to be unique) </label>
            <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="email address will be your login"
            required
          />
            <br />
            <label>Password </label>
            <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="password"
            required
            />
            <br />
            <button type="submit"  >Log In</button>
        </form>
        <p>{error}</p>

      </div>
    </>
       
  )
}

export default LoginForm