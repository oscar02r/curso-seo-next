import Link from "next/link";
import Admin from "../../components/auth/Admin";

const AdminIndex = () => {
  return (
    <Admin>
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-12 pt-5 pb-5 text-center">
            <h2>Admin Dashboard</h2>
          </div>
          <div className="col-md-4">
            <ul className="list-group">
              <li className="list-group-item">
                <Link href="/admin/crud/category-tag">
                  <a>Create Category</a>
                </Link>
              </li>
              <li className="list-group-item">
                <Link href="/admin/crud/category-tag">
                  <a>Create Tag</a>
                </Link>
              </li>
              <li className="list-group-item">
                <Link href="/admin/crud/blog">
                  <a>Create Blog</a>
                </Link>
              </li>
            </ul>
          </div>
          <div className="col-md-8">Rigth</div>
        </div>
      </div>
    </Admin>
  );
};

export default AdminIndex;
