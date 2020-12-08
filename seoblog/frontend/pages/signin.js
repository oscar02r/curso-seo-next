import { withRouter } from "next/router";
import SigninComponent from "../components/auth/SigninComponent";

const Signin = ({ router }) => {
  const showRedirectMessage = () => {
    if (router.query.message) {
      return <div className="alert alert-danger">{router.query.message}</div>;
    } else {
      return;
    }
  };
  return (
    <>
      <h2 className="text-center pb-4 pt-4">Signin</h2>
      <div className="row">
        <div className="col-md-6 offset-md-3 text-center">
           {showRedirectMessage()}
        </div>
      </div>
      <div className="row">
        <div className="col-md-6 offset-md-3">
          <SigninComponent />
        </div>
      </div>
    </>
  );
};

export default withRouter(Signin);
