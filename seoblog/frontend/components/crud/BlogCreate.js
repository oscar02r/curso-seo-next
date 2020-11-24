import Link from "next/link";
import { useState, useEffect } from "react";
import Router, { withRouter } from "next/router";
import dynamic from "next/dynamic";
import { getCookie, isAuth } from "../../actions/auth";
import { getCategories } from "../../actions/category";
import { getTags } from "../../actions/tag";
import { createBlog } from "../../actions/blog";
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });
import 'react-quill/dist/quill.snow.css'
import {QuillFormats, QuillMdules} from '../../helpers/quill'

const BlogCreate = ({ router }) => {
  const blogFormLS = () => {
    if (typeof window === "undefined") {
      return false;
    }
         
    if (localStorage.getItem("blog")) {
      return JSON.parse(localStorage.getItem("blog"));
    } else { 
      return false;
    }
  };
  const [cateries, setCategories] = useState([]);
  const [tags, setTags] = useState([]);
  const [checkedCategory, setCheckedCategory] = useState([]);
  const [checkedTag, setCheckedTag] = useState([]);

  const [body, setBody] = useState(blogFormLS());
  const [values, setValues] = useState({
    error: "",
    sizeError: "",
    success: "",
    formData: "",
    title: "",
    hidePublishButton: false,
  });

  const {
    error,
    sizeError,
    success,
    formData,
    title,
    hidePublishButton,
  } = values;
  const token = getCookie("token");
  useEffect(() => {
    setValues({ ...values, formData: new FormData() });
    initCategories();
    initTags();
    console.log("uese effect");
  }, [router]);

  const initCategories = () => {
    getCategories().then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error });
      } else {
        setCategories(data);
      }
    });
  };
  const initTags = () => {
    getTags().then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error });
      } else {
        setTags(data);
      }
    });
  };
  const publichBlog = (e) => {
    e.preventDefault();
    createBlog(formData, token).then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error });
      } else {
        setValues({
          ...values,
          title: "",
          error: "",
          success: `A new blog titled "${data.title}" is created`,
        });
        setBody("");
        setCategories([]);
        setTags([]);
      }
    });
  };
  const handleChange = (name) => (e) => {
    const value = name === "photo" ? e.target.files[0] : e.target.value;
    formData.append(name, value);
    setValues({ ...values, [name]: value, formData, error: "" });
  };

  const handleBody = (e) => {
    // console.log(e.dataTransfer.files[0])
    setBody(e);
    formData.append("body", e);
    if (typeof window === "undefined") {
      localStorage.setItem("blog", JSON.stringify(e));
    } 
  };
  const handleToggle = (catId) => () => {
    setValues({ ...values, error: "" });

    //return the first index or -1
    const clickedCategory = checkedCategory.indexOf(catId);
    const all = [...checkedCategory];

    if (clickedCategory === -1) {
      all.push(catId);
    } else {
      all.splice(clickedCategory, 1);
    }
    console.log(all);
    setCheckedCategory(all);
    formData.append("categories", all);
  };
  const handleTagToggle = (tagId) => () => {
    setValues({ ...values, error: "" });
    //return the first index or -1
    const clickedTag = checkedTag.indexOf(tagId);
    const all = [...checkedTag];
    if (clickedTag === -1) {
      all.push(tagId);
    } else {
      all.splice(clickedTag, 1);
    }
    console.log(all);
    setCheckedTag(all);
    formData.append("tags", all);
  };
  const showCategories = () => {
    return (
      cateries &&
      cateries.map((c, i) => (
        <li key={i} className="un-style">
          <input
            onChange={handleToggle(c._id)}
            type="checkbox"
            className="mr-2"
          />
          <label className="form-check-label">{c.name}</label>
        </li>
      ))
    );
  };
  const showTags = () => {
    return (
      tags &&
      tags.map((t, i) => (
        <li key={i} className="un-style">
          <input
            onChange={handleTagToggle(t._id)}
            type="checkbox"
            className="mr-2"
          />
          <label className="form-check-label">{t.name}</label>
        </li>
      ))
    );
  };

  const showError = () => (
    <div
      className="alert alert-danger text-center"
      style={{ display: error ? "" : "none" }}
    >
      {error}
    </div>
  );

  const showSuccess = () => (
    <div
      className="alert alert-success"
      style={{ display: success ? "" : "none" }}
    >
      {success}{" "}
    </div>
  );
  const createBlogForm = () => (
    <form onSubmit={publichBlog}>
      <div className="form-group">
        <labe className="text-muted">Title</labe>
        <input
          type="text"
          className="form-control"
          value={title}
          onChange={handleChange("title")}
        />
      </div>
      <div className="form-group">
        <ReactQuill
          modules={QuillMdules}
          formats={QuillFormats}
          value={body}
          placeholder="Write Something amazing..."
          onChange={handleBody}
        />
      </div>
      <div>
        <button type="submit" className="btn btn-primary">
          Publish
        </button>
      </div>
    </form>
  );

  return (
    <div className="container-fluid pb-5">
      <div className="row">
        <div className="col-md-8">
          {createBlogForm()}

          <div className="pt-5">
            {showError()}
            {showSuccess()}
          </div>
        </div>
        <div className="col-md-4">
          <div>
            <div className="form-group pb-2">
              <h5>Featured image</h5>
              <hr />
              <div>
                {" "}
                <small className="text-muted">Max size: 1mb</small>
              </div>
              <label className="btn btn-outline-info">
                Upload featurd image
                <input
                  onChange={handleChange("photo")}
                  type="file"
                  accept="image/*"
                  hidden
                />
              </label>
            </div>
          </div>
          <div>
            <h5>Categories</h5>
            <hr />
            <ul style={{ maxHeight: "100px", overflowY: "scroll" }}>
              {" "}
              {showCategories()}
            </ul>
          </div>
          <div>
            <h5>Tags</h5>
            <hr />
            <ul style={{ maxHeight: "100px", overflowY: "scroll" }}>
              {showTags()}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};


export default withRouter(BlogCreate);
