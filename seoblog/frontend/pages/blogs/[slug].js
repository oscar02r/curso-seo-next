import Head from "next/head";
import Link from "next/link";
import { useState } from "react";
import { singleBlog } from "../../actions/blog";
import moment from "moment";
import reactHtmlParser from "react-html-parser";
import { APP_NAME, DOMAIN, API, FB_APP_ID } from "../../config";

const SingleBlog = ({ blog }) => {
  const showBlogCategories = (blog) => {
    return blog.categories.map((c, i) => (
      <Link key={i} href={`/categories/${c.slug}`}>
        <a className="btn btn-primary mr-1 ml-1 mt-3">{c.name}</a>
      </Link>
    ));
  };
  const showBlogTag = (blog) => {
    return blog.tags.map((t, i) => (
      <Link key={i} href={`/tags/${t.slug}`}>
        <a className="btn btn-outline-primary mr-1 ml-1 mt-3">{t.name}</a>
      </Link>
    ));
  };
  return (
    <main>
      <article>
        <div className="container-fluid">
          <section>
            <div className="row" style={{ marginTop: "-30px" }}>
              <img
                src={`${API}/api/blog/photo/${blog.slug}`}
                alt={blog.title}
                className="img img-fluid featured-image"
              />
            </div>
          </section>
          <section>
            <p className="lead mt-3 mark">
              Written by {blog.postedBy.name} | Published{" "}
              {moment(blog.updatedAt).fromNow()}
            </p>
            <div className="pb-3">
              {showBlogCategories(blog)}
              {showBlogTag(blog)}
              <br />
              <br />
            </div>
          </section>
        </div>
        <div className="container">
          <section>
            <div className="col-md-12 lead">{reactHtmlParser(blog.body)}</div>
          </section>
        </div>
        <div className="container pb-5 pt-5 h2 text-center">
          <h4>Related blogs</h4>
          <hr />
          <p>Show related blogs</p>
        </div>
        <div className="container pb-5 pt-5 h2 text-center">
          <p>Show comments</p>
        </div>
      </article>
    </main>
  );
};

SingleBlog.getInitialProps = ({ query }) => {
  return singleBlog(query.slug).then((data) => {
    console.log("Initial props", data);
    if (data.error) {
      console.log(data.error);
    } else {
      return { blog: data };
    }
  });
};

export default SingleBlog;
