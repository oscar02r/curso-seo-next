import Head from "next/head";
import Link from "next/link";
import { withRouter } from "next/router";
import { useState } from "react";
import { listBlogsWithCategoriesAndtags } from "../../actions/blog";
import Card from "../../components/blog/Card";
import { APP_NAME, DOMAIN, API, FB_APP_ID } from "../../config";

const Blogs = ({ blogs, categories, tags, totalBlogs, blogsLimit, blogSkip, router }) => {
  
  const head = () => {
    return (
      <Head>
        <title>Programing blogs | {APP_NAME}</title>
        <meta
          name="description"
          content="Programing blogs and tutorials on react node next vue php laravel and web 
  development"
        />
        <link rel="canonical" href={`${DOMAIN}${router.pathname}`} />
        <meta
          property="og:title"
          content={"Latest web development tutotials"}
        />
        <meta
          property="og:description"
          content="Programming blogs and turorials on react node next veu pnp and web 
  development"
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={`${DOMAIN}${router.pathname}`} />
        <meta property="og:site_name" content={APP_NAME} />
        <meta property="og:image" content={`${DOMAIN}/assets/images/codingblog.jpeg`} />
        <meta
          property="og:image:secure_url"
         content={`${DOMAIN}/assets/images/codingblog.jpeg`}
        />
        <meta property="og:image:type" content="image/jpg" />
        <meta property="og:fb_app_id" content={FB_APP_ID} />
      </Head>
    );
  };

  const [limit, setLimit] = useState(blogsLimit)
  const [skip, setSkip] = useState(0)
  const [size, setSize] = useState(totalBlogs)
  const [loadedBlogs, setLoadedBlogs] = useState([])

  const loadMore = ()=>{
    let toSkip = skip + limit
    listBlogsWithCategoriesAndtags(toSkip, limit).then(data=>{
      if (data.error) {
         console.log(data.error)
      } else{
        setLoadedBlogs([...loadedBlogs, ...data.blogs])
        setSize(data.size)
        setSkip(toSkip)
      }
    })
  }
  const loadMoreButton = () => {  
           return(
             size > 0 && size >= limit && <button onClick={loadMore} className="btn btn-outline-primary btn-lg">Load more</button>
           )
  }
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
        <a className="btn btn-outline-primary mr-1 ml-1 mt-3">{t.name}</a>
      </Link>
    ));
  };

  const showAllBlogs = () =>{
      return blogs.map((blog, i)=> {
      return(  <article key={i}>
          <Card blog={blog}/>
          <hr/>
        </article>)
      })
  }
  const showLoadedBlogs = ()=>{
    return loadedBlogs.map((blog, i)=>(
      <article key={i}>
            <Card blog={blog}/>
      </article> 
    ))
  }
  return (
    <>
    {head()}
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
                {categories && showAllCategories()}
                <br />
                {showAlltags()}
              </div>
            </section>
          </header>
        </div>
        <div className="container-fluid">{showAllBlogs()}</div>
        <div className="container-fluid">{showLoadedBlogs()}</div>
        <div className="text-center pt-5 pb-5">{loadMoreButton()}</div>
      </main>
    </>
  );
};

Blogs.getInitialProps = () => {
       let limit = 2
       let skip = 0
  return listBlogsWithCategoriesAndtags(skip, limit).then((data) => {
    if (data.error) {
      console.log(data.error);
    } else {
      return {
        blogs: data.blogs,
        categories: data.categories,
        tags: data.tags,
        totalBlogs: data.size,
        blogsLimit:limit,
        blogSkip:skip
      };
    }
  });
};

export default withRouter(Blogs);
