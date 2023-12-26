import React, { useState, useEffect } from "react";
import Card from "../../components/homepage/card/Card";
export default function BusinessTool(props) {
  const [product, setProduct] = useState([]);
  const filterProduct = () => {
    // if (props.filterData) {
    const filter = props.data.Product.filter((obj) => {
      if (obj.title.toLowerCase().includes(props.filterData)) {
        return obj;
      }
    });
    setProduct(filter);
    // }
  };
  useEffect(() => {
    setProduct(props.data.Product);
    filterProduct();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.data.Product, props.filterData]);
  return (
    <>
      <div className="w-full  bg-[#F2F2F2] flex justify-center bg-opacity-100 flex-col">
        <div className="flex justify-center items-center flex-col w-full h-[50%] my-10">

          <p className="text-center text-[20px] opacity-100 font-['sf-pro-bold'] text-black">
            {props.data.title}
          </p>
          <p className="text-center text-lg w-[90%] lg:w-[40%] sm:w-[90%] sm:text-base font-['sf-pro-light'] text-black opacity-70">
            {props.data.description}
          </p>
        </div>
        <div className="flex justify-center items-center  ">
        <div className="flex w-[88%] lg:w-[75%] 2xl:w-[66%]  3xl:w-[54%] xl:w-[70%]  md:w-[315px]  ">
          <div className="flex flex-wrap flex-row gap-6   flex-grow justify-center lg:justify-start ">
        {/* <div className="flex justify-center  flex-wrap ">
          <div className={`flex flex-row w-[80%] justify-start flex-wrap gap-6`} > */}
            {product.map((data) => (
              // eslint-disable-next-line react/jsx-key
              <>
                <Card
                  title={data.title}
                  description={data.description}
                  image={data.image}
                  path={data.path}
                  style={data.style}
                  divStyle={data.divstyle}
                  disable={data.disable}
                />
              </>
            ))}
          </div>
        </div>
        </div>
      
      </div>
    </>
  );
}
