import { useState, useEffect } from "react";
import { withRouter, Router, useRouter } from "next/router";
import dynamic from "next/dynamic";
import { getCookie, isAuth } from "../../actions/auth";
import { getCategories } from "../../actions/category";
import { getTags } from "../../actions/tag";
import { singleBlog, updateBlog } from "../../actions/blog";
import { API } from '../../config'
import "react-quill/dist/quill.snow.css";
import { QuillFormats, QuillMdules } from "../../helpers/quill";
import { DOMAIN } from "../../config";
import 'draft-js'
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });


const BlogUpdate = ({ router }) => {
  const routerNext = useRouter();
  const [body, setBody] = useState("");
  const [cateries, setCategories] = useState([]);
  const [tags, setTags] = useState([]);
  const [checkedCategory, setCheckedCategory] = useState([]);
  const [checkedTag, setCheckedTag] = useState([]);
  const [values, setValues] = useState({
    error: "",
    success: "",
    formData:"",
    title: "",
  });
  const { error, success, formData, title } = values;
  const token = getCookie("token");
  useEffect(() => {
    setValues({ ...values, formData: new FormData() });
    initBlog();
    initCategories();
    initTags();
  }, [router]);

  const initBlog = () => {
    if (router.query.slug) {
      singleBlog(router.query.slug).then((data) => {
        if (data.error) {
          console.log(data.error);
        } else {
          setValues({ ...values, title: data.title });
          setBody(data.body);
          setCategoriesArray(data.categories);
          setTagsArray(data.tags);
        }
      });
    }
  };
  const setCategoriesArray = (blogCategories) => {
    let ca = [];
    blogCategories.map((c) => {
      ca.push(c._id);
    });
    setCheckedCategory(ca);
  };
  const setTagsArray = (blogTags) => {
    let ta = [];
    blogTags.map((t) => {
      ta.push(t._id);
    });
    setCheckedTag(ta);
  };
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
    setCheckedTag(all);
    formData.append("tags", all);
  };
  const findOutCategory = (cid) => {
    const result = checkedCategory.indexOf(cid);
    if (result !== -1) {
      return true;
    } else {
      return false;
    }
  };
  const findOutTag = (tid) => {
    const result = checkedTag.indexOf(tid);
    if (result !== -1) {
      return true;
    } else {
      return false;
    }
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
            checked={findOutCategory(c._id)}
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
            checked={findOutTag(t._id)}
          />
          <label className="form-check-label">{t.name}</label>
        </li>
      ))
    );
  };
  const handleBody = (e) => {
    setBody(e);
    
     formData.append("body", e);
   
    
  };
  const handleChange = (name) => (e) => {
    const value = name === "photo" ? e.target.files[0] : e.target.value;
    formData.append(name, value);
    setValues({ ...values, [name]: value, formData, error: "" });
  };
  const editBlog = (e) => {
    e.preventDefault();
    updateBlog(formData, token, router.query.slug).then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error });
      } else {
        setValues({
          ...values,
          title: "",
          success: `Blog titled ${data.title} is succefully updated.`,
        });
        if (isAuth() && isAuth().role === 1) {
          //  routerNext.replace(`${DOMAIN}/admin/crud/${router.query.slug}`)
          routerNext.replace(`/admin`);
        } else if (isAuth() && isAuth().role === 1) {
          // routerNext.replace(`${DOMAIN}/user/crud/${router.query.slug}`)
          routerNext.replace(`/user`);
        }
      }
    });
  };
  const showError = () => (
    <div
      className="alert alert-danger"
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
      {success}
    </div>
  );
  const updateBlogForm = () => (
    <form onSubmit={editBlog}>
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
       { <ReactQuill
          modules={QuillMdules}
          formats={QuillFormats}
          value={body}
          placeholder="Write Something amazing..."
          onChange={ handleBody}
        />}
      
      </div>
      <div>
        <button type="submit" className="btn btn-primary">
          Update
        </button>
      </div>
    </form>
  );
  return (
    <div className="container-fluid pb-5">
      <div className="row">
        <div className="col-md-8">
          {updateBlogForm()}
          <div className="pt-5">
            {showSuccess()}
            {showError()}
          </div>
        
          <img src={`${API}/api/blog/photo/${router.query.slug}`} style={{width:"100%"}}
           alt={title}/> 
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
            <ul style={{ maxHeight: "200px", overflowY: "scroll" }}>
              {" "}
              {showCategories()}
            </ul>
          </div>
          <div>
            <h5>Tags</h5>
            <hr />
            <ul style={{ maxHeight: "200px", overflowY: "scroll" }}>
              {showTags()}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
export default withRouter(BlogUpdate);
