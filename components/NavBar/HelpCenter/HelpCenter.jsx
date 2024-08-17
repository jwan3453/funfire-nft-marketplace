import React from 'react'
import Link from "next/link";

//INTERNAL IMPORT
import Style from "./HelpCenter.module.css";

const HelpCenter = ({closeMenu}) => {
    const helpCenter = [
        {
            name: "About",
            link: "aboutus",
        },
        {
            name: "Contact Us",
            link: "contactus",
        },
        {
            name: "Sign Up",
            link: "signUp",
        },
        {
            name: "LogIn",
            link: "login",
        },
        {
            name: "Subscription",
            link: "subscription",
        },
    ];
    return (
        <div className={Style.box}>
        {helpCenter.map((el, i) => (
          <div className={Style.helpCenter} key={el.name} onClick={()=>closeMenu()}>
            <Link href={{ pathname: `${el.link}` }}>{el.name}</Link>
          </div>
        ))}
      </div>
    )
}

export default HelpCenter