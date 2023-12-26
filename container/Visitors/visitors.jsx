import React, { useEffect, useState } from 'react';


const Visitors = () => {
  const [count, setCount] = useState(500);
  const [countData, setCountData] = useState(false);
  

  console.log(count,-"- count")
  console.log(countData," - countData")

  useEffect(() => {
    const randomDuration = Math.trunc(Math.random() * (5000 - 1000 + 1) + 50);
    const interval = setInterval(() => {
      console.log("useEffectInterval")
      setCount((prevCount) => prevCount + 1);
    },randomDuration);

    return () => {
      clearInterval(interval);
    };
  }, []);

  useEffect(() => {
    const randomToggleDuration = Math.trunc(Math.random() * (80000 - 60000 + 1) + 10000);
    setTimeout(() => {
      console.log("useEffect2")
      setCount(Math.trunc(Math.random() * (1000 - 900 + 1) + 900) + 100);
    },randomToggleDuration);
  }, [countData]);

  setTimeout(() => {
    setCountData(!countData);
  }, 400);

  // useEffect(() => {
  //   const randomToggleDuration = Math.trunc(Math.random() * (5000 - 1000 + 1) + 1000);
  //   const timeout = setTimeout(() => {
  //     setCountData(!countData);
  //   }, randomToggleDuration);

  //   return () => {
  //     clearTimeout(timeout);
  //   };
  // }, [countData]);

  return (
    <>
      <div className=' text-neutral-400 font-semibold text-4xl'>{count}+</div>
    </>
  );
};

export default Visitors;