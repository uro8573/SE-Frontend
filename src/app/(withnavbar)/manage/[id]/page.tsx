'use client'
import Image from 'next/image';
import { Button, Rating } from '@mui/material';
import Link from 'next/link';
import { useState } from 'react';
import { useEffect } from 'react';
import getBooking from '@/libs/getBooking';
import { useSession } from 'next-auth/react';
import { ToastContainer, toast } from 'react-toastify'
import addRating from '@/libs/addRating';
import { HotelItem } from '../../../../../interfaces';
import { ArrowLeft, ChevronDown, MapPin, Star, Wifi, Bed, Bath, Maximize ,Edit, ChevronLeft } from "lucide-react"
import { Suspense } from 'react';
import { LinearProgress } from '@mui/material';

export default function itemPage({params}:{params: {id: string}}) {

    const { data:session } = useSession();

    const [item, setItem] = useState<HotelItem|null>(null);
    const [loading, setLoading] = useState(true);
    const [rating, setRating] = useState(0);

    if(!session) return (<div>You must login to view this page.</div>)

    useEffect(() => {
        const fetchBooking = async () => {
            try {
                const response = await getBooking(session?.user.token, params.id);

                if(!response) throw new Error("Failed to fetch data.");

                setItem(response);
                console.log("fetch successfully");
            } catch(err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        }

        fetchBooking();

    }, []);

    // if(loading || !item) return ( <div></div> )

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

        return (
            
                <div className="container mx-auto px-4 py-8 max-w-7xl text-black">
                    {/* Breadcrumb */}
                    <div className="flex items-center gap-2 text-sm mb-6">
                        <Link href="/manage" className="flex items-center gap-1 text-gray-600">
                        <ChevronLeft className="h-4 w-4" />
                        Manage
                        </Link>
                        <span className="text-gray-400">•</span>
                        <span className="font-medium">Details</span>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        <div className="lg:col-span-2">
                        {/* Hotel Header */}
                        <h1 className="text-3xl font-bold mb-2">The Havencrest</h1>
                        <p className="text-gray-600 mb-2">
                            A serene escape nestled above the city skyline, offering luxury with a view.
                        </p>

                        <div className="flex items-center gap-2 mb-6">
                            <div className="flex items-center gap-1">
                            <MapPin className="h-4 w-4 text-gray-500" />
                            <span className="text-gray-600">Bangkok, Thailand</span>
                            </div>
                            <div className="flex items-center gap-1">
                            <span>4.6</span>
                            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                            </div>
                        </div>

                        {/* Main Image */}
                        <div className="mb-4">
                            <div className="relative h-[400px] w-full rounded-lg overflow-hidden">
                            <Image src="/placeholder.svg?height=600&width=800" alt="Hotel room" fill className="object-cover" />
                            </div>
                        </div>

                        {/* Thumbnail Images */}
                        <div className="grid grid-cols-4 gap-2 mb-8">
                            {[1, 2, 3, 4].map((_, index) => (
                            <div key={index} className="relative h-24 rounded-lg overflow-hidden cursor-pointer">
                                <Image
                                src="/placeholder.svg?height=150&width=200"
                                alt={`Hotel room thumbnail ${index + 1}`}
                                fill
                                className="object-cover"
                                />
                            </div>
                            ))}
                        </div>

                        {/* About */}
                        <div className="mb-8">
                            <h2 className="text-xl font-bold mb-4">About</h2>
                            <p className="text-gray-600">
                            A serene escape nestled high above the bustling city skyline, this luxurious haven offers an unparalleled
                            blend of tranquility and sophistication, where every detail is thoughtfully designed to elevate your
                            experience and every window frames a breathtaking panoramic view.
                            </p>
                        </div>

                        {/* Facilities */}
                        <div className="mb-8">
                            <h2 className="text-xl font-bold mb-4">Facilities</h2>
                            <div className="flex flex-wrap gap-2">
                            <div className="flex items-center gap-2 bg-gray-100 px-3 py-2 rounded-full">
                                <Wifi className="h-4 w-4" />
                                <span className="text-sm">Free Wifi</span>
                            </div>
                            <div className="flex items-center gap-2 bg-gray-100 px-3 py-2 rounded-full">
                                <Bed className="h-4 w-4" />
                                <span className="text-sm">2 Bedroom</span>
                            </div>
                            <div className="flex items-center gap-2 bg-gray-100 px-3 py-2 rounded-full">
                                <Bath className="h-4 w-4" />
                                <span className="text-sm">1 Bathroom</span>
                            </div>
                            <div className="flex items-center gap-2 bg-gray-100 px-3 py-2 rounded-full">
                                <Maximize className="h-4 w-4" />
                                <span className="text-sm">Large Room</span>
                            </div>
                            </div>
                        </div>

                        {/* Reviews */}
                        <div>
                            <div className="flex justify-between items-center mb-4">
                            <h2 className="text-xl font-bold">Reviews</h2>
                            <div className="flex items-center gap-2">
                                <span className="text-sm">Sort By:</span>
                                <button className="flex items-center gap-1 text-sm font-medium">
                                Highest Star Rating
                                <ChevronDown className="h-4 w-4" />
                                </button>
                            </div>
                            </div>

                            <div className="flex items-center gap-4 mb-6">
                            <div>
                                <div className="text-3xl font-bold">4.6</div>
                                <div className="text-sm text-gray-500">out of 5</div>
                                <div className="flex mt-1">
                                {[1, 2, 3, 4, 5].map((_, index) => (
                                    <Star
                                    key={index}
                                    className={`h-4 w-4 ${index < 4 ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`}
                                    />
                                ))}
                                </div>
                                <div className="text-xs text-gray-500 mt-1">120 Ratings</div>
                            </div>

                            <div className="flex-1 space-y-2">
                                <div>
                                <div className="flex justify-between text-sm mb-1">
                                    <span>Cleanliness</span>
                                    <span>4.7</span>
                                </div>
                                <div className="h-2 bg-gray-200 rounded-full">
                                    <div className="h-2 bg-yellow-400 rounded-full" style={{ width: "94%" }}></div>
                                </div>
                                </div>
                                <div>
                                <div className="flex justify-between text-sm mb-1">
                                    <span>Location</span>
                                    <span>4.7</span>
                                </div>
                                <div className="h-2 bg-gray-200 rounded-full">
                                    <div className="h-2 bg-yellow-400 rounded-full" style={{ width: "94%" }}></div>
                                </div>
                                </div>
                                <div>
                                <div className="flex justify-between text-sm mb-1">
                                    <span>Amenities</span>
                                    <span>4.5</span>
                                </div>
                                <div className="h-2 bg-gray-200 rounded-full">
                                    <div className="h-2 bg-yellow-400 rounded-full" style={{ width: "90%" }}></div>
                                </div>
                                </div>
                                <div>
                                <div className="flex justify-between text-sm mb-1">
                                    <span>Service</span>
                                    <span>4.7</span>
                                </div>
                                <div className="h-2 bg-gray-200 rounded-full">
                                    <div className="h-2 bg-yellow-400 rounded-full" style={{ width: "94%" }}></div>
                                </div>
                                </div>
                            </div>
                            </div>

                            <div className="text-sm text-gray-600 mb-4">17 Reviews</div>

                            {/* Review Items */}
                            <div className="space-y-6">
                            <div className="flex gap-3">
                                <div className="w-10 h-10 rounded-full bg-gray-200 flex-shrink-0"></div>
                                <div>
                                <div className="font-medium">@Username</div>
                                <div className="flex mt-1 mb-2">
                                    {[1, 2, 3, 4, 5].map((_, index) => (
                                    <Star key={index} className="h-3 w-3 text-gray-300" />
                                    ))}
                                </div>
                                <p className="text-gray-600">Write a review</p>
                                </div>
                            </div>

                            <div className="flex gap-3">
                                <div className="w-10 h-10 rounded-full bg-gray-200 flex-shrink-0"></div>
                                <div>
                                <div className="font-medium">@cityhopper22</div>
                                <div className="flex mt-1 mb-2">
                                    {[1, 2, 3, 4, 5].map((_, index) => (
                                    <Star
                                        key={index}
                                        className={`h-3 w-3 ${index < 5 ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`}
                                    />
                                    ))}
                                </div>
                                <p className="text-gray-600">
                                    Super convenient location! Room was sleek and clean, perfect for working during the day and
                                    exploring the city at night.
                                </p>
                                </div>
                            </div>

                            <div className="flex gap-3">
                                <div className="w-10 h-10 rounded-full bg-gray-200 flex-shrink-0"></div>
                                <div>
                                <div className="font-medium">@skyline_dreamer</div>
                                <div className="flex mt-1 mb-2">
                                    {[1, 2, 3, 4, 5].map((_, index) => (
                                    <Star
                                        key={index}
                                        className={`h-3 w-3 ${index < 5 ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`}
                                    />
                                    ))}
                                </div>
                                <p className="text-gray-600">
                                    Those views are unreal — we watched the sunset from our balcony and felt like we were floating.
                                    Total luxury, worth every penny.
                                </p>
                                </div>
                            </div>

                            <div className="flex gap-3">
                                <div className="w-10 h-10 rounded-full bg-gray-200 flex-shrink-0"></div>
                                <div className="flex-1">
                                <div className="flex justify-between">
                                    <div className="font-medium">@vintagevibes</div>
                                    <Button size="small" variant="text" className="h-6 w-6">
                                    <Edit className="h-3 w-3" />
                                    </Button>
                                </div>
                                <div className="flex mt-1 mb-2">
                                    {[1, 2, 3, 4, 5].map((_, index) => (
                                    <Star
                                        key={index}
                                        className={`h-3 w-3 ${index < 5 ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`}
                                    />
                                    ))}
                                </div>
                                <p className="text-gray-600">
                                    This place feels like stepping into a romantic novel. The vintage decor is gorgeous, and the staff
                                    made our anniversary weekend extra special.
                                </p>
                                </div>
                            </div>
                            </div>

                            <div className="flex justify-center mt-8">
                            <Button variant="outlined" className="rounded-full px-8">
                                Load more
                            </Button>
                            </div>
                        </div>
                        </div>

                        {/* Sidebar */}
                        <div className="lg:col-span-1">
                        <div className="border border-gray-200 rounded-lg p-6 sticky top-8">
                            <div className="space-y-4">
                                <div>
                                    <div className="flex justify-between items-center mb-2">
                                        <h3 className="font-medium">Guest</h3>
                                        <Button size="small" variant="text" className="h-6 w-6 rounded-full">
                                            <Edit className="h-3 w-3" />
                                        </Button>
                                        </div>
                                    <div className="font-normal text-gray-500">2 Person</div>
                                </div>

                                <div>
                                    <div className="flex justify-between items-center mb-2">
                                        <h3 className="font-medium">Room</h3>
                                        <Button size="small" variant="text" className="h-6 w-6 rounded-full">
                                            <Edit className="h-3 w-3" />
                                        </Button>
                                        </div>
                                    <div className="font-medium text-gray-500 my-5 ">1 Room</div>
                                </div>
                                <div className="mb-2">
                                    <div className='flex justify-between items-center mb-2'>
                                        <h3 className="font-medium ">Check In</h3>
                                        <Button size="small" variant="text" className="h-6 w-6 rounded-full">
                                            <Edit className="h-3 w-3" />
                                        </Button>
                                    </div>
                                    <div className="font-medium text-gray-500 mt-1">22 December 2024</div>
                                </div>
                                <div className="mb-2">
                                    <div className="flex justify-between items-center  mb-2">
                                        <h3 className="font-medium">Check Out</h3>
                                        <Button size="small" variant="text" className="h-6 w-6 rounded-full">
                                            <Edit className="h-3 w-3" />
                                        </Button>
                                    </div>
                                    <div className="font-medium text-gray-500 mt-1">24 December 2024</div>
                                </div>

                                <div className="flex justify-between items-center">
                                    <h3 className="font-medium">Pricing per night</h3>
                                    <div className="font-medium">$10.99/night</div>
                                </div>

                                    <Button className="w-full bg-black hover:bg-gray-800 text-white">Update</Button>
                                    <Button variant="contained" color="error" className="w-full">
                                        Delete
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            
    )
}