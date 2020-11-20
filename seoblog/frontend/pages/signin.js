import SigninComponent from "../components/auth/SigninComponent";

const Signin = () => {
  return (
    <>
      <h2 className="text-center pb-4 pt-4">Signin</h2>
      <div className="row">
        <div className="col-md-6 offset-md-3">
          <SigninComponent />
        </div>
      </div>
    </>
  );
};

export default Signin;
