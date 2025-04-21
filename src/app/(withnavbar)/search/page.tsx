'use client'
import DateReserve from '@/components/DateReserve'
import { Select, MenuItem, TextField, SelectChangeEvent, Input, Button } from '@mui/material'
import { useState, useEffect } from 'react'
import dayjs, { Dayjs } from 'dayjs'
import { useSearchParams } from 'next/navigation'
import getHotel from '@/libs/getHotel'
import { useSession } from 'next-auth/react'
import addBooking from '@/libs/addBooking'
import { ToastContainer, toast } from 'react-toastify'
import { HotelJson, Hotel, HotelItem, Review } from '../../../../interfaces'

import Image from "next/image"
import { Star, MapPin, Users, Maximize } from "lucide-react"
import Link from "next/link";
import { Slider } from "@/components/ui/Slider"
import { Checkbox } from "@/components/ui/CheckBox"
import getHotels from '@/libs/getHotels'
import getReviewWithHotelID from "@/libs/getReviewWithHotelID"


export default function Search() {
    const searchParams = useSearchParams();
    const id = searchParams.get("id");
    
    const { data:session } = useSession();

    const [checkInDate, setCheckInDate] = useState<Dayjs|null>(null);
    const [checkOutDate, setCheckOutDate] = useState<Dayjs|null>(null);
    
    const [item, setItem] = useState<HotelItem|null>(null);
    const [loading, setLoading] = useState(true);

    const [allHotels, setAllHotels] = useState<Hotel[]>([]);
    const [displayedHotels, setDisplayedHotels] = useState<Hotel[]>([]);
    const [hotelsCount, setHotelsCount] = useState<number>(0);
    const [sortOption, setSortOption] = useState<string>("default");

    const [hotelRatings, setHotelRatings] = useState<{ [hotelId: string]: number }>({});

    if (!session?.user.token) {
      return (
        <>
          <p>Please log in to view hotels.</p>
        </>
      );
    }

    useEffect(() => {
      const fetchHotels = async () => {
        try {
          if (!session?.user.token) throw new Error("User token is undefined");
    
          const response = await getHotels();
          if (!response) throw new Error("Failed to fetch data");
          const fetchedHotels = response.data;
    
          const reviewPromises = fetchedHotels.map(hotel => 
            getReviewWithHotelID(session.user.token, hotel.id)
          );
          const reviewResults = await Promise.all(reviewPromises);
    
          const updatedHotels: Hotel[] = [];
          const ratingsMap: { [hotelId: string]: number } = {};
    
          fetchedHotels.forEach((hotel, index) => {
            const reviewData = reviewResults[index].data;
            const ratings = reviewData.map((review: Review) => review.rating);
            const ratingSum = ratings.reduce((a: number, b: number) => a + b, 0);
            const ratingCount = ratings.length;
            const avg = ratingCount > 0 ? ratingSum / ratingCount : 0;
    
            ratingsMap[hotel.id] = parseFloat(avg.toFixed(1));
            updatedHotels.push({
              ...hotel,
              userRatingCount: ratingCount,
              ratingSum: ratingSum,
            });
          });
    
          setAllHotels(updatedHotels);
          setDisplayedHotels(updatedHotels);
          setHotelsCount(response.count);
          setHotelRatings(ratingsMap);
          setLoading(false);
    
        } catch (error) {
          console.error("เกิดข้อผิดพลาดในการโหลดโรงแรม:", error);
          setLoading(false);
        }
      };
    
      fetchHotels();
    }, [session?.user.token]);
    
    useEffect(() => {
      if (allHotels.length === 0) return;
      
      let sortedHotels = [...allHotels];
      
      switch (sortOption) {
        case "star-rating":
          sortedHotels.sort((a, b) => {
            const aRating = a.userRatingCount > 0 ? a.ratingSum / a.userRatingCount : 0;
            const bRating = b.userRatingCount > 0 ? b.ratingSum / b.userRatingCount : 0;
            return bRating - aRating;
          });
          break;
          case "lowest-price":
            sortedHotels.sort((a, b) => Number(a.dailyRate) - Number(b.dailyRate));
            break;
          case "highest-price":
            sortedHotels.sort((a, b) => Number(b.dailyRate) - Number(a.dailyRate));
            break;          
          break;
        default:
          // No sorting, use original order
          break;
      }
      
      setDisplayedHotels(sortedHotels);
    }, [sortOption, allHotels]);

    const handleSortChange = (newSortOption: string) => {
      setSortOption(newSortOption);
      // No need to set loading here since we're sorting on the frontend
    };

    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);
    
    useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
        const target = event.target as HTMLElement;
        if (isDropdownOpen && !target.closest(".sort-dropdown")) {
          setIsDropdownOpen(false);
        }
      };
      
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, [isDropdownOpen]);
    
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
                <h3 className="font-medium">{hotelsCount} Hotels available</h3>
                <div className="flex items-center gap-2">
                  <span className="text-sm">Sort By:</span>
                  <div className="relative sort-dropdown">
                    <button 
                      className="flex items-center gap-1 text-sm font-medium"
                      onClick={toggleDropdown}
                    >
                      {sortOption === "default" && "Default"}
                      {sortOption === "star-rating" && "Star Rating"}
                      {sortOption === "lowest-price" && "Lowest Price"}
                      {sortOption === "highest-price" && "Highest Price"}
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
                    
                    {isDropdownOpen && (
                      <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg z-50">
                        <ul>
                          <li 
                            className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                            onClick={() => {
                              handleSortChange("default");
                              toggleDropdown();
                            }}
                          >
                            Default
                          </li>
                          <li 
                            className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                            onClick={() => {
                              handleSortChange("star-rating");
                              toggleDropdown();
                            }}
                          >
                            Star Rating
                          </li>
                          <li 
                            className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                            onClick={() => {
                              handleSortChange("lowest-price");
                              toggleDropdown();
                            }}
                          >
                            Lowest Price
                          </li>
                          <li 
                            className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                            onClick={() => {
                              handleSortChange("highest-price");
                              toggleDropdown();
                            }}
                          >
                            Highest Price
                          </li>
                        </ul>
                      </div>
                    )}
                  </div>
                </div>
              </div>
  
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {loading ? (
                  <div className="col-span-3 text-center py-8">Loading hotels...</div>
                ) : displayedHotels.length === 0 ? (
                  <div className="col-span-3 text-center py-8">No hotels found</div>
                ) : (
                  displayedHotels.map((hotel) => (
                    <Link href={`/hotel/${hotel.id}`} key={hotel.id}>
                      <div className="border border-gray-200 rounded-lg overflow-hidden">
                        <div className="relative h-48">
                          <Image src={hotel.picture} alt={hotel.name} fill className="object-cover" />
                        </div>
                        <div className="p-4">
                          <h3 className="font-bold text-lg mb-1 text-black">{hotel.name}</h3>
                          <p className="text-sm text-gray-600 mb-2">{hotel.description}</p>
                          <div className="flex items-center gap-1 mb-2">
                            <MapPin className="w-4 h-4 text-gray-500" />
                            <span className="text-sm text-black">{hotel.region}, {hotel.address}</span>
                          </div>
                          <div className="flex justify-between items-center">
                            <div className="flex items-center gap-4">
                              <div className="flex items-center gap-1">
                                <Users className="w-4 h-4 text-gray-500" />
                                <span className="text-xs text-black">{hotel.guests}</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <Maximize className="w-4 h-4 text-gray-500" />
                                <span className="text-xs text-black">{hotel.size}</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <Star className="w-4 h-4 text-yellow-400" />
                                <span className="text-xs text-black">
                                  {(hotel.userRatingCount === 0 ? 0 : (hotel.ratingSum / hotel.userRatingCount).toFixed(1))}
                                </span>
                              </div>
                            </div>
                            <div className="font-bold text-lg text-black">${hotel.dailyRate}</div>
                          </div>
                        </div>
                      </div>
                    </Link>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    )
}

// import { useState } from 'react'
// import dayjs, { Dayjs } from 'dayjs'
// import { useSearchParams } from 'next/navigation'
// import BookingList from '@/components/BookingList'
// import { useEffect } from 'react'
// import getHotel from '@/libs/getHotel'
// import { useSession } from 'next-auth/react'
// import addBooking from '@/libs/addBooking'
// import { ToastContainer, toast } from 'react-toastify'
// import { HotelJson, Hotel, HotelItem, Review } from '../../../../interfaces'

// import Image from "next/image"
// import { Star, MapPin, Users, Maximize } from "lucide-react"
// import Link from "next/link";
// import { Slider } from "@/components/ui/Slider"
// import { Checkbox } from "@/components/ui/CheckBox"
// import getHotels from '@/libs/getHotels'
// import getReviewWithHotelID from "@/libs/getReviewWithHotelID"


// export default function Search() {

//     const searchParams = useSearchParams();
//     const id = searchParams.get("id");
    
//     const { data:session } = useSession();

//     const [checkInDate, setCheckInDate] = useState<Dayjs|null>(null);
//     const [checkOutDate, setCheckOutDate] = useState<Dayjs|null>(null);
    
//     const [item, setItem] = useState<HotelItem|null>(null);
//     const [loading, setLoading] = useState(true);

//     const [hotels, setHotels] = useState<Hotel[]>([]);
//     const [hotelsCount, setHotelsCount] = useState<number>(0);

//     const [hotelRatings, setHotelRatings] = useState<{ [hotelId: string]: number }>({});

//     if (!session?.user.token) {
//       return (
//         <>
//           <p>Please log in to view hotels.</p>
//         </>
//       );
//     }

//     useEffect(() => {
//       const fetchHotels = async () => {
//         try {
//           if (!session?.user.token) throw new Error("User token is undefined");
    
//           const response = await getHotels();
//           if (!response) throw new Error("Failed to fetch data");
//           const fetchedHotels = response.data;
    
    
//           const reviewPromises = fetchedHotels.map(hotel => 
//             getReviewWithHotelID(session.user.token, hotel.id)
//           );
//           const reviewResults = await Promise.all(reviewPromises);
    
//           const updatedHotels: Hotel[] = [];
//           const ratingsMap: { [hotelId: string]: number } = {};
    
//           fetchedHotels.forEach((hotel, index) => {
//             const reviewData = reviewResults[index].data;
//             const ratings = reviewData.map((review: Review) => review.rating);
//             const ratingSum = ratings.reduce((a: number, b: number) => a + b, 0);
//             const ratingCount = ratings.length;
//             const avg = ratingCount > 0 ? ratingSum / ratingCount : 0;
    
//             ratingsMap[hotel.id] = parseFloat(avg.toFixed(1));
//             updatedHotels.push({
//               ...hotel,
//               userRatingCount: ratingCount,
//               ratingSum: ratingSum,
//             });
//           });
    
//           setHotels(updatedHotels);
//           setHotelsCount(response.count);
//           setHotelRatings(ratingsMap);
    
//         } catch (error) {
//           console.error("เกิดข้อผิดพลาดในการโหลดโรงแรม:", error);
//         }
//       };
    
//       fetchHotels();
//     }, [session?.user.token]);
    
        
//     console.log("hotels", hotels.length);
        
//        // if(loading || !item) return (<div>is loading</div>)
            
//     /*const makeBooking = async () => {
//         if(checkInDate && session && checkOutDate) {
//             const response = await addBooking(item.data._id, session.user.token, checkInDate.format("YYYY-MM-DD"), checkOutDate.format("YYYY-MM-DD"));
//             if(response.success == true) {
//                 toast.success("Booking Successfully.");
//                 window.location.search = '';
//             } else toast.error(response.message ? response.message : `An Error has occurred while booking a hotel.`);
//         } else toast.error("Invalid Date or Session.");
//     }*/
          
//     return (
//         <div className="min-h-screen bg-white text-black">
//         {/* Search Section */}
//         <div className="container mx-auto px-4 py-6">
//           <div className="flex flex-col md:flex-row gap-4 mb-8">
//             <div className="w-full md:w-1/4 p-4 border border-gray-200 rounded-lg">
//               <div className="mb-2">
//                 <label className="block text-sm font-medium mb-1">Where</label>
//                 <Input placeholder="Search location" className="w-full" />
//               </div>
//             </div>
//             <div className="w-full md:w-1/4 p-4 border border-gray-200 rounded-lg">
//               <div className="mb-2">
//                 <label className="block text-sm font-medium mb-1">Check In</label>
//                 <Input placeholder="Select check-in" className="w-full" />
//               </div>
//             </div>
//             <div className="w-full md:w-1/4 p-4 border border-gray-200 rounded-lg">
//               <div className="mb-2">
//                 <label className="block text-sm font-medium mb-1">Check Out</label>
//                 <Input placeholder="Select check-out" className="w-full" />
//               </div>
//             </div>
//             <div className="w-full md:w-1/4 p-4 border border-gray-200 rounded-lg">
//               <div className="mb-2">
//                 <label className="block text-sm font-medium mb-1">Guest</label>
//                 <Input placeholder="Number of guests" className="w-full" />
//               </div>
//             </div>
//             <div className="w-full md:w-auto flex items-end">
//               <Button className="w-full md:w-auto bg-orange-400 hover:bg-orange-500 text-white">Search</Button>
//             </div>
//           </div>
  
//           <div className="flex flex-col lg:flex-row gap-6">
//             {/* Filters */}
//             <div className="w-full lg:w-1/4 bg-gray-50 p-4 border border-gray-200 rounded-lg mb-6 lg:mb-0">
//                 <div className="flex justify-between items-center mb-4">
//                     <h3 className="font-medium text-black">Filter</h3>
//                     <button className="text-sm text-black">Reset</button>
//                 </div>

//                 {/* Price Range */}
//                 <div className="mb-6">
//                     <div className="flex items-center justify-between mb-2">
//                     <h4 className="font-medium text-black">Price Range</h4>
//                     <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
//                         <path
//                         d="M6 9L12 15L18 9"
//                         stroke="currentColor"
//                         strokeWidth="2"
//                         strokeLinecap="round"
//                         strokeLinejoin="round"
//                         />
//                     </svg>
//                     </div>
//                     <div className="flex justify-between mb-2">
//                     <span className="text-sm text-black">USD 10</span>
//                     <span className="text-sm text-black">USD 25</span>
//                     </div>
//                     <div className="px-2">
//                     <Slider defaultValue={[50]} max={100} step={1} />
//                     </div>
//                 </div>

//                 {/* Rating */}
//                 <div className="mb-6">
//                     <div className="flex items-center justify-between mb-2">
//                     <h4 className="font-medium text-black">Rating</h4>
//                     <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
//                         <path
//                         d="M6 9L12 15L18 9"
//                         stroke="currentColor"
//                         strokeWidth="2"
//                         strokeLinecap="round"
//                         strokeLinejoin="round"
//                         />
//                     </svg>
//                     </div>
//                     <div className="flex gap-4">
//                     {[2, 3, 4, 5].map((rate) => (
//                         <button key={rate} className="flex items-center gap-1 px-2 py-1 bg-gray-100 rounded-md">
//                         <span className="text-sm text-black">{rate}</span>
//                         <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
//                         </button>
//                     ))}
//                     </div>
//                 </div>

//                 {/* Location */}
//                 <div className="mb-6">
//                     <div className="flex items-center justify-between mb-2">
//                     <h4 className="font-medium text-black">Location</h4>
//                     <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
//                         <path
//                         d="M6 9L12 15L18 9"
//                         stroke="currentColor"
//                         strokeWidth="2"
//                         strokeLinecap="round"
//                         strokeLinejoin="round"
//                         />
//                     </svg>
//                     </div>
//                     <div className="space-y-2">
//                     <div className="flex items-center">
//                         <Checkbox id="siam" />
//                         <label htmlFor="siam" className="ml-2 text-sm text-black">Siam</label>
//                     </div>
//                     <div className="flex items-center">
//                         <Checkbox id="sukhumvit" />
//                         <label htmlFor="sukhumvit" className="ml-2 text-sm text-black">Sukhumvit</label>
//                     </div>
//                     <div className="flex items-center">
//                         <Checkbox id="airport" />
//                         <label htmlFor="airport" className="ml-2 text-sm text-black">Suvarnabhumi Airport</label>
//                     </div>
//                     <button className="text-sm text-black">Show All 24</button>
//                     </div>
//                 </div>

//                 {/* Property Type */}
//                 <div className="mb-6">
//                     <div className="flex items-center justify-between mb-2">
//                     <h4 className="font-medium text-black">Property Type</h4>
//                     <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
//                         <path
//                         d="M6 9L12 15L18 9"
//                         stroke="currentColor"
//                         strokeWidth="2"
//                         strokeLinecap="round"
//                         strokeLinejoin="round"
//                         />
//                     </svg>
//                     </div>
//                     <div className="space-y-2">
//                     <div className="flex items-center">
//                         <Checkbox id="hotel" />
//                         <label htmlFor="hotel" className="ml-2 text-sm text-black">Hotel</label>
//                     </div>
//                     <div className="flex items-center">
//                         <Checkbox id="homes" />
//                         <label htmlFor="homes" className="ml-2 text-sm text-black">Homes & apts</label>
//                     </div>
//                     <div className="flex items-center">
//                         <Checkbox id="serviced" />
//                         <label htmlFor="serviced" className="ml-2 text-sm text-black">Serviced apartment</label>
//                     </div>
//                     <button className="text-sm text-black">Show All 13</button>
//                     </div>
//                 </div>

//                 {/* Bed Type */}
//                 <div className="mb-6">
//                     <div className="flex items-center justify-between mb-2">
//                     <h4 className="font-medium text-black">Bed Type</h4>
//                     <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
//                         <path
//                         d="M6 9L12 15L18 9"
//                         stroke="currentColor"
//                         strokeWidth="2"
//                         strokeLinecap="round"
//                         strokeLinejoin="round"
//                         />
//                     </svg>
//                     </div>
//                     <div className="space-y-2">
//                     <div className="flex items-center">
//                         <Checkbox id="double" />
//                         <label htmlFor="double" className="ml-2 text-sm text-black">1 Double Bed</label>
//                     </div>
//                     <div className="flex items-center">
//                         <Checkbox id="beds" />
//                         <label htmlFor="beds" className="ml-2 text-sm text-black">2 Beds</label>
//                     </div>
//                     <div className="flex items-center">
//                         <Checkbox id="single" />
//                         <label htmlFor="single" className="ml-2 text-sm text-black">1 Single Bed</label>
//                     </div>
//                     <button className="text-sm text-black">Show All 6</button>
//                     </div>
//                 </div>
//             </div>
            
  
//             {/* Hotel Listings */}
//             <div className="w-full lg:w-3/4 text-black">
//               <div className="flex justify-between items-center mb-4">
//                 <h3 className="font-medium">{hotelsCount} Hotels available</h3>
//                 <div className="flex items-center gap-2">
//                   <span className="text-sm">Sort By:</span>
//                   <button className="flex items-center gap-1 text-sm font-medium">
//                     Default
//                     <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
//                       <path
//                         d="M6 9L12 15L18 9"
//                         stroke="currentColor"
//                         strokeWidth="2"
//                         strokeLinecap="round"
//                         strokeLinejoin="round"
//                       />
//                     </svg>
//                   </button>
//                 </div>
//               </div>
  
//               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">

//               {hotels.length === 0 ? (
//                       <p>กำลังโหลดข้อมูลโรงแรม...</p>
//                     ) : (
//                       hotels.map((hotel) => (
//                         <Link href={`/hotel/${hotel.id}`}>
//                           <div key={hotel._id} className="border border-gray-200 rounded-lg overflow-hidden">
//                             <div className="relative h-48">
//                                 <Image src={hotel.picture} alt={hotel.name} fill className="object-cover" />
//                               </div>
//                               <div className="p-4">
//                                 <h3 className="font-bold text-lg mb-1 text-black">{hotel.name}</h3>
//                                 <p className="text-sm text-gray-600 mb-2">{hotel.description}</p>
//                                 <div className="flex items-center gap-1 mb-2">
//                                     <MapPin className="w-4 h-4 text-gray-500" />
//                                     <span className="text-sm text-black">{hotel.region}, {hotel.address}</span>
//                                 </div>
//                                 <div className="flex justify-between items-center">
//                                   <div className="flex items-center gap-4">
//                                     <div className="flex items-center gap-1">
//                                       <Users className="w-4 h-4 text-gray-500" />
//                                       <span className="text-xs text-black">{hotel.guests}</span>
//                                     </div>
//                                     <div className="flex items-center gap-1">
//                                       <Maximize className="w-4 h-4 text-gray-500" />
//                                       <span className="text-xs text-black">{hotel.size}</span>
//                                     </div>
//                                     <div className="flex items-center gap-1">
//                                       <Star className="w-4 h-4 text-yellow-400" />
//                                       <span className="text-xs text-black">{(hotel.userRatingCount == 0 ? 0 : (hotel.ratingSum / hotel.userRatingCount).toFixed(1))}</span>
//                                     </div>
//                                 </div>
//                                 <div className="font-bold text-lg text-black">${hotel.dailyRate}</div>
//                               </div>
//                             </div>
//                           </div>
//                         </Link>
//                     )))
//                   }
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     )

// }