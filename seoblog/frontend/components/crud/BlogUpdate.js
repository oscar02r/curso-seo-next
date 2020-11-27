import { useState, useEffect } from "react";
import { withRouter } from "next/router";
import { getCookie, isAuth } from "../../actions/auth";
import { getCategories } from "../../actions/category";
import { getTags } from "../../actions/tag";
import { createBlog } from "../../actions/blog";
import "react-quill/dist/quill.snow.css";
import { QuillFormats, QuillMdules } from "../../helpers/quill";

const BlogUpdate = () => {
  return (
    <div className="container-fluid pb-5">
      <div className="row">
        <div className="col-md-8">
          <p>Create blog form</p>
          <div className="pt-5">
            <p>Show success and error</p>
          </div>
        </div>
        <div className="col-md-4">
          <div>
            <div className="form-group pb-2">
              <h5>Featured image</h5>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default BlogUpdate;
