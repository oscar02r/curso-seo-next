import Head from "next/head";
import Link from "next/link";
import emailjs from 'emailjs-com';
import { userPublicProfile } from "../../actions/user";
import moment from "moment";
import { APP_NAME, DOMAIN, API, FB_APP_ID } from "../../config";

const UserProfile = ({ user, blogs, query }) => {
  const head = () => {
    return (
      <Head>
        <title>
          {user.username} | {APP_NAME}
        </title>
        <meta name="description" content={`Blogs by ${user.username}`} />
        <link rel="canonical" href={`${DOMAIN}/profile/${query.username}`} />
        <meta property="og:title" content={`${user.name} | ${APP_NAME}`} />
        <meta property="og:description" content={`Blogs by ${user.username}`} />
        <meta property="og:type" content="website" />
        <meta
          property="og:url"
          content={`${DOMAIN}/profile/${query.username}`}
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
  const showUserBlogs = () => {
    return blogs.map((blog, i) => {
      return (
        <div key={i} className="mt-4 mb-4">
          <Link href={`/blogs/${blog.slug}`}>
            <a className="lead"> {blog.title}</a>
          </Link>
        </div>
      );
    });
  };
  const sendEmail = (e) => {
    e.preventDefault();
    emailjs
      .sendForm(
        "service_4aczgbx",
        "template_bdgzb19",
        e.target,
        "user_yIuLJVGVNXnEoKbnMkGun"
      )
      .then(
        (result) => {
          console.log(result);
        },
        (error) => {
          console.log(error.text);
        }
      );
  };
  const contactForm = () => {
    return (
      <form onSubmit={sendEmail}>
        <div className="form-group">
          <input type="hidden" name="contact_number" />
          <label>Name</label>
        </div>

        <div className="form-group">
          <input type="text" name="from_name" className="form-control"/>
        </div>
        <div className="form-group">

          <label >Email</label>
        <input type="email" name="from_email" className="form-control" />
        </div>
        <label>Message</label>
        <textarea name="message" className="form-control" />
        <div className="form-group pt-4">

        <input type="submit" value="Send" className="btn btn-primary btn-md"/>
        </div>
      </form>
    );
  };

  return (
    <>
      {head()}
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <div className="card">
              <div className="card-body">
                <div className="row">
                  <div className="col-md-8">
                    <h5>{user.name}</h5>
                    <p className="text-muted">
                      Joined {moment(user.createdAt).fromNow()}
                    </p>
                  </div>
                  <div className="col-md-4">
                    <img
                      src={`${API}/api/user/photo/${user.username}`}
                      className="img img-fluid img-thumbnail mb-3"
                      alt={user.username}
                      style={{ maxHeight: "auto", maxWidth: "100%" }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <br />

      <div className="container pb-5">
        <div className="row">
          <div className="col-md-6">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title bg-primary pt-4 pb-4 pl-4 pr-4 text-white">
                  Recent blogs by {user.name}
                </h5>
                {showUserBlogs()}
              </div>
            </div>
          </div>
          <div className="col-md-6">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title bg-primary pt-4 pb-4 pl-4 pr-4 text-light">
                  Message {user.name}
                </h5>
                <br />
                {contactForm()}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

UserProfile.getInitialProps = ({ query }) => {
  return userPublicProfile(query.username).then((data) => {
    console.log(data);
    if (data.error) {
      console.log(data.error);
    } else {
      return {
        user: data.user,
        blogs: data.blogs,
        query,
      };
    }
  });
};

export default UserProfile;
