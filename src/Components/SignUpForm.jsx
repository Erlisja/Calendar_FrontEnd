import { useState } from "react";

function SignUpForm() {
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

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    // this is where we will add to our database
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
        </form>
      </div>
    </>
  );
}

export default SignUpForm;
