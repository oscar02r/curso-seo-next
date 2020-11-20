import Header from '../components/Header'

const Layout = ({children}) => {
  return (
    <> 
      <Header/>
      {children}
      <p>footer</p>
    </>
  )
}

export default Layout
