import React from 'react'
import Link from "next/link";

//INTERNAL IMPORT
import Style from "./HelpCenter.module.css";

const HelpCenter = ({ closeMenu }) => {
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
                <Link href={{ pathname: `${el.link}` }}>
                    <div className={Style.helpCenter} key={el.name} onClick={() => closeMenu()}>
                        {el.name}
                    </div>
                </Link>
            ))}
        </div>
    )
}

export default HelpCenter