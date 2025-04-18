'use client'
import Image from 'next/image';
import { useRouter } from 'next/navigation'

export default function Banner() {

    const router = useRouter();

    return (
        <section className="relative h-[90vh] bg-cover bg-center" style={{ backgroundImage: 'url(/images/hero.jpg)' }}>
        <div className="absolute inset-0 bg-black/40 flex flex-col justify-center items-center text-white px-4 text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            Find The Room<br />That Feels Just Right
          </h1>
          <div className="bg-white rounded-xl shadow-md p-2 w-full max-w-5xl grid grid-cols-5 items-center text-black overflow-hidden">
            {/* Where */}
            <div className="flex flex-col px-3 py-2 border-r items-start w-full">
              <label className="text-sm font-semibold mb-6">Where</label>
              
              <input
                type="text"
                placeholder="Search Location"
                className="text-sm font-normal text-gray-900 placeholder-gray-500 bg-white w-full focus:outline-none"
              />
            </div>

            {/* Check In */}
            <div className="flex flex-col px-3 py-2 border-r items-start w-full">
              <label className="text-sm font-semibold mb-1 ">Check In</label>
              <input type="date" className="border p-2 rounded bg-gray-300" />
            </div>

            {/* Check Out */}
            <div className="flex flex-col px-3 py-2 border-r items-start w-full">
              <label className="text-sm font-semibold mb-1">Check Out</label>
              <input type="date" className="border p-2 rounded bg-gray-300" />
            </div>

            {/* Guest */}
            <div className="flex flex-col px-3 py-2 border-r items-start w-full">
              <label className="text-sm font-semibold mb-6">Guest</label>
              <input
                type="number"
                placeholder="Number of Guests"
                className="text-sm font-normal text-gray-900 placeholder-gray-500 bg-white w-full focus:outline-none "
              />
            </div>

            {/* Search Button */}
            <div className="flex items-center justify-center px-3 w-full">
              <button className="w-full bg-orange-400 hover:bg-orange-500 text-white font-semibold py-3 px-4 rounded-xl">
                Search
              </button>
            </div>
          </div>

        </div>
      </section>
    )
}