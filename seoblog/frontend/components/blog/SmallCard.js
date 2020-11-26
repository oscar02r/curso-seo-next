import Link from "next/link";
import moment from "moment";
import reactHtmlParser from "react-html-parser";
import { API } from "../../config";

const SmallCard = ({ blog }) => {
  return (
    <>
      <div className="card">
        <article>
          <Link href={`/blogs/${blog.slug}`}>
            <a>
              <img
                src={`${API}/api/blog/photo/${blog.slug}`}
                className="img img-fluid"
                alt={blog.title}
                style={{ maxHeight: "auto", with: "100%" }}
              />
            </a>
          </Link>
        </article>
        <div className="card-body">
          <section>
            <Link href={`/blogs/${blog.slug}`}>
              <a>
                <h5 className="card-title">{blog.title}</h5>
              </a>
            </Link>
            <p className="card-text">{reactHtmlParser(blog.excerpt)}</p>
          </section>
        </div>
        <div className="card-body">
          <div>
            Posted {moment(blog.updatedAt).fromNow()} by {' '}
            <Link href={`/`}>
              <a className="float-right">{`${blog.postedBy.name}`}</a>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default SmallCard;
