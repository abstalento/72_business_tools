export default function Addfile({ handleAdd 
}) {
    return (
        <div class="cursor-pointer">
            <button className="text-sm mt-2 font-[sfpro-regular-display] text-white/60 flex items-center bg-white bg-opacity-[10%] 
            hover:bg-white hover:text-[#0064FE] px-1 rounded-lg py-1" id="addMore" onClick={handleAdd} >
                + Add more files
            </button>
        </div>
    )
}
