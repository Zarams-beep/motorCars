import { SlSocialFacebook, SlSocialInstagram, SlSocialTwitter, SlSocialYoutube} from "react-icons/sl";
import { TiShoppingCart } from "react-icons/ti";
import { useMediaQuery } from "react-responsive";
import { Link } from "react-router-dom";
const Floating = ()=>{
    const is1070 = useMediaQuery({query:'(max-width:1070px)'})
    
    return(
        <>
             {is1070?
          <div className={`${is1070?'stickIt':''}`}>
              <SlSocialFacebook className="socialIcons"/>
              <SlSocialInstagram className="socialIcons"/>
              <SlSocialTwitter className="socialIcons"/>
              <SlSocialYoutube className="socialIcons"/>

              <div className="addToCart">
                        <Link to='/checkout'>
                            <button><TiShoppingCart className="btnIcon"/></button>
                            <h4 className="flowing">{JSON.parse(localStorage.getItem('chooseQTY'))}</h4>
                        </Link>
                    </div>
            </div>:''}
        </>
    )
}
export default Floating;