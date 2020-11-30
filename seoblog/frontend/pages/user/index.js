import Link from 'next/link'
import Private from '../../components/auth/Private'

const UserIndex = () => {
  return (
    
      <Private>
        <div className="container-fluid">
  <div className="row">
    <div className="col-md-12 pt-5 pb-5 text-center">
      <h2>User Dashboard</h2>
    </div>
    <div className="col-md-4">
      <ul className="list-group">
        
        <li className="list-group-item">
          <Link href="/user/crud/blog">
            <a>Create Blog</a>
          </Link>
        </li>
        <li className="list-group-item">
          <Link href="/user/crud/blogs">
            <a>Update / Delete Blogs</a>
          </Link>
        </li>
        <li className="list-group-item">
   <Link href="/user/update">
     <a>Update profile</a>
   </Link>
 </li>
      </ul>
    </div>
    <div className="col-md-8">Rigth</div>
  </div>
</div>
      </Private> 
  )
}

export default UserIndex
