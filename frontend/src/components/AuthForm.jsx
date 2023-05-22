import { useState } from "react";
import { useSignup } from "../hooks/useSignup";
import { useLogin } from "../hooks/useLogin";

const AuthForm = ({ type }) => {
  const authAction = type === "login" ? useLogin : useSignup;

  const { login, signup, error, isLoading } = authAction();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  //   handle Change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  //   handle Submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (type === "login") {
      await login(formData.email, formData.password);
    } else {
      await signup(formData.email, formData.password);
    }
  };
  return (
    <form onSubmit={handleSubmit} className={type}>
      <h3>{type}</h3>

      <label>Email:</label>
      <input
        type="email"
        name="email"
        onChange={handleChange}
        value={formData.email}
      />

      <label>Password:</label>
      <input
        type="password"
        name="password"
        onChange={handleChange}
        value={formData.password}
      />

      <button type="submit" disabled={isLoading}>
        {type}
      </button>

      {error && <div className="error">{error}</div>}
    </form>
  );
};

export default AuthForm;
