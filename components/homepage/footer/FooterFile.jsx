import React from "react"
export default function FooterFile() {
    const handleNavigate = () => {
        if (typeof window !== "undefined") {
            window.location.href = "https://alphabsolutions.com/"
          }
       
    }
    return (
        <div className="w-[100%] h-5">
            <footer className="flex flex-1 justify-center items-center text-center py-3 px-0 bg-white hover:cursor-pointer ">
                <p className="font-['sf-pro-medium'] text-sm md:text-base sm:text-xs lg:text-base text-black  sm:text-center" onClick={handleNavigate}>
                     © 2023, Alpha Business Solutions Pvt. Ltd. All Rights Reserved.</p>
            </footer>
        </div>
    )
}
