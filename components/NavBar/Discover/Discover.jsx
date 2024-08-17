import React from 'react'

import Link from "next/link";

//INTERNAL IMPORT
import Style from "./Discover.module.css";

const Discover = ({ closeMenu }) => {
    //--------DISCOVER NAVIGATION MENU
    const discover = [
    {
        name: "Collection",
        link: "collection",
    },
    {
        name: "Search",
        link: "search",
    },
    {
        name: "Author Profile",
        link: "author",
    },
    {
        name: "Upload NFT",
        link: "uploadNFT",
    },
    {
        name: "Connect Wallet",
        link: "connectWallet",
    }
    ]; 
    return (
        <div>
        {discover.map((el, i) => (
          <div key={el.name} className={Style.discover} onClick={() => closeMenu()}>
            <Link href={{ pathname: `${el.link}` }}>{el.name}</Link>
          </div>
        ))}
      </div>
    )
}

export default Discover