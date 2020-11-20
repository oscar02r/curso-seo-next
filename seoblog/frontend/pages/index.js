import Link from 'next/link'

const Index = () => {
  return (
    <>
      <h1>Hola mundo</h1>
      <Link href="/signup">
        <a >Signup</a>  
      </Link>
    </>
  )
}

export default Index
