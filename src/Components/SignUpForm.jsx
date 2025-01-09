import { useState } from "react";

import { signup } from "../utilities/users-services";

function SignUpForm(props) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // this is where we will add to our database
    //but through utilities/user-services
    try{
        // set this up to be able to add a new user'
        const submitData = {... formData} 
        delete formData.confirm;
        console.log(submitData);
        const user = await signup(submitData);
        props.setUser(user);

    }catch(err){
      setError('sign up failed')
    }
  };

  return (
    <>
      <h2>SignUp to start using your own calendar</h2>
      <div>
        <form autoComplete="off" onSubmit={handleSubmit}>
          <label>Display Name: </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Display Name"
            required
          />
            <br />
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
            <label>Confirm Password </label>
            <input
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            placeholder="confirm password"
            required
            />
            <br />
            <button type="submit" disabled={formData.password !== formData.confirmPassword}>Sign Up</button>
        </form>
        <p>{error}</p>
      </div>
    </>
  );
}

export default SignUpForm;
