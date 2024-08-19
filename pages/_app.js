import '../styles/globals.css'
import { NavBar, Footer } from "../components/componentIndex";
import { NFTMarketplaceProvider } from "../context/NFTMarketplaceContext";
import { ThemeProvider } from 'next-themes'

const MyApp = ({ Component, pageProps }) => {

  return (
    <div>
      <ThemeProvider>
        <NFTMarketplaceProvider >
          <NavBar />
          <Component {...pageProps} />
          <Footer />
        </NFTMarketplaceProvider>
      </ThemeProvider>
    </div>) 

}

    export default MyApp
