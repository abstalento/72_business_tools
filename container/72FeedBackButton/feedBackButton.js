import Router from "next/router";
// import emailjs from "emailjs-com";
import { useState } from "react";

const FeedBackButton = ({ Src, Path, appName }) => {
  const [userFeedBack, setUserFeedBack] = useState({
    from_name: "",
    from_email: "",
    from_subject: "",
    message: "",
  });
  const feedBackData = () => {
    const userFeedBack = {
      userSrc: Src,
      userAppName: appName,
    };
    // Router.push({
    //     pathname: `${Path}`,
    //     query: { data: JSON.stringify(userFeedBack) },
    //   });
  };

  const feedbackDatas = (event) => {
    let { name, value } = event.target;
    setUserFeedBack({ ...userFeedBack, [name]: value });
  };
  function sendEmail(e) {
    e.preventDefault(); //This is important, i'm not sure why, but the email won't send without it
    emailjs
      .sendForm(
        "service_mail",
        "template_oj69s2b",
        e.target,
        "EjLf1_k7MxdIJ9S4I"
      )
      .then(
        (result) => {
          // console.log("window");
          //   window.location.reload(); //This is if you still want the page to reload (since e.preventDefault() cancelled that behavior)
        },
        (error) => {
          console.log(error.text);
        }
      );
  }
  return (
    <div className="w-[100%] bg-black text-white text-center p-2 flex justify-center items-center space-x-7">
      <p className="text-sm">Give feedback What do you experience with our product ?</p>
      <button className="bg-white text-[100%] text-black font-[sf-pro-medium] p-2 rounded-md w-[30%] md:w-[15%] cursor-not-allowed" onClick={feedBackData}>FEEDBACK</button>
      {/* <form className="contact-form" onSubmit={sendEmail}>
        <input type="hidden" name="contact_number" />
        <input type="text" hidden onChange={feedbackDatas} value={appName} name="from_Src" />
        <label>Name</label>
        <input type="text" onChange={feedbackDatas} value={userFeedBack.from_name} name="from_name" />
        <label>Email</label>
        <input type="email" onChange={feedbackDatas} value={userFeedBack.from_email} name="from_email" />
        <label>Subject</label>
        <input type="text" onChange={feedbackDatas} value={userFeedBack.from_subject} name="from_subject" />
        <label>Message</label>
        <textarea name="html_message"/>
        <input type="submit" value="Send" />
      </form> */}
    </div>
  );
};

export default FeedBackButton;
