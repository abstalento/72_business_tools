import Image from "next/image";
import BtoolsFooter from "../../container/72BTfooter/BToolsFooter";
import BtoolsHeader from "../../container/72BTheader/BToolsHeader";

const FeedBackPage = () => {

    return (
        <div className="h-[100vh] bg-[#F9F9F9] w-full flex flex-col justify-between items-center">
            <div className="w-full">
                <BtoolsHeader></BtoolsHeader>
                <div className="bg-[#3d00bb] h-[45vh] w-[100%]">
                    <div className="bg-[url('../public/MaskGroup.png')] bg-[length:106%] h-[45vh] w-[100%] pt-[70px]"></div>
                </div>
            </div>
            <div className="w-full absolute top-[123px] h-[75vh] flex justify-around   ">
                <div className="bg-[#FFFFFF] w-[40%] h-[75vh] flex justify-around items-center rounded-[10px]">
                    <div className=" h-[70vh] w-[85%]">
                        <div className="flex justify-start w-full">
                            <p className="text-[26px] font-[sfpro-regular]">Help us to Improve Product</p>
                        </div>
                        <div className=" h-[15vh] flex flex-row justify-between pt-2">
                            <div className="flex justify-around flex-col w-[47%] h-[15vh] ">
                                <input className="bg-[#FAFAFA] rounded-[5px] p-[9px] text-[#101010] opacity-[50%] text-[14px] font-[sfpro-medium]" placeholder="User Name"></input>
                                <input className="bg-[#FAFAFA] rounded-[5px] p-[9px] text-[#101010] opacity-[50%] text-[14px] font-[sfpro-medium]" placeholder="Company Name"></input>
                            </div>
                            <div className="flex justify-around flex-col w-[47%] h-[15vh] ">
                                <input className="bg-[#FAFAFA] rounded-[5px] p-[9px] text-[#101010] opacity-[50%] text-[14px] font-[sfpro-medium]" placeholder="Email Id"></input>
                                <input className="bg-[#FAFAFA] rounded-[5px] p-[9px] text-[#101010] opacity-[50%] text-[14px] font-[sfpro-medium]" placeholder="Contact Number"></input>
                            </div>
                        </div>
                        <div className="pt-3">
                            <h1 className="font-[sfpro-regular]">What do you experience with our product ?</h1>
                            <div className="pt-3 pb-3">
                                <textarea placeholder="Enter you valuable key..." className="bg-[#FAFAFA] text-[#101010] opacity-[50%] font-[sfpro-regular] pl-[10px] pt-[10px] text-[14px] resize-none flex overflow-scroll scrollBar rounded-[5px] w-full h-[13vh]"></textarea>
                            </div>
                        </div>
                        <div>
                            <h1 className="font-[sfpro-regular]">What do you experience with our product ?</h1>
                            <div className="pt-3 text-[14px] text-[#00000066]">
                                <h1 className="font-[sfpro-regular]" >0 - not at all satisfied / not satisfied in any way</h1>
                                <h1 className="font-[sfpro-regular]">1 - not very satisfied</h1>
                                <h1 className="font-[sfpro-regular]">10 - very satisfied</h1>
                            </div>
                        </div>
                        <div className="pt-6 flex justify-around ">
                            <div className="w-[85%] flex flex-row justify-between">
                            <div className="flex flex-col items-center w-[6%]">
                                <input id="radio-0" name="feedback" type="radio" value="0" className="w-[77%] accent-[#6038B2] h-[17px]"></input>
                                <label for="radio-0" class="text-[12px] font-[sfpro-medium] ">0</label>
                                </div>
                                <div className="flex flex-col items-center w-[6%]">
                                <input type="radio" name="feedback" id="radio-1" value="1" className="w-[77%] h-[17px] accent-[#6038B2]"></input>
                                <label for="radio-1" class="text-[12px] font-[sfpro-medium] ">1</label>
                                </div>
                                <div className="flex flex-col items-center w-[6%]">
                                <input type="radio" name="feedback" id="radio-2" className="w-[77%] h-[17px] accent-[#6038B2]"></input>
                                <label for="radio-2" class="text-[12px] font-[sfpro-medium] ">2</label>
                                </div>
                                <div className="flex flex-col items-center w-[6%]">
                                <input type="radio" name="feedback" id="radio-3" className="w-[77%] h-[17px] accent-[#6038B2]"></input>
                                <label for="radio-3" class="text-[12px] font-[sfpro-medium] ">3</label>
                                </div>
                                <div className="flex flex-col items-center w-[6%]">
                                <input type="radio" name="feedback" className="w-[77%] h-[17px] accent-[#6038B2]"></input>
                                <label for="radio-1" class="text-[12px] font-[sfpro-medium] ">4</label>
                                </div>
                                <div className="flex flex-col items-center w-[6%]">
                                <input type="radio" name="feedback" className="w-[77%] h-[17px] accent-[#6038B2]"></input>
                                <label for="radio-1" class="text-[12px] font-[sfpro-medium] ">5</label>
                                </div>
                                <div className="flex flex-col items-center w-[6%]">
                                <input type="radio" name="feedback" className="w-[77%] h-[17px] accent-[#6038B2]"></input>
                                <label for="radio-1" class="text-[12px] font-[sfpro-medium] ">6</label>
                                </div>
                                <div className="flex flex-col items-center w-[6%]">
                                <input type="radio" name="feedback" className="w-[77%] h-[17px] accent-[#6038B2]"></input>
                                <label for="radio-1" class="text-[12px] font-[sfpro-medium] ">7</label>
                                </div>
                                <div className="flex flex-col items-center w-[6%]">
                                <input type="radio" name="feedback" className="w-[77%] h-[17px] accent-[#6038B2]"></input>
                                <label for="radio-1" class="text-[12px] font-[sfpro-medium] ">8</label>
                                </div>
                                <div className="flex flex-col items-center w-[6%]">
                                <input type="radio" name="feedback" className="w-[77%] h-[17px] accent-[#6038B2]"></input>
                                <label for="radio-1" class="text-[12px] font-[sfpro-medium] ">9</label>
                                </div>
                                <div className="flex flex-col items-center w-[6%]">
                                <input type="radio" name="feedback" className="w-[77%] h-[17px] accent-[#6038B2]  "></input>
                                <label for="radio-1" class="text-[12px] font-[sfpro-medium] ">10</label>
                                </div>
                            </div>
                            
                        </div>
                        <div className="w-full pt-[20px] flex items-center justify-center">
                                <div className="w-full flex flex-row justify-center items-center">
                                <button className="bg-[#2E2E2E66] rounded-[5px] text-[#FFFFFF] font-[sfpro-regular] mr-2 w-[20%] h-[5vh]">Home</button>
                                <button className="bg-[#F0483F] rounded-[5px] text-[#FFFFFF] font-[sfpro-regular] ml-2 w-[20%] h-[5vh]">Submit</button>
                                </div>
                        </div>
                        
                    </div>
                </div>
            </div>
            <div className="w-full">
                <BtoolsFooter/>
            </div>

        </div>

    )

}
export default FeedBackPage;