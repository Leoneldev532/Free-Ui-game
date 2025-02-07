

"use client"
import React, { useEffect, useRef } from 'react'
import badge from "@/public/badge.png"
import Image from 'next/image'
import { productType } from '@/lib/type'
import gsap from 'gsap'
const ProductComponent = ({ ProductComponentProps }: { ProductComponentProps: productType }) => {


  const txtRef = useRef<HTMLSpanElement | null>(null)


  const animePrice = (finalValue: number) => {

    if (!txtRef?.current) return;

    const element = txtRef?.current;

    let currentValue = 0;
    const duration = 4;
    const incrementTime = (duration * 1000) / (finalValue * 100);


    const updateValue = () => {
      if (currentValue < finalValue) {
        currentValue += 0.01;
        element.textContent = currentValue.toFixed(2);

        gsap.fromTo(element,
          { y: 30 },
          {
            y: -30,
            
            delay: 1,
            duration: 0.6,
            ease: "elastic.out(1, 0.3)",
            onComplete: () => {
              gsap.set(element, { y: 0 });
              updateValue();
            }
          }
        );

        setTimeout(updateValue, incrementTime);
      } else {
        element.textContent = finalValue.toFixed(2);
      }
    };

    updateValue();
  };

  useEffect(() => {
    if(ProductComponentProps.allowAnimation){

      animePrice(ProductComponentProps?.price)
    }

  }, [ProductComponentProps.allowAnimation])




  const handleAnimeTxtHoverLeave = () => {

  }

  const handleAnimeTxtHoverEnter = () => {

  }


  return (
    <div className="flex product px-4 pb-4 justify-between items-center rounded-xl bg-white flex-col gap-y-3 ">


      <div className='flex justify-between items-center w-full '>
        <Image src={badge} className="object-cover" height={74} width={74} alt={ProductComponentProps?.number} />
        <span className='text-xl lg:text-3xl font-bold text-customMaroon'> {ProductComponentProps?.number} </span>
      </div>

      <div className='w-full flex justify-center items-center '>
        {ProductComponentProps?.image && <Image src={ProductComponentProps?.image} height={"64"} width={"64"} 
        className="object-cover" alt={ProductComponentProps?.number} />}
      </div>

      <button onMouseEnter={handleAnimeTxtHoverEnter} onMouseLeave={handleAnimeTxtHoverLeave} 
      className="rounded-xl py-2  px-1 text-white w-full text-center border border-customMaroon bg-customRed font-bold text-lg lg:text-2xl">
        <span ref={txtRef} className='txt'>{ProductComponentProps?.price}</span>$
      </button>


    </div>
  )
}

export default ProductComponent
