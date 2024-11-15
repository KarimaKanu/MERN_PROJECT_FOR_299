import React from 'react'

export default function Home() {
  return (
    <section>
    <div className="banner bg-yellow-50 m-0">
      <div className="flex sm:flex-row-reverse md:flex-row flex-col justify-around w-3/4 mx-auto py-20">
        <div className="flex-1 text-center">
          <p className="text-xl text-teal-400">
            A serene mind is just a conversation away.<br />
            <span>Welcome to your safe space</span>
          </p>
          <h1 className="text-[52px] font-bold text-gray-700">SERENADE SPACE</h1>
        </div>
        <div className="flex-2 rounded-xl">
          {/* <img src="/images/control.jpeg" alt="Control" /> */}
        </div>
      </div>
    </div>
    <footer className=" py-10 bg-teal-400 text-base-content rounded mt-40 px-auto justify-center">
    <div className="flex gap-3">
      <h2 className="text-2xl font-bold text-center m-auto pb-6">Your Space</h2>
    </div>
    <div className="grid grid-flow-col gap-10 lg:gap-40 mx-10">
      <a className="link link-hover hover:text-teal-600 bg-yellow-100 text-center p-3 rounded-md" href="#about-us">About us</a>
      <a className="link link-hover hover:text-teal-600 bg-yellow-100 text-center p-3 rounded-md" href="#support">Support</a>
      <a className="link link-hover hover:text-teal-600 bg-yellow-100 text-center p-3 rounded-md" href="#my-account">My Account</a>
    </div>
    <div>
      
    </div>
  </footer>
  </section>
  )
}
