import { useRouter } from "next/router";
import Link from 'next/link'
import { useState, useEffect } from "react";
import { signin, authenticate, isAuth } from "../../actions/auth";

const SigninComponet = () => {
  const router = useRouter();

  const [values, setValues] = useState({
    email: "juliad@gmail.com",
    password: "12345678",
    error: "",
    loading: false,
    message: "",
    showForm: true,
  });

  useEffect(() => {
    isAuth() && router.push('/')
  }, []);

  const { email, password, error, loading, message, showForm } = values;

  const handleSubmit = (e) => {
    e.preventDefault();
    setValues({ ...values, loading: true, error: false });
    const user = { email, password };

    signin(user).then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error, loading: false });
      } else {
        //Save user token to cookie
        //Save user info to localstorage
        //Authenticate user
        authenticate(data, () => {
           setValues({...values, loading:false})
 
          if (isAuth() && isAuth().role === 1) {
            router.replace('/admin');
          } else if (isAuth() && isAuth().role === 0) {
            router.replace('/user');
          }
        });
      }
    });
  };

  const handleChange = (name) => (e) => {
    setValues({ ...values, error: false, [name]: e.target.value });
  };

  const showLoading = () =>
    loading ? (
      <div className="alert alert-info text-center"> Loading...</div>
    ) : (
      ""
    );
  const showError = () =>
    error ? <div className="alert alert-danger text-center"> {error}</div> : "";
  const showMessage = () =>
    message ? (
      <div className="alert alert-info text-center"> {message}</div>
    ) : (
      ""
    );

  const signinForm = () => {
    return (
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <input
            value={email}
            onChange={handleChange("email")}
            type="email"
            className="form-control"
            placeholder="Type your email"
          />
        </div>
        <div className="form-group">
          <input
            value={password}
            onChange={handleChange("password")}
            type="password"
            className="form-control"
            placeholder="Type your password"
          />
        </div>
        <div>
          <button className="btn btn-primary">Signin</button>
        </div>
      </form>
    );
  };
  return (
    <>
      {showError()}
      {showLoading()}
      {showMessage()}
      {showForm && signinForm()}
      <br/>
      <Link href="/auth/password/forgot" >
        <a className="btn btn-outline-danger btn-sm" >Reset password</a>
      </Link>
    </>
  );
};

export default SigninComponet;
