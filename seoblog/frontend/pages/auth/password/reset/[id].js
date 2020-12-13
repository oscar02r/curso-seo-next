import { useState } from "react";
import { withRouter } from "next/router";
import { resetPassword } from "../../../../actions/auth";

const ResetPassword = ({ router }) => {
  const [values, setValues] = useState({
    name: "",
    newPassword: "",
    error: "",
    message: "",
    showForm: true,
  });
  const { name, newPassword, error, message, showForm } = values;

  const handleSubmit = (e) => {
    e.preventDefault();
    resetPassword({
      newPassword,
      resetPasswordLink: router.query.id,
    }).then((data) => {
      if (data.error) {
          
        setValues({
          ...values,
          error: data.error,
          showForm: true,
          newPassword:'',
        });
      } else {
        setValues({
          ...values,
          message: data.message,
          showForm: false,
          newPassword: "",
          error: false,
        });
      }
    });
  };

  const passwordResetForm = () => (
    <div className="continer">
      <form onSubmit={handleSubmit}>
        <div className="form-group pt-5">
          <input
            type="password"
            onChange={(e) =>
              setValues({ ...values, newPassword: e.target.value })
            }
            className="form-control"
            value={newPassword}
            placeholder="Type your new password"
            required
          />
        </div>
        <div className="form-group">
          <button type="submit" className="btn btn-primary">
            Change password
          </button>
        </div>
      </form>
    </div>
  );
  const showError = () => error ? <div className=" alert alert-danger">{error}</div> : "";
  const showMessage = () =>message ? <div className=" alert alert-success">{message}</div> : "";
  return <>
      <div className="container">
          <h2>Reset password</h2>
          <hr/>
          {showError()}
          {showMessage()}
          {showForm && passwordResetForm()}
      </div>
  </>;
};

export default withRouter(ResetPassword);
