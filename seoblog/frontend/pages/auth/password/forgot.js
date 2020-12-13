import { useState } from "react";
import { forgotPassword } from "../../../actions/auth";

const ForgotPassword = () => {
  const [values, setValues] = useState({
    email: "",
    message: "",
    error: "",
    showForm: true,
  });
  const { email, message, error, showForm } = values;
  const handleChange = (name) => (e) => {
    setValues({ ...values, message: "", error: "", [name]: e.target.value });
  };

  const handleSumit = (e) => {
    e.preventDefault();
    setValues({ ...values, message: "", error: "" });
    forgotPassword({ email }).then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error });
      } else {
        setValues({
          ...values,
          message: data.message,
          email: "",
          error: "",
          showForm: false,
        });
      }
    });
  };

  const showError = () =>
    error ? <div className=" alert alert-danger">{error}</div> : "";

  const showMessage = () =>
    message ? <div className=" alert alert-success">{message}</div> : "";

  const passwordForgotForm = () => (
    <div className="continer">
      <form onSubmit={handleSumit}>
        <div className="form-group pt-5">
          <input
            type="email"
            name="email"
            onChange={handleChange("email")}
            className="form-control"
            value={email}
            placeholder="Type your email address"
            required
          />
        </div>
        <div className="form-group">
          <button type="submit" className="btn btn-primary">
            Send password reset link
          </button>
        </div>
      </form>
    </div>
  );
  return (
    <>
      <div className="container">
        {showError()}
        {showMessage()}
        {showForm && passwordForgotForm()}
      </div>
    </>
  );
};

export default ForgotPassword;
