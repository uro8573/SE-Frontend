'use client'
import Image from 'next/image';
import { Button, Input, Rating } from '@mui/material';
import Link from 'next/link';
import { useState } from 'react';
import { useEffect } from 'react';
import getHotel from '@/libs/getHotel';
import { useSession } from 'next-auth/react';
import { ToastContainer, toast } from 'react-toastify'
import addRating from '@/libs/addRating';
import { Hotel, HotelItem, ReviewItem ,Review } from '../../../../../../interfaces';
import { ArrowLeft, ChevronDown, MapPin, Star, Wifi, Bed, Bath, Maximize } from "lucide-react"
import getReviewWithHotelID from '@/libs/getReviewWithHotelID';
import addBooking from '@/libs/addBooking';
import createReview from '@/libs/createReview';


export default function ItemPage({ params }: { params: { id: number } }) {
  const { data: session } = useSession();

  const [hotel, setHotel] = useState<Hotel>();
  const [item, setItem] = useState<HotelItem | null>(null);
  const [loading, setLoading] = useState(true);
  const [reviews, setReview] = useState<Review[] | null>(null);

  const [avgRating, setAvgRating] = useState(0);

  const [newReview, setNewReview] = useState('');
  const [newRating, setNewRating] = useState<number>(0);

  const [guestCount, setGuestCount] = useState(2);
  const [roomCount, setRoomCount] = useState(1);
  const [checkInDate, setCheckInDate] = useState("2024-12-22");
  const [checkOutDate, setCheckOutDate] = useState("2024-12-24");


  useEffect(() => {
    const fetchItem = async () => {
      try {
        const response = await getHotel(params.id);
        if (!response) throw new Error("Failed to fetch hotel");
  
        const hotelData = response.data;
        setHotel(hotelData);
        setItem(response);
  
        if (!session?.user.token) throw new Error("User token is undefined");
  
        const response2 = await getReviewWithHotelID(session.user.token, hotelData.id);
        const reviewsData = response2.data;
  
        setReview(reviewsData);
  
        const ratingSum = reviewsData.reduce((sum: number, r: Review) => sum + r.rating, 0);
        const avgRatingCalc = reviewsData.length > 0 ? ratingSum / reviewsData.length : 0;
        setAvgRating(avgRatingCalc);
  
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
  
    fetchItem();
  }, [params.id, session?.user.token]);
  

    //if(loading || !item) return ( <div></div> )

    // const alert = async () => {
    //     if(!session) {
    //         toast.error("You must authorized first!!");
    //         return;
    //     }
    //     if(rating < 1 || rating > 5) {
    //         toast.warn("Rating value must between 1 and 5.");
    //         return;
    //     }
    //     const response = await addRating(params.id, rating, session?.user.token);
    //     if(response.success == true) {
    //         toast.success("Rating Successfully!");
    //     } else toast.error("Error occured while rating this hotel.");
    // }

    if (!hotel) {
        return <div className="flex justify-center items-center h-screen">Loading...</div>;
    }
    
    const handleReview = async () => {
      if (!session?.user?.token || !hotel?.id) {
        toast.error("You must be signed in to review.");
        return;
      }

      alert (newRating)

      try {

        const result = await createReview(
          params.id.toString(),
          session.user.token,
          newRating,
          newReview
        );

        if (result.success) {
          toast.success("Review successful!");
        } else toast.error(`${result.message}`);
          console.log(result);
      } catch (error) {
        console.error(error);
        toast.error("Review failed!");
      }
    }

    const handleBooking = async () => {
      if (!session?.user?.token || !hotel?.id) {
        toast.error("You must be signed in to book.");
        return;
      }
  
      try {
        // alert("Session: "session.user._id,)

        const result = await addBooking(
          params.id.toString(),
          session.user.token,
          guestCount,
          roomCount.toString(),
          checkInDate,
          checkOutDate
        );
        if(result.success) {
          toast.success("Booking successful!");
        } else toast.error(`${result.message}`);
        console.log(result);
      } catch (error) {
        console.error(error);
        toast.error("Booking failed!");
      }
    };

    

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
                    <h1 className="text-2xl font-bold mb-1">{hotel.name}</h1>
                    <p className="text-gray-600 mb-2">
                      hotel.description
                    </p>
        
                    <div className="flex items-center mb-4">
                      <MapPin className="h-4 w-4 text-gray-500 mr-1" />
                      <span className="text-gray-600 text-sm mr-3">{hotel.province}, {hotel.region}</span>
                      <div className="flex items-center">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        <span className="ml-1 font-medium">{avgRating}</span>
                      </div>
                    </div>
        
                    {/* Main Image */}
                    <div className="relative mb-2">
                      <Image
                        src={hotel.picture || "/placeholder.svg"}
                        alt="The Havencrest room"
                        width={600}
                        height={400}
                        className="w-full h-[300px] md:h-[400px] object-cover rounded-lg"
                      />
                    </div>
        
                    
        
                    {/* About */}
                    <div className="mb-6">
                      <h2 className="text-lg font-semibold mb-2">About</h2>
                      <p className="text-gray-600 text-sm">
                        hotel.about
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
                          <span className="text-sm">For up to {hotel.guests} Guests</span>
                        </div>
                        <div className="flex items-center w-1/2">
                          <Bath className="h-5 w-5 mr-2 text-gray-600" />
                          <span className="text-sm">1 Bathroom</span>
                        </div>
                        <div className="flex items-center w-1/2">
                          <Maximize className="h-5 w-5 mr-2 text-gray-600" />
                          <span className="text-sm">{hotel.size} Room</span>
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
                            <span className="text-xl font-bold mr-1">{avgRating}</span>
                            <span className="text-sm text-gray-500">out of 5</span>
                          </div>
                        </div>
                        <div className="flex-1 grid grid-cols-2 gap-2">
                          <div>
                            <div className="flex justify-between text-sm mb-1">
                              <span>Cleanliness</span>
                              <span>{avgRating}</span>
                            </div>
                            <div className="h-1.5 bg-gray-200 rounded-full">
                              <div className="h-full bg-yellow-400 rounded-full" style={{ width: `${(avgRating / 5) * 100}%` }}></div>
                            </div>
                          </div>
                          <div>
                            <div className="flex justify-between text-sm mb-1">
                              <span>Amenities</span>
                              <span>{avgRating}</span>
                            </div>
                            <div className="h-1.5 bg-gray-200 rounded-full">
                              <div className="h-full bg-yellow-400 rounded-full" style={{ width: `${(avgRating / 5) * 100}%` }}></div>
                            </div>
                          </div>
                          <div>
                            <div className="flex justify-between text-sm mb-1">
                              <span>Location</span>
                              <span>{avgRating}</span>
                            </div>
                            <div className="h-1.5 bg-gray-200 rounded-full">
                              <div className="h-full bg-yellow-400 rounded-full" style={{ width: `${(avgRating / 5) * 100}%` }}></div>
                            </div>
                          </div>
                          <div>
                            <div className="flex justify-between text-sm mb-1">
                              <span>Service</span>
                              <span>{avgRating}</span>
                            </div>
                            <div className="h-1.5 bg-gray-200 rounded-full">
                              <div className="h-full bg-yellow-400 rounded-full" style={{ width: `${(avgRating / 5) * 100}%` }}></div>
                            </div>
                          </div>
                        </div>
                      </div>
        
                      <div className="mb-4">
                        <div className="flex justify-between items-center mb-3">
                          <div>{reviews?.length} Reviews</div>
                          <div className="flex items-center text-sm">
                            <span>Sort By: Highest Star Rating</span>
                            <ChevronDown className="h-4 w-4 ml-1" />
                          </div>
                        </div>
        
                        {/* Write a review */}

                        <div className="pt-[10px] pb-[30px] flex flex-col">
                          <div className="flex items-center gap-3 mb-[2px]">
                            <div className="w-8 h-8 bg-gray-200 rounded-full"></div>
                            <div className="flex flex-col">
                              <span className="text-gray-500 text-sm">{session?.user.name}</span>
                              <Rating
                                name="simple-controlled"
                                value={newRating}
                                size="small"
                                onChange={(event, newValue) => {
                                    setNewRating(newValue || 0)
                                  }
                                }
                              />
                            </div>
                          </div>
                          <Input 
                          className="text-gray-500 text-sm" 
                          placeholder='Write a review'
                          value={newReview} 
                          onChange={(e) => setNewReview(e.target.value)}/>
                          <button className="bg-black text-white w-[200px] py-2 rounded-full text-sm mt-2" onClick={handleReview}>Submit Review</button>
                        </div>
        
                        {/* Reviews list */}
                     
                        {reviews && reviews.map((review, index) => (
                          <div key={index} className="mb-4">
                            <div className="flex items-center gap-3 mb-1">
                              <div className="w-8 h-8 bg-gray-200 rounded-full"></div>
                              <span className="font-medium text-sm">{review.user?.name}</span>
                            </div>

                            <div className="flex items-center gap-1 mb-1">
                              {[1, 2, 3, 4, 5].map((i) => (
                                <Star
                                  key={i}
                                  className={`h-4 w-4 ${
                                    i <= review.rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'
                                  }`}
                                />
                              ))}
                              <span className="text-sm text-gray-600 ml-2">({review.rating})</span>
                            </div>

                            <p className="text-sm text-gray-700">{review.comment}</p>
                          </div>
                        ))}
        
                        <button className="bg-black text-white w-full py-2 rounded-full text-sm mt-2">Load more</button>
                      </div>
                    </div>
                  </div>
        
                  {/* Right Column - Booking */}
                  {/* <div className="lg:w-80 text-black">
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
                        <Link href={`/checkout`}>
                            <button className="bg-black text-white w-full py-3 rounded-full font-medium">Reserve</button>
                        </Link>
                    </div>
                  </div> */}

                  {/* Right Column - Booking */}
                  <div className="lg:w-80 text-black">
                    <div className="border rounded-lg p-4 sticky top-4">
                      <h3 className="font-medium mb-3">Guest</h3>
                      <div className="flex justify-between items-center mb-3 border-b pb-3">
                        <input
                          type="number"
                          value={guestCount}
                          onChange={(e) => {
                            const value = Math.min(4, Math.max(1, Number(e.target.value)));   
                            setGuestCount(value)
                          }}
                          className="text-sm w-20 border rounded px-2 py-1"
                          min={1}
                        />
                      </div>

                      <h3 className="font-medium mb-3">Room</h3>
                      <div className="flex justify-between items-center mb-3 border-b pb-3">
                        <input
                          type="number"
                          value={roomCount}
                          onChange={(e) => {
                            const value = Math.min(4, Math.max(1, Number(e.target.value)));   
                            setRoomCount(value)
                          }}
                          className="text-sm w-20 border rounded px-2 py-1"
                          min={1}
                          max={4}
                        />
                      </div>

                      <h3 className="font-medium mb-3">Check in</h3>
                      <div className="flex justify-between items-center mb-3 border-b pb-3">
                        <input
                          type="date"
                          value={checkInDate}
                          onChange={(e) => setCheckInDate(e.target.value)}
                          className="text-sm w-full border rounded px-2 py-1"
                        />
                      </div>

                      <h3 className="font-medium mb-3">Check out</h3>
                      <div className="flex justify-between items-center mb-3 border-b pb-3">
                        <input
                          type="date"
                          value={checkOutDate}
                          onChange={(e) => setCheckOutDate(e.target.value)}
                          className="text-sm w-full border rounded px-2 py-1"
                        />
                      </div>

                      <div className="flex justify-between items-center mb-4">
                        <div className="text-sm font-medium">Pricing per night</div>
                        <div className="font-bold">$10/night</div>
                      </div>

                      <button
                        className="bg-black text-white w-full py-3 rounded-full font-medium"
                        onClick={handleBooking}
                      >
                        Reserve
                      </button>
                    </div>
                  </div>
                  <ToastContainer />
                </div>
              </div>
        
             
        </div>
    )
}