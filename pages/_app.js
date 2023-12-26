
import NProgress from 'nprogress';
import Router, { useRouter } from 'next/router';
import '../styles/globals.css'
import '../styles/npProgress.css';
import Script from 'next/script';
import { useEffect } from 'react';
import axios from 'axios';
import { ANALYTICS_POST_URL, ANALYTIC_STATUS, APP_LOCALHOST_URL, APP_PROD_URL, APP_VERSION } from '../utils/config';
import { useState } from 'react';

Router.events.on('routeChangeStart', (url) => {
  NProgress.start();
});

Router.events.on('routeChangeComplete', () => NProgress.done());
Router.events.on('routeChangeError', () => NProgress.done());



function MyApp({ Component, pageProps }) {
  const [isProd, setIsProd] = useState(false)
  const router = useRouter()

  const onHandleAnalyticData = async () => {
    let body = {
      "app_id": APP_VERSION,
      "event_data": { "app_url": router.pathname },
      "event_type": "visit"
    }
    let response = axios({
      method: 'post',
      url: ANALYTICS_POST_URL,
      data: body,
    }).then(data => {
      return data
    }).catch(err => {
      console.log(err, "error")
    });
    return response
  }

  useEffect(() => {
    if (APP_PROD_URL == window.location.origin) {
      (async function serviceCall() {
        setIsProd(true)
        let res = await onHandleAnalyticData()
      })()
    }
  }, [Component])
  //Add analytics 
  return (
    <>
    {APP_PROD_URL && isProd? 
    <><Script async src="https://www.googletagmanager.com/gtag/js?id=G-NCKLY8J29H" />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
   window.dataLayer = typeof window !== "undefined" && window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-NCKLY8J29H');
       `}
      </Script></>:null}
      <Component {...pageProps} />
    </>
  )

}

export default MyApp
