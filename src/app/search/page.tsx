'use client'
import DateReserve from '@/components/DateReserve'
import { Select, MenuItem, TextField, SelectChangeEvent, Input, Button } from '@mui/material'
import { useState } from 'react'
import dayjs, { Dayjs } from 'dayjs'
import { useSearchParams } from 'next/navigation'
import BookingList from '@/components/BookingList'
import { useEffect } from 'react'
import getHotel from '@/libs/getHotel'
import { useSession } from 'next-auth/react'
import addBooking from '@/libs/addBooking'
import { ToastContainer, toast } from 'react-toastify'
import { HotelItem } from '../../../interfaces'

import Image from "next/image"
import { Star, MapPin, Users, Maximize } from "lucide-react"
import Link from "next/link";
import { Slider } from "@/components/ui/Slider"
import { Checkbox } from "@/components/ui/CheckBox"

export default function Search() {

    const searchParams = useSearchParams();
    const id = searchParams.get("id");
    
    //const { data:session } = useSession();

    const [checkInDate, setCheckInDate] = useState<Dayjs|null>(null);
    const [checkOutDate, setCheckOutDate] = useState<Dayjs|null>(null);
    
   /* if(!session) return ( <div className="text-black text-xl text-center">You must Login first to view this page.</div> )
    
        const [item, setItem] = useState<HotelItem|null>(null);
        const [loading, setLoading] = useState(true);
        
        useEffect(() => {
            if(!id) {
                setLoading(false);
                return;
            }
            const fetchItems = async () => {
                try {
                    const response = await getHotel(id);
                    
                    if(!response) throw new Error("Failed to fetch data.");
                    
                    setItem(response);
                    
                } catch(err) {
                    console.error(err);
                } finally {
                    setLoading(false);
                }
            }
            
            fetchItems();
            
        }, []);
        
        if(!id){
            return (
                <div>
                    <BookingList/>
                </div>
            );
        } 
        
        if(loading || !item) return (<div></div>)
            
    const makeBooking = async () => {
        if(checkInDate && session && checkOutDate) {
            const response = await addBooking(item.data._id, session.user.token, checkInDate.format("YYYY-MM-DD"), checkOutDate.format("YYYY-MM-DD"));
            if(response.success == true) {
                toast.success("Booking Successfully.");
                window.location.search = '';
            } else toast.error(response.message ? response.message : `An Error has occurred while booking a hotel.`);
        } else toast.error("Invalid Date or Session.");
    }*/

        const mockHotels = [
            {
              id: 1,
              name: "The Havencrest",
              description: "A serene escape nestled above the city skyline, offering luxury with a view.",
              location: "Bangkok",
              guests: 4,
              size: "Large",
              price: 10.99,
              image: "/placeholder.svg?height=300&width=400",
            },
            {
              id: 2,
              name: "Urban Oasis",
              description: "Modern comforts in the heart of the city, ideal for business and leisure.",
              location: "Bangkok",
              guests: 2,
              size: "Medium",
              price: 15.50,
              image: "/placeholder.svg?height=300&width=400",
            },
            {
              id: 3,
              name: "Skyview Retreat",
              description: "Panoramic skyline views with minimalist luxury decor.",
              location: "Bangkok",
              guests: 3,
              size: "Large",
              price: 18.75,
              image: "/placeholder.svg?height=300&width=400",
            },
            {
              id: 4,
              name: "Riverside Comfort",
              description: "Peaceful riverside ambiance with elegant interiors.",
              location: "Bangkok",
              guests: 4,
              size: "Extra Large",
              price: 22.00,
              image: "/placeholder.svg?height=300&width=400",
            },
            {
              id: 5,
              name: "Heritage Haven",
              description: "Charming traditional decor meets modern amenities.",
              location: "Bangkok",
              guests: 2,
              size: "Small",
              price: 9.99,
              image: "/placeholder.svg?height=300&width=400",
            },
            {
              id: 6,
              name: "Metro Luxe",
              description: "Stylish studio with quick access to transport hubs.",
              location: "Bangkok",
              guests: 2,
              size: "Medium",
              price: 13.45,
              image: "/placeholder.svg?height=300&width=400",
            },
          ];
          
    return (
        <div className="min-h-screen bg-white text-black">
        {/* Search Section */}
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row gap-4 mb-8">
            <div className="w-full md:w-1/4 p-4 border border-gray-200 rounded-lg">
              <div className="mb-2">
                <label className="block text-sm font-medium mb-1">Where</label>
                <Input placeholder="Search location" className="w-full" />
              </div>
            </div>
            <div className="w-full md:w-1/4 p-4 border border-gray-200 rounded-lg">
              <div className="mb-2">
                <label className="block text-sm font-medium mb-1">Check In</label>
                <Input placeholder="Select check-in" className="w-full" />
              </div>
            </div>
            <div className="w-full md:w-1/4 p-4 border border-gray-200 rounded-lg">
              <div className="mb-2">
                <label className="block text-sm font-medium mb-1">Check Out</label>
                <Input placeholder="Select check-out" className="w-full" />
              </div>
            </div>
            <div className="w-full md:w-1/4 p-4 border border-gray-200 rounded-lg">
              <div className="mb-2">
                <label className="block text-sm font-medium mb-1">Guest</label>
                <Input placeholder="Number of guests" className="w-full" />
              </div>
            </div>
            <div className="w-full md:w-auto flex items-end">
              <Button className="w-full md:w-auto bg-orange-400 hover:bg-orange-500 text-white">Search</Button>
            </div>
          </div>
  
          <div className="flex flex-col lg:flex-row gap-6">
            {/* Filters */}
            <div className="w-full lg:w-1/4 bg-gray-50 p-4 border border-gray-200 rounded-lg mb-6 lg:mb-0">
                <div className="flex justify-between items-center mb-4">
                    <h3 className="font-medium text-black">Filter</h3>
                    <button className="text-sm text-black">Reset</button>
                </div>

                {/* Price Range */}
                <div className="mb-6">
                    <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium text-black">Price Range</h4>
                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                        d="M6 9L12 15L18 9"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        />
                    </svg>
                    </div>
                    <div className="flex justify-between mb-2">
                    <span className="text-sm text-black">USD 10</span>
                    <span className="text-sm text-black">USD 25</span>
                    </div>
                    <div className="px-2">
                    <Slider defaultValue={[50]} max={100} step={1} />
                    </div>
                </div>

                {/* Rating */}
                <div className="mb-6">
                    <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium text-black">Rating</h4>
                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                        d="M6 9L12 15L18 9"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        />
                    </svg>
                    </div>
                    <div className="flex gap-4">
                    {[2, 3, 4, 5].map((rate) => (
                        <button key={rate} className="flex items-center gap-1 px-2 py-1 bg-gray-100 rounded-md">
                        <span className="text-sm text-black">{rate}</span>
                        <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                        </button>
                    ))}
                    </div>
                </div>

                {/* Location */}
                <div className="mb-6">
                    <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium text-black">Location</h4>
                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                        d="M6 9L12 15L18 9"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        />
                    </svg>
                    </div>
                    <div className="space-y-2">
                    <div className="flex items-center">
                        <Checkbox id="siam" />
                        <label htmlFor="siam" className="ml-2 text-sm text-black">Siam</label>
                    </div>
                    <div className="flex items-center">
                        <Checkbox id="sukhumvit" />
                        <label htmlFor="sukhumvit" className="ml-2 text-sm text-black">Sukhumvit</label>
                    </div>
                    <div className="flex items-center">
                        <Checkbox id="airport" />
                        <label htmlFor="airport" className="ml-2 text-sm text-black">Suvarnabhumi Airport</label>
                    </div>
                    <button className="text-sm text-black">Show All 24</button>
                    </div>
                </div>

                {/* Property Type */}
                <div className="mb-6">
                    <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium text-black">Property Type</h4>
                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                        d="M6 9L12 15L18 9"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        />
                    </svg>
                    </div>
                    <div className="space-y-2">
                    <div className="flex items-center">
                        <Checkbox id="hotel" />
                        <label htmlFor="hotel" className="ml-2 text-sm text-black">Hotel</label>
                    </div>
                    <div className="flex items-center">
                        <Checkbox id="homes" />
                        <label htmlFor="homes" className="ml-2 text-sm text-black">Homes & apts</label>
                    </div>
                    <div className="flex items-center">
                        <Checkbox id="serviced" />
                        <label htmlFor="serviced" className="ml-2 text-sm text-black">Serviced apartment</label>
                    </div>
                    <button className="text-sm text-black">Show All 13</button>
                    </div>
                </div>

                {/* Bed Type */}
                <div className="mb-6">
                    <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium text-black">Bed Type</h4>
                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                        d="M6 9L12 15L18 9"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        />
                    </svg>
                    </div>
                    <div className="space-y-2">
                    <div className="flex items-center">
                        <Checkbox id="double" />
                        <label htmlFor="double" className="ml-2 text-sm text-black">1 Double Bed</label>
                    </div>
                    <div className="flex items-center">
                        <Checkbox id="beds" />
                        <label htmlFor="beds" className="ml-2 text-sm text-black">2 Beds</label>
                    </div>
                    <div className="flex items-center">
                        <Checkbox id="single" />
                        <label htmlFor="single" className="ml-2 text-sm text-black">1 Single Bed</label>
                    </div>
                    <button className="text-sm text-black">Show All 6</button>
                    </div>
                </div>
            </div>
            
  
            {/* Hotel Listings */}
            <div className="w-full lg:w-3/4 text-black">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-medium">17 Hotels available</h3>
                <div className="flex items-center gap-2">
                  <span className="text-sm">Sort By:</span>
                  <button className="flex items-center gap-1 text-sm font-medium">
                    Default
                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path
                        d="M6 9L12 15L18 9"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </button>
                </div>
              </div>
  
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {mockHotels.map((hotel) => (
                        <div key={hotel.id} className="border border-gray-200 rounded-lg overflow-hidden">
                            <div className="relative h-48">
                            <Image src={hotel.image} alt={hotel.name} fill className="object-cover" />
                            </div>
                            <div className="p-4">
                            <h3 className="font-bold text-lg mb-1 text-black">{hotel.name}</h3>
                            <p className="text-sm text-gray-600 mb-2">{hotel.description}</p>
                            <div className="flex items-center gap-1 mb-2">
                                <MapPin className="w-4 h-4 text-gray-500" />
                                <span className="text-sm text-black">{hotel.location}</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <div className="flex items-center gap-4">
                                <div className="flex items-center gap-1">
                                    <Users className="w-4 h-4 text-gray-500" />
                                    <span className="text-xs text-black">{hotel.guests}</span>
                                </div>
                                <Link href={`/hotel/${hotel.id}`}>
                                    <div className="flex items-center gap-1">
                                        
                                            <Maximize className="w-4 h-4 text-gray-500" />
                                            <span className="text-xs text-black">{hotel.size}</span>
                                        
                                    </div>
                                </Link>
                                </div>
                                <div className="font-bold text-lg text-black">${hotel.price.toFixed(2)}</div>
                            </div>
                            </div>
                        </div>
                    ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    )

}