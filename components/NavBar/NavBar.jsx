import React, { useState, useEffect, useContext ,  CSSProperties } from "react";
import Image from 'next/image';
import Link from 'next/link';
import { MdNotifications } from 'react-icons/md'
import { CgMenuLeft, CgMenuRight } from 'react-icons/cg'

import Style from './NavBar.module.css'
import { Discover, Notification, HelpCenter, Profile, SideBar } from './index';
import { Button, Error } from "../componentIndex"
import images from "../../img";
import { BsSearch } from "react-icons/bs";
import { useRouter } from "next/router";

//IMPORT FROM SMART CONTRACT
import { NFTMarketplaceContext } from "../../context/NFTMarketplaceContext";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


import PuffLoader from "react-spinners/PuffLoader";


const override = {
    position: "absolute",
    top: 100,
    right: `calc(50% - 25px)`,
    top: `calc(50% - 25px)`,
    display: "block",
    margin: "0 auto",
    // borderColor: "red",
  };

const NavBar = () => {
    const notify = (message) => toast(message);
    // const [currentAccount, setCurrentAccount ] = useState("");
    const [discover, setDiscover] = useState(false);
    const [help, setHelp] = useState(false);
    const [notification, setNotification] = useState(false);
    const [profile, setProfile] = useState(false);
    const [openSideMenu, setOpenSideMenu] = useState(false);
    const router = useRouter();
    let [color, setColor] = useState("#4C5773");


    const openMenu = (e) => {
        const btnText = e.target.innerText;
        if (btnText == "Discover") {
          setDiscover(!discover);
          setHelp(false);
          setNotification(false);
          setProfile(false);
        } else if (btnText == "Help Center") {
          setDiscover(false);
          setHelp(!help);
          setNotification(false);
          setProfile(false);
        } else {
          setDiscover(false);
          setHelp(false);
          setNotification(false);
          setProfile(false);
        }
      };
    
    const openNotification = () => {
        if (!notification) {
            setNotification(true);
            setDiscover(false);
            setHelp(false);
            setProfile(false);
        } else {
            setNotification(false);
        }
    };
    
    const openProfile = () => {
        if (!profile) {
          setProfile(true);
          setHelp(false);
          setDiscover(false);
          setNotification(false);
        } else {
          setProfile(false);
        }
      };
    

      const closeMenu = () => {
        setProfile(false);
        setHelp(false);
        setDiscover(false);
        setNotification(false);
      }    
    // const openSideBar = () => {
   
    //     if (!openSideMenu) {
    //       setOpenSideMenu(true);
    //     } else {
    //       setOpenSideMenu(false);
    //     }
    //   };

      const { 
            currentAccount, 
            connectWallet,
            openError,
            setOpenError,
            error,
            loading,
            setLoading
        } = useContext(
            NFTMarketplaceContext
        );
    
      useEffect(() => {
        if(openError) {
            notify(error)
            setTimeout(() => {
                setOpenError(false)
            }, 500)
        }
      }, [openError])

      console.log('currentAccount123', currentAccount);
    return (
        <div className={Style.navbar}>
            <div className={Style.navbar_container}>
                <div className={Style.navbar_container_left}>
                    <div className={Style.logo}>
                        {/* <DiJqueryLogo onClick={() => router.push("/")} /> */}
                        <Image
                            src={images.logo}
                            // alt="Profile"
                            width={60}
                            height={60}
                            onClick={() => router.push("/")} 
                            className={Style.logo_image}
                        />

                    </div>
                    {/* <div className={Style.navbar_container_left_box_input}>
                        <div className={Style.navbar_container_left_box_input_box}>
                            <input type="text" placeholder="Search NFT" />
                            <BsSearch onClick={() => { }} className={Style.search_icon} />
                        </div>
                    </div> */}
                </div>

                <div className={Style.navbar_container_right}>
                    <div className={Style.navbar_container_right_discover}>
                        <p onClick={(e) => openMenu(e)}>Discover</p>
                        {discover && (
                            <div className={Style.navbar_container_right_discover_box}>
                                <Discover closeMenu={() => closeMenu()}></Discover>
                            </div>
                        )}
                    </div>
                        {/* HELP CENTER MENU */}
                        <div className={Style.navbar_container_right_help}>
                            <p onClick={(e) => openMenu(e)}>Help Center</p>
                            {help && (
                                <div className={Style.navbar_container_right_help_box}>
                                    <HelpCenter  closeMenu={() => closeMenu()}/>
                                </div>
                            )}
                        </div>


                        {/* NOTIFICATION */}
                        <div className={Style.navbar_container_right_notify}>
                            <MdNotifications
                                className={Style.notify}
                                onClick={() => openNotification()}
                            />
                            {notification && <Notification />}
                        </div>


                        {/* CREATE BUTTON SECTION */}
                        <div className={Style.navbar_container_right_button}>
                            {currentAccount == "" ? (
                                <Button btnName="Connect" handleClick={() => connectWallet()} />
                            ) : (
                                <Button
                                    btnName="Create"
                                    handleClick={() => router.push("/uploadNFT")}
                                />
                            )}
                        </div>

                        {
                            currentAccount !=='' &&                         
                            <div className={Style.navbar_container_right_profile_box} >
                                <div className={Style.navbar_container_right_profile}>
                                   

                                        <div 
                                            className={Style.navbar_container_right_profile_connectBox}
                                            style={{ 
                             
                                            }}>
                                                    <div className={Style.navbar_container_right_profile_connectBox_address}>{currentAccount.slice(0, 12)}</div>
                                                    <div style={{ marginTop: '0.7rem', position: "relative", width: `${30}px`, height: `${30}px` }}>
                                                    <Image
                                                            src={images.provider1}
                                                            alt={images.provider1}
                                                            width={40}
                                                            height={40}
                                                            style={{ objectFit: "contain" }}
                                                            // objectFit=
                                                            // className={Style.navbar_container_right_profile_connectBox_logo}
                                                    />
                                                    </div>
                                                
                                         </div>
                                        <Image
                                            src={images.defaultUser}
                                            alt="Profile"
                                            width={50}
                                            height={50}
                                            onClick={() => openProfile()}
                                            className={Style.navbar_container_right_profile_image}
                                        />
                                        {profile && <Profile closeMenu={closeMenu} currentAccount={currentAccount}/>}
                                    
                                </div>
                            </div>
                        }


                        {/* MENU BUTTON */}

                        <div className={Style.navbar_container_right_menuBtn}>
                            <CgMenuRight
                                className={Style.menuIcon}
                                onClick={() => openSideBar()}
                            />
                        </div>
                    
                </div>
            </div>

            {/* SIDBAR CPMPONE/NT */}
            {openSideMenu && (
                <div className={Style.sideBar}>
                    <SideBar
                        setOpenSideMenu={setOpenSideMenu}
                        currentAccount={currentAccount}
                        connectWallet={connectWallet}
                        />
                </div>
            )}


            <ToastContainer 
                position="top-center"
                autoClose={4000}
                // hideProgressBar={false}
                // newestOnTop={false}
                // closeOnClick
                // rtl={false}
                // pauseOnFocusLoss
                // draggable
                // pauseOnHover
                // theme="light"
                // transition="Bounce"
            />
            
            {
                loading &&
               
                    <div style={{width: '100%', height: '100vh', position: 'fixed'}}>
                        <PuffLoader
                            color={color}
                            loading={loading}
                            cssOverride={override}
                            size={50}
                            aria-label="Loading Spinner"
                            data-testid="loader"
                        />
                    </div>
    
            }

        </div>
    )
}

export default NavBar