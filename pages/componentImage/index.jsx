import Head from "next/head";
import React from "react";
import Imagecomponent from "../../container/Imagecomponent/Imagecomponent";
export default function index() {
  return (
    <div>
      <Head>
        <title>ComponentImage</title>
      </Head>

      <div>
        <div class="flex flex-row h-[400px]">
          <div class="basis-1/4"></div>
          <div class="basis-1/2">Convert Your File Easily</div>
          <div class="basis-1/4"></div>
        </div>

        <div class="flex flex-row ">
          <div class="basis-1/4"></div>
          <div class="basis-1/2">
            <Imagecomponent></Imagecomponent>
            <div class="flex flex-row ">
              <div>1</div>
              <div>2</div>
              <div>3</div>
              <div>4</div>
            </div>
          </div>
          <div class="basis-1/4"></div>
        </div>
      </div>
    </div>
  );
}
