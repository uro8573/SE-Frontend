'use client'
import Image from 'next/image';
import { Button, Rating } from '@mui/material';
import Link from 'next/link';
import { useState } from 'react';
import { useEffect } from 'react';
import getHotel from '@/libs/getHotel';
import { useSession } from 'next-auth/react';
import { ToastContainer, toast } from 'react-toastify'
import addRating from '@/libs/addRating';
import { HotelItem } from '../../../../../../interfaces';
import { ArrowLeft, ChevronDown, MapPin, Star, Wifi, Bed, Bath, Maximize } from "lucide-react"


export default function itemPage({params}:{params: {id: string}}) {

    //const { data:session } = useSession();

    const [item, setItem] = useState<HotelItem|null>(null);
    const [loading, setLoading] = useState(true);
    const [rating, setRating] = useState(0);

    useEffect(() => {
        const fetchitem = async () => {
            try {
                const response = await getHotel(params.id);

                if(!response) throw new Error("Failed to fetch data.");

                setItem(response);
                
            } catch(err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        }

        fetchitem();

    }, []);

    /*if(loading || !item) return ( <div></div> )

    const alert = async () => {
        if(!session) {
            toast.error("You must authorized first!!");
            return;
        }
        if(rating < 1 || rating > 5) {
            toast.warn("Rating value must between 1 and 5.");
            return;
        }
        const response = await addRating(params.id, rating, session?.user.token);
        if(response.success == true) {
            toast.success("Rating Successfully!");
        } else toast.error("Error occured while rating this hotel.");
    }*/

        return (
            <div className="max-w-7xl mx-auto text-black">
              
        
              {/* Breadcrumb */}
              <div className="p-4">
                <div className="flex items-center text-sm mb-4">
                  <Link href="/search" className="flex items-center text-gray-500">
                    <ArrowLeft className="h-4 w-4 mr-1" />
                    Search
                  </Link>
                  <span className="mx-2 text-gray-400">{"•"}</span>
                  <span className='text-gray-400'>Details</span>
                </div>
        
                {/* Main Content */}
                <div className="flex flex-col lg:flex-row gap-6">
                  {/* Left Column */}
                  <div className="flex-1">
                    <h1 className="text-2xl font-bold mb-1">The Havencrest</h1>
                    <p className="text-gray-600 mb-2">
                      A serene escape nestled along the city skyline, offering luxury with a view.
                    </p>
        
                    <div className="flex items-center mb-4">
                      <MapPin className="h-4 w-4 text-gray-500 mr-1" />
                      <span className="text-gray-600 text-sm mr-3">Bangkok, Thailand</span>
                      <div className="flex items-center">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        <span className="ml-1 font-medium">4.8</span>
                      </div>
                    </div>
        
                    {/* Main Image */}
                    <div className="relative mb-2">
                      <Image
                        src="/placeholder.svg?height=400&width=600"
                        alt="The Havencrest room"
                        width={600}
                        height={400}
                        className="w-full h-[300px] md:h-[400px] object-cover rounded-lg"
                      />
                    </div>
        
                    {/* Thumbnails */}
                    <div className="flex gap-2 mb-6 overflow-x-auto">
                      {[1, 2, 3, 4].map((i) => (
                        <Image
                          key={i}
                          src="/placeholder.svg?height=100&width=100"
                          alt={`Thumbnail ${i}`}
                          width={100}
                          height={100}
                          className="w-24 h-20 object-cover rounded-lg"
                        />
                      ))}
                    </div>
        
                    {/* About */}
                    <div className="mb-6">
                      <h2 className="text-lg font-semibold mb-2">About</h2>
                      <p className="text-gray-600 text-sm">
                        A serene oasis nestled high above the bustling city skyline, this luxurious haven offers an unparalleled
                        blend of tranquility and convenience, where every detail is thoughtfully designed to elevate your
                        experience and every amenity makes it a memorable panoramic view.
                      </p>
                    </div>
        
                    {/* Facilities */}
                    <div className="mb-6">
                      <h2 className="text-lg font-semibold mb-3">Facilities</h2>
                      <div className="flex flex-wrap gap-y-3">
                        <div className="flex items-center w-1/2">
                          <Wifi className="h-5 w-5 mr-2 text-gray-600" />
                          <span className="text-sm">Free WiFi</span>
                        </div>
                        <div className="flex items-center w-1/2">
                          <Bed className="h-5 w-5 mr-2 text-gray-600" />
                          <span className="text-sm">1-2 Bedroom</span>
                        </div>
                        <div className="flex items-center w-1/2">
                          <Bath className="h-5 w-5 mr-2 text-gray-600" />
                          <span className="text-sm">1 Bathroom</span>
                        </div>
                        <div className="flex items-center w-1/2">
                          <Maximize className="h-5 w-5 mr-2 text-gray-600" />
                          <span className="text-sm">Large Room</span>
                        </div>
                      </div>
                    </div>
        
                    {/* Reviews */}
                    <div className="mb-6">
                      <h2 className="text-lg font-semibold mb-3">Reviews</h2>
                      <div className="flex items-center mb-2">
                        <div className="mr-4">
                          <div className="font-semibold">Excellent</div>
                          <div className="flex items-center">
                            <span className="text-xl font-bold mr-1">4.6</span>
                            <span className="text-sm text-gray-500">out of 5</span>
                          </div>
                          <div className="text-sm text-gray-500">120 Ratings</div>
                        </div>
                        <div className="flex-1 grid grid-cols-2 gap-2">
                          <div>
                            <div className="flex justify-between text-sm mb-1">
                              <span>Cleanliness</span>
                              <span>4.7</span>
                            </div>
                            <div className="h-1.5 bg-gray-200 rounded-full">
                              <div className="h-full bg-yellow-400 rounded-full" style={{ width: "94%" }}></div>
                            </div>
                          </div>
                          <div>
                            <div className="flex justify-between text-sm mb-1">
                              <span>Amenities</span>
                              <span>4.5</span>
                            </div>
                            <div className="h-1.5 bg-gray-200 rounded-full">
                              <div className="h-full bg-yellow-400 rounded-full" style={{ width: "90%" }}></div>
                            </div>
                          </div>
                          <div>
                            <div className="flex justify-between text-sm mb-1">
                              <span>Location</span>
                              <span>4.7</span>
                            </div>
                            <div className="h-1.5 bg-gray-200 rounded-full">
                              <div className="h-full bg-yellow-400 rounded-full" style={{ width: "94%" }}></div>
                            </div>
                          </div>
                          <div>
                            <div className="flex justify-between text-sm mb-1">
                              <span>Service</span>
                              <span>4.7</span>
                            </div>
                            <div className="h-1.5 bg-gray-200 rounded-full">
                              <div className="h-full bg-yellow-400 rounded-full" style={{ width: "94%" }}></div>
                            </div>
                          </div>
                        </div>
                      </div>
        
                      <div className="mb-4">
                        <div className="flex justify-between items-center mb-3">
                          <div>17 Reviews</div>
                          <div className="flex items-center text-sm">
                            <span>Sort By: Highest Star Rating</span>
                            <ChevronDown className="h-4 w-4 ml-1" />
                          </div>
                        </div>
        
                        {/* Write a review */}
                        <div className="flex items-center gap-3 mb-4">
                          <div className="w-8 h-8 bg-gray-200 rounded-full"></div>
                          <span className="text-gray-500 text-sm">@Username</span>
                        </div>
                        <div className="border rounded-lg p-3 mb-4">
                          <span className="text-gray-500 text-sm">Write a review</span>
                        </div>
        
                        {/* Reviews list */}
                        {[
                          {
                            username: "@johnjones22",
                            rating: 5,
                            comment:
                              "Super convenient location! Room was clean and cozy, perfect for working during the day and exploring the city at night.",
                          },
                          {
                            username: "@skyline_dreamer",
                            rating: 5,
                            comment:
                              "Those views are unreal — we watched the sunset from our balcony and felt like we were floating. Total luxury, worth every penny.",
                          },
                          {
                            username: "@travelgenius",
                            rating: 5,
                            comment:
                              "This place feels like staying in a romantic novel. The vintage decor is gorgeous, and the staff made our anniversary weekend extra special.",
                          },
                        ].map((review, index) => (
                          <div key={index} className="mb-4">
                            <div className="flex items-center gap-3 mb-1">
                              <div className="w-8 h-8 bg-gray-200 rounded-full"></div>
                              <span className="font-medium text-sm">{review.username}</span>
                            </div>
                            <div className="flex mb-1">
                              {Array(5)
                                .fill(0)
                                .map((_, i) => (
                                  <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                                ))}
                            </div>
                            <p className="text-sm text-gray-700">{review.comment}</p>
                          </div>
                        ))}
        
                        <button className="bg-black text-white w-full py-2 rounded-full text-sm mt-2">Load more</button>
                      </div>
                    </div>
                  </div>
        
                  {/* Right Column - Booking */}
                  <div className="lg:w-80 text-black">
                    <div className="border rounded-lg p-4 sticky top-4">
                      <h3 className="font-medium mb-3">Guest</h3>
                      <div className="flex justify-between items-center mb-3 border-b pb-3">
                        <div className="text-sm">2 Person</div>
                        <button className="p-1 rounded-full border">
                          <ChevronDown className="h-4 w-4" />
                        </button>
                      </div>
        
                      <h3 className="font-medium mb-3">Room</h3>
                      <div className="flex justify-between items-center mb-3 border-b pb-3">
                        <div className="text-sm">1 Room</div>
                        <button className="p-1 rounded-full border">
                          <ChevronDown className="h-4 w-4" />
                        </button>
                      </div>
        
                      <h3 className="font-medium mb-3">Check in</h3>
                      <div className="flex justify-between items-center mb-3 border-b pb-3">
                        <div className="text-sm">22 December 2024</div>
                        <button className="p-1 rounded-full border">
                          <ChevronDown className="h-4 w-4" />
                        </button>
                      </div>
        
                      <h3 className="font-medium mb-3">Check out</h3>
                      <div className="flex justify-between items-center mb-3 border-b pb-3">
                        <div className="text-sm">24 December 2024</div>
                        <button className="p-1 rounded-full border">
                          <ChevronDown className="h-4 w-4" />
                        </button>
                      </div>
        
                    <div className="flex justify-between items-center mb-4">
                        <div className="text-sm font-medium">Pricing per night</div>
                        <div className="font-bold">$10/night</div>
                    </div>
                        <Link href={`/`}>
                            <button className="bg-black text-white w-full py-3 rounded-full font-medium">Reserve</button>
                        </Link>
                    </div>
                  </div>
                </div>
              </div>
        
             
        </div>
    )
}