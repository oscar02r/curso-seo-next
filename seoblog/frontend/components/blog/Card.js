import Link from "next/link";
import moment from "moment";
import reactHtmlParser from "react-html-parser";
import { API } from "../../config";

const Card = ({ blog }) => {
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
    <>
      <div className="lead pb-3">
        <header>
          <Link href={`/blogs/${blog.slug}`}>
            <a>
              <h2 className=" pt-3 pb-3 font-weight-bold">{blog.title}</h2>
            </a>
          </Link>
        </header>
        <section>
          <p className="mark ml-1 pt-2 pb-2">
            Written by <Link href={`/profile/${blog.postedBy.username}`}><a>{blog.postedBy.username}</a></Link>  | Published{" "}
            {moment(blog.updatedAt).fromNow()}
          </p>
        </section>
        <section>
          {showBlogCategories(blog)}
          {showBlogTag(blog)}
          <br />
          <br />
        </section>
        <div className="row">
          <div className="col-md-4">
            <img
              src={`${API}/api/blog/photo/${blog.slug}`}
              className="img img-fluid"
              alt={blog.title}
              style={{maxHeight:'auto', with:'100%'}}
            />
          </div>
          <div className="col-md-8">
            <section>
              <div className="pb-3">{reactHtmlParser(blog.excerpt)}</div>

              <Link href={`/blogs/${blog.slug}`}>
                <a className="btn btn-primary pt-2">Read more</a>
              </Link>
            </section>
          </div>
        </div>
      </div>
    </>
  );
};

export default Card;
