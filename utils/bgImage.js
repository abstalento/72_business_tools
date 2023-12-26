import Image from "next/image"
import { useEffect, useState } from "react"

function getWindowDimension (){
    const {innerWidth: width, innerHeigth: heigth} =window
    return {
        width, heigth
    }
}

function BgImge (){
    const [width, setWidth]=useState()
    const [heigth,setHeigth]=useState()

    useEffect(() => {
      const{width, heigth}=getWindowDimension()
      setWidth(width)
      setHeigth(heigth)
      return () => {
        second
      }
    }, [])

    useEffect(()=>{
        function handleResize(){
            const{width, heigth}=getWindowDimension()
            setWidth(width)
            setHeigth(heigth)
        }
        window.addEventListener("resize",handleResize())
        return()=>window.removeEventListener("resize", handleResize)
    },[])

    if(width && heigth){
        return(
            <Image src="../../public/src/pomodoroAssests/bg.png"
            width={width}
            height={heigth}
            />
        )
    }
    return null

}

export default BgImge