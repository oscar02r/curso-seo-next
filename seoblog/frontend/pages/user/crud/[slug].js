import Private from "../../../components/auth/Private";
import BlogUpdate from '../../../components/crud/BlogUpdate'

const Blog = () => {
  return (
    <Private>
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-12 pt-5 pb-5 text-center">
            <h2>Update blog</h2>
          </div>
          <div className="col-md-12">
           <BlogUpdate/>
          </div>
        </div>
      </div>
    </Private>
  );
};

export default Blog;
