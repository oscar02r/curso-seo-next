import Link from "next/link";
import { useState, useEffect } from "react";
import Router from "next/router";
import { getCookie, isAuth } from "../../actions/auth";
import { getProfile, update } from "../../actions/user";

const ProfileUpdate = () => {
  const [values, setValues] = useState({
    username: "",
    name: "",
    email: "",
    password: "",
    error: "",
    success: false,
    loading: false,
    photo: "",
    userData: "",
    about: "",
  });

  const token = getCookie("token");
  const {
    username,
    name,
    email,
    password,
    error,
    success,
    loading,
    photo,
    userData,
    about,
  } = values;

  const init = () => {
    getProfile(token).then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error });
      } else {
        setValues({
          ...values,
          username: data.username,
          name: data.name,
          email: data.email,
          about: data.about,
        });
      }
    });
  };
  useEffect(() => {
    init();
  }, []);

  const handleChange = (name) => (e) => {
    const value = name === "photo" ? e.target.files[0] : e.target.value;
    let userFormData = new FormData()
    userFormData.append(name, value);
    setValues({ ...values, [name]: value, userData:userFormData, error: false, success:false });
  };
  
  const handleSubmit = (e) => {
      e.preventDefault()
      setValues({...values, loading:true})
      update(token, userData).then(data=>{
          if (data.error) {
              setValues({...values, error:data.error, success:false, loading:false})
          }else {
            setValues({ 
            username: data.username,
            name: data.name,
            email: data.email,
            success: true,
            loading: false,
            photo: "",
            userData: "",
            about: data.about
        })
          }

      })
  };
  const profileUpdateform = () => (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label className="btn btn-outline-info">
          Profile photo
          <input
            onChange={handleChange("photo")}
            type="file"
            accept="image/*"
            hidden
          />
        </label>
      </div>
      <div className="form-group">
        <label className="text-moted">Username</label>
        <input
          onChange={handleChange("username")}
          type="text"
          value={username}
          className="form-control"
        />
      </div>
      <div className="form-group">
        <label className="text-moted">Name</label>
        <input
          onChange={handleChange("name")}
          type="text"
          value={name}
          className="form-control"
        />
      </div>
      <div className="form-group">
        <label className="text-moted">Email</label>
        <input
          onChange={handleChange("email")}
          type="email"
          value={email}
          className="form-control"
        />
      </div>
      <div className="form-group">
        <label className="text-moted">About</label>
        <textarea
          onChange={handleChange("about")}
          type="text"
          value={about}
          className="form-control"
        />
      </div>
      <div className="form-group">
        <label className="text-moted">Password</label>
        <input
          onChange={handleChange("password")}
          type="password"
          value={password}
          className="form-control"
        />
      </div>
      <div>
        <button className="btn btn-primary" type="submit">
          Submit
        </button>
      </div>
    </form>
  );
  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-md-4">image</div>
          <div className="col-md-8">{profileUpdateform()}</div>
        </div>
      </div>
    </>
  );
};

export default ProfileUpdate;
