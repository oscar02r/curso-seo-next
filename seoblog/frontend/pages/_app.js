import Layout from "../components/Layout"
import '../style.css'
import '../node_modules/nprogress/nprogress.css'
function MyApp({ Component, pageProps }) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}

export default MyApp