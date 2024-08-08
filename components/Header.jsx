import { IoLocation} from "react-icons/io5";
import { MdOutlinePhoneAndroid } from "react-icons/md";
import { ImClock } from "react-icons/im";
import { TiShoppingCart } from "react-icons/ti";
import { SlSocialFacebook, SlSocialInstagram, SlSocialTwitter, SlSocialYoutube} from "react-icons/sl";
import { PiCarSimpleBold } from "react-icons/pi";
import { IoMdMenu } from "react-icons/io";
import { RxCross2 } from "react-icons/rx";
import {useEffect, useState} from 'react';
import { Link } from "react-router-dom";
import { useMediaQuery } from "react-responsive";
const Header =()=>{
    const [isSticky,setSticky] = useState(1)

    useEffect(() => {
        const handleScroll = () => {
          const scrollTop = window.scrollY;
          const maxScroll = 100;
          const newSticky = Math.max(1 - scrollTop / maxScroll, 0.6);
          setSticky(newSticky);
        };
    
        window.addEventListener("scroll", handleScroll);
    
        return () => {
          window.removeEventListener("scroll", handleScroll);
        };
      }, []);

      const is1070 = useMediaQuery({query:'(max-width:1070px)'})
      const [isMenu, setIsMenu] = useState(false)

      const handleMenu=()=>{
        setIsMenu(prev=>!prev)
      }
    return(
        <>
            <header className="mainHeader">
                <section className={`header1 ${isSticky<=0.6?'sticky':''} ${is1070?'invisible':''}`}>
                    <div className="header1Small">
                    <div className="contactAll">
                        <div className="location">
                            <IoLocation/>
                            
                            <p>M255, Minna, Niger State.</p>
                        </div>

                        <div className="callUs">
                            <MdOutlinePhoneAndroid/>
                            <p>Call Us: +00123456789</p>
                        </div>

                        <div className="time">
                            <ImClock/>
                            <p>9AM - 8PM</p>
                        </div>
                    </div>

                    <div className="addToCart">
                        <Link to='/checkout'>
                            <button><TiShoppingCart className="btnIcon"/></button>
                            <h4 className="flowing">{JSON.parse(localStorage.getItem('chooseQTY'))}</h4>
                        </Link>
                    </div></div>
                    
                </section>

                <section className={`header2 ${isSticky<=0.6?'invisible':''}`} >
                   <div className="header2Small">
                   <div className="logo">
                        <Link to='/' className="linkFlex" style={{textDecoration:'none', color:'black'}}><PiCarSimpleBold className="logoIcons"/>
                        <p>Quick Moving</p></Link>
                    </div>

                    <div className={`secondTemplate ${is1070?'invisible':''}`}>
                        <ul>
                            <li>Home</li>
                            <li>About</li>
                            <li>Services</li>
                            <li>Inventory</li>
                            <li>Blog</li>
                            <li>Shop</li>
                            <li>FAQ</li>
                            <li>Contacts</li>
                        </ul>
                    </div>

                    {is1070?
                        <div className="menuClick" onClick={handleMenu}>
                        {isMenu?<RxCross2 className="icon"/>:<IoMdMenu className="icon"/>}

                    </div>:''
                    }
                    <div className={`socials ${is1070?'invisible':''}`}>
                        <SlSocialFacebook className="socialIcons"/>
                        <SlSocialInstagram className="socialIcons"/>
                        <SlSocialTwitter className="socialIcons"/>
                        <SlSocialYoutube className="socialIcons"/>
                    </div>
                    
                   </div>
                </section>
            </header>
        </>
    )
}
export default Header