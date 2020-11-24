import Head from "next/head";
import Link from "next/link";
import { useState } from "react";
import { listBlogsWithCategoriesAndtags } from "../../actions/blog";
import Card from "../../components/blog/Card";

const Blogs = ({ blogs, categories, tags, size }) => {
  const showAllBlog = () => {
    return blogs.map((blog, i) => {
      return (
        <article key={i}>
          <Card blog={blog} />
          <hr />
        </article>
      );
    });
  };
  const showAllCategories = () => {
    return categories.map((c, i) => (
      <Link href={`/categories/${c.slug}`} key={i}>
        <a className="btn btn-primary mr-1 ml-1 mt-3">{c.name}</a>
      </Link>
    ));
  };
  const showAlltags = () => {
    return tags.map((t, i) => (
      <Link href={`/tags/${t.slug}`} key={i}>
        <a className="btn btn-primary mr-1 ml-1 mt-3">{t.name}</a>
      </Link>
    ));
  };
  return (
    <main>
      <div className="container-fluid">
        <header>
          <div className="col-md-12 pt-3">
            <h1 className="display-4 font-weight-bold text-center h1-fluid">
              Programing blogs and tutorial
            </h1>
          </div>
          <section>
            <div className="pb-5 text-center">
              { categories && showAllCategories()}
              <br/>
              {showAlltags()}
            </div>
          </section>
        </header>
      </div>
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-12">{showAllBlog()}</div>
        </div>
      </div>
    </main>
  );
};

Blogs.getInitialProps = () => {
  return listBlogsWithCategoriesAndtags().then((data) => {
    console.log(data.categories);
    if (data.error) {
      console.log(data.error);
    } else {
      return {
        blogs: data.blogs,
        categories: data.categories,
        tags: data.tags,
        size: data.size,
      };
    }
  });
};

export default Blogs;
