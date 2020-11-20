
import SignupComponent from "../components/auth/SignupComponent";
const Signup = () => {
  return (
    <>
      <h2 className="text-center pb-4 pt-4">Signup</h2>
      <div className="row">
        <div className="col-md-6 offset-md-3">
           <SignupComponent />
        </div>
      </div>
    </>
  );
};

export default Signup;
