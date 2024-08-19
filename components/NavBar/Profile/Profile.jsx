import React from 'react'
import Image from "next/image";
import { FaUserAlt, FaRegImage, FaUserEdit } from "react-icons/fa";
import { MdHelpCenter } from "react-icons/md";
import { TbDownloadOff, TbDownload } from "react-icons/tb";
import Link from "next/link";

import Style from "./Profile.module.css";
import images from "../../../img";

const Profile = ({ currentAccount, closeMenu }) => {
    return (
        <div className={Style.profile}>
            <div className={Style.profile_account}>
                <Image
                    src={images.defaultUser}
                    alt="user profile"
                    width={50}
                    height={50}
                    className={Style.profile_account_img}
                />

                <div className={Style.profile_account_info}>
                    <p>Anonymous artist</p>
                    <small>{currentAccount.slice(0, 18)}..</small>
                </div>
            </div>

            <div className={Style.profile_menu}>
                <div className={Style.profile_menu_one} onClick={() => closeMenu()}>

                    <Link href={{ pathname: "/author" }}>
                        <div className={Style.profile_menu_one_item}>
                            <FaUserAlt />
                            <p>
                                My Profile
                            </p>
                        </div>
                    </Link>

                    <Link href={{ pathname: "/author" }}>
                        <div className={Style.profile_menu_one_item}>
                            <FaRegImage />
                            <p>
                                My Items
                            </p>
                        </div>
                    </Link>
                    <Link href={{ pathname: "/account" }}>
                        <div className={Style.profile_menu_one_item}>
                            <FaUserEdit />
                            <p>
                                Edit Profile
                            </p>
                        </div>
                    </Link>
                </div>

                <div className={Style.profile_menu_two} onClick={() => closeMenu()}>
                    <Link href={{ pathname: "/contactus" }}>
                        <div className={Style.profile_menu_one_item}>
                            <MdHelpCenter />
                            <p>
                                Help
                            </p>
                        </div>
                    </Link>
                    <Link href={{ pathname: "/aboutus" }}>
                        <div className={Style.profile_menu_one_item}>
                            <TbDownload />
                            <p>
                                About Us
                            </p>
                        </div>
                    </Link>
                </div>
            </div>

        </div>
    )
}

export default Profile