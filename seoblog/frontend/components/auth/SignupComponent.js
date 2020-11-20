import { useState} from "react";

const SignupComponet = () => {
  const [values, setValues] = useState({
    name:'',
    email:'',
    password:'',
    error:'',
    loading:false,
    message:'',
    showForm:true
  })
  const {name, email, password, error, loading, message, showForm} = values
   
  const handleSubmit = (e) => {
    e.preventDefaul()
    
  }
  const handleChange = name => (e) => {
    setValues({...values, error:false, [name]:e.target.value});
  }
  const signupForm = () => {
    return (
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <input
          value={name}
            onChange={handleChange('name')}
            type="text"
            className="form-control"
            placeholder="Type your name"
          />
        </div>
        <div className="form-group">
          <input
            value={email}
            onChange={handleChange('email')}
            type="email"
            className="form-control"
            placeholder="Type your email"
          />
        </div>
        <div className="form-group">
          <input
           value={password}
            onChange={handleChange('password')}
            type="password"
            className="form-control"
            placeholder="Type your password"
          />
        </div>
        <div> 
           <button className="btn btn-primary">Signup</button>
        </div>
      </form>
    );
  };
  return <>{signupForm()}</>;
};

export default SignupComponet;
