"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import Link from "next/link";
import Image from "next/image";

const Banner = ({ products }) => {
  return (
    <div className="w-full max-w-[1200px] mx-auto my-6">
      <Swiper
        modules={[Navigation, Autoplay]}
        spaceBetween={30}
        slidesPerView={1}
        navigation
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        loop
      >
        {products.map((product) => (
          <SwiperSlide key={product.id}>
            <Link href={`/product/${product.id}`} className="block relative h-[300px] md:h-[400px] rounded-lg overflow-hidden">
              <div className="absolute inset-0">
                <Image 
                  src={product.image} 
                  alt={product.name} 
                  layout="fill" 
                  objectFit="cover" 
                  priority
                />
              </div>
              
              <div className="absolute inset-0 bg-black/40 flex flex-col justify-center items-center text-white text-center px-6">
                <h2 className="text-2xl md:text-3xl font-bold">{product.name}</h2>
                <div className="flex gap-2 items-center mt-2">
                  <span className="text-lg md:text-xl font-semibold text-red-400">
                    ${product.discountedPrice}
                  </span>
                  <span className="text-md md:text-lg line-through opacity-70">
                    ${product.originalPrice}
                  </span>
                </div>
                <button className="mt-4 px-6 py-2 bg-white text-black rounded-lg hover:bg-gray-200 transition">
                  Buy Now
                </button>
              </div>
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Banner;
