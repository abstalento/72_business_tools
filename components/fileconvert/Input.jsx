import Image from "next/image"
import pin from "../../public/icons/pin.svg"
export default function Input(props) {
  return (
    <div class="flex items-center bg-[#415569] w-72 h-12 rounded-md text-white bg-opacity-[35%]">
      <div className="px-2 w-[72%] flex items-center">
        <div className="w-8 h-10">
          <div className="relative top-3">
            <Image src={pin} style={{ marginTop: "40px", zIndex: "10px" }} width={20} height={20} />
          </div>
          <input type="file" className="w-0 h-full text-sm opacity-0 block " />
        </div>
        <div className="">
          <p className="text-white truncate w-[43%]">{props.ImageName}</p>
        </div>

      </div>
      <div className="border-r-2 h-7 px-2"> </div>
      <p className="px-2">{props.ImageSize}</p>
    </div>
  )
}