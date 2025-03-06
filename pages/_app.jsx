
import { Nav } from '../components/nav';
import '../global.css';


export default function App({ Component, pageProps }) {
  return <>
    <Nav />
    <hr />
    <Component {...pageProps} />
    <hr />
    Подвал
  </>
}

