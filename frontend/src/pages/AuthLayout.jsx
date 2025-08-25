import React from "react";
import { cn } from "../lib/utils";
import { Spotlight } from "../components/ui/Spotlight";
import Carousel from "../components/auth/Carousel";

const AuthLayout = () => {
  return (
    <div
      className="relative flex h-[100vh] w-full overflow-hidden rounded-md bg-black/[0.96] antialiased md:justify-center">
      <div
        className={cn(
          "pointer-events-none absolute inset-0 [background-size:40px_40px] select-none",
          "[background-image:linear-gradient(to_right,#171717_1px,transparent_1px),linear-gradient(to_bottom,#171717_1px,transparent_1px)]"
        )} />
      <Spotlight className="-top-40 left-0 md:-top-20 md:left-60" fill="white" />
      <div className="relative z-10 mx-auto w-full max-w-7xl p-4 pt-20">
        <h1
          className="bg-opacity-50 bg-gradient-to-b from-neutral-50 to-neutral-400 bg-clip-text text-center text-4xl font-bold text-transparent md:text-7xl">
          Welcome to Pixissphere
        </h1>
        <div className="mb-10">
          <div
            className="flex gap-4 justify-center mx-auto mt-4 max-w-lg text-center text-base font-normal text-neutral-300"
            >
              <button className="px-4 font-semibold py-2 sm:px-6 sm:py-3 lg:px-8 lg:py-4 
                text-sm sm:text-lg lg:text-2xl 
                text-white bg-black hover:bg-white hover:text-black 
                rounded transition-colors duration-300">
                Login
              </button>

              <button className="px-4 font-semibold py-2 sm:px-6 sm:py-3 lg:px-8 lg:py-4 
                text-sm sm:text-lg lg:text-2xl 
                text-white bg-black hover:bg-white hover:text-black 
                rounded transition-colors duration-300">
                Signup
              </button>
            </div>
        </div>

        <Carousel />
      </div>
    </div>
  );
}

export default AuthLayout;