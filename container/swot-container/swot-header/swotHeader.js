import MyHeader from "../../../components/swot-components/my-header/myHeader";
import MyImage from "../../../components/swot-components/my-image/myImage";

export default function SwotHeader({styles}) {
    return (
        <>
            <div className={`${styles}`}>
                <MyImage
                    src="/icons/Swotlogo.svg"
                    height="25"
                    width="32"
                    alt="Logo"
                />
                <MyHeader headerText="SWOT Analysis" headerSpan="BY 72 BUSINESS TOOLS"/>
            </div>
        </>
    )
}