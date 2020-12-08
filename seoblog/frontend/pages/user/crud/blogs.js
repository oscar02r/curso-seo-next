import Link from 'next/link'
import Private from "../../../components/auth/Private"
import BlogRead from '../../../components/crud/BlogRead'
import { isAuth} from '../../../actions/auth'

const Blogs = () => {
const username = isAuth() && isAuth().username
  return (
    <Private>
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-12 pt-5 pb-5">
            <h2>Manage blogs</h2>
          </div>
          <div className="col-md-12">
           <BlogRead username = {username}/>
          </div>
        </div>
      </div>
    </Private>
  );
};

export default Blogs;
