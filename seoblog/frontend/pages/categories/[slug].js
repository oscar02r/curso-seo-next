import Head from "next/head";
import Link from "next/link";
import { singleCategory } from "../../actions/category";
import moment from "moment";
import reactHtmlParser from "react-html-parser";
import { APP_NAME, DOMAIN, API, FB_APP_ID } from "../../config";
import Card from "../../components/blog/Card";

const Category = ({ category, blogs, query }) => {
  const head = () => {
    return (
      <Head>
        <title>
          {category.title} | {APP_NAME}
        </title>
        <meta
          name="description"
          content={`Best programming tutorials on ${category.name}`}
        />
        <link rel="canonical" href={`${DOMAIN}/categories/${query.slug}`} />
        <meta property="og:title" content={`${category.name} | ${APP_NAME}`} />
        <meta
          property="og:description"
          content={`Best programming tutorials on ${category.name}`}
        />
        <meta property="og:type" content="website" />
        <meta
          property="og:url"
          content={`${DOMAIN}/categories/${query.slug}`}
        />
        <meta property="og:site_name" content={APP_NAME} />
        <meta
          property="og:image"
          content={`${DOMAIN}/assets/images/codingblog.jpeg`}
        />
        <meta
          property="og:image:secure_url"
          content={`${DOMAIN}/assets/images/codingblog.jpeg`}
        />
        <meta property="og:image:type" content="image/jpg" />
        <meta property="og:fb_app_id" content={FB_APP_ID} />
      </Head>
    );
  };
  return (
    <>
      {head()}
      <main>
        <div className="container-fluid text-center">
          <header>
            <div className="col-md-12 pt3">
              <h1 className="display-4 font-weight-bold">{category.name}</h1>
              {blogs.map((blog, i) => (
                <div>
                  <Card key={i} blog={blog} />
                  <hr style={{ background: "grey" }} />
                </div>
              ))}
              <hr />
            </div>
          </header>
        </div>
      </main>
    </>
  );
};

Category.getInitialProps = ({ query }) => {
  return singleCategory(query.slug).then((data) => {
    console.log(data);
    if (data.error) {
      console.log(data.error);
    } else {
      return { category: data.category, blogs: data.blogs, query };
    }
  });
};

export default Category;
