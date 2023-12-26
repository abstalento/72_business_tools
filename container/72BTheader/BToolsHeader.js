import BtImage from "../../components/btimage/BtImage"
import { useRouter } from "next/router";

const BtoolsHeader = ({Src, Height, Width, headerContainerStyles = {}}) => {
    const router = useRouter();
    const homeRoute = () => {
        router.push("/")
    }
    return (
        <header style={{ ...headerContainerStyles }} className="pl-5 p-1 flex items-center">
            <BtImage src="/images/72BTImage.png" height="35" width="84" alt="btLogo" style="cursor-pointer" onClick={homeRoute}/>
            <div className="m-[0_10px] flex items-center">
                <BtImage src="/icons/lineIcon.svg" height="32" width="12" alt="btLineLogo"/> 
            </div>
            {/* <BtImage src="/icons/lineIcon.svg" height="34" width="14" alt="btLineLogo"/>  */}
            <BtImage src={Src} height={Height} width={Width} alt="appLogo"/>
            
        </header>
    )
}

export default BtoolsHeader