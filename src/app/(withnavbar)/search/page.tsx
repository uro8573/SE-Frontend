"use client";
import DateReserve from "@/components/DateReserve";
import {
    Select,
    MenuItem,
    TextField,
    SelectChangeEvent,
    Input,
    Button,
} from "@mui/material";
import { useState, useEffect } from "react";
import dayjs, { Dayjs } from "dayjs";
import { useSearchParams } from "next/navigation";
import getHotel from "@/libs/getHotel";
import { useSession } from "next-auth/react";
import addBooking from "@/libs/addBooking";
import { ToastContainer, toast } from "react-toastify";
import { HotelJson, Hotel, HotelItem, Review } from "../../../../interfaces";

import Image from "next/image";
import { Star, MapPin, Users, Maximize } from "lucide-react";
import Link from "next/link";
import { Slider } from "@/components/ui/Slider";
import { Checkbox } from "@/components/ui/CheckBox";
import getHotels from "@/libs/getHotels";
import getReviewWithHotelID from "@/libs/getReviewWithHotelID";

export default function Search() {
    const searchParams = useSearchParams();
    const id = searchParams.get("id");

    const { data: session } = useSession();

    const [checkInDate, setCheckInDate] = useState<Dayjs | null>(null);
    const [checkOutDate, setCheckOutDate] = useState<Dayjs | null>(null);

    const [item, setItem] = useState<HotelItem | null>(null);
    const [loading, setLoading] = useState(true);

    const [allHotels, setAllHotels] = useState<Hotel[]>([]);
    const [displayedHotels, setDisplayedHotels] = useState<Hotel[]>([]);
    const [hotelsCount, setHotelsCount] = useState<number>(0);
    const [sortOption, setSortOption] = useState<string>("default");

    const [hotelRatings, setHotelRatings] = useState<{
        [hotelId: string]: number;
    }>({});

    if (!session?.user.token) {
      return (
        <>
          <div className='w-full h-[80vh] text-h3-heading text-primary-dark flex justify-center items-center'>Please log in to view hotels.</div>
        </>
      );
    }

    useEffect(() => {
        const fetchHotels = async () => {
            try {
                if (!session?.user.token)
                    throw new Error("User token is undefined");

                const response = await getHotels();
                if (!response) throw new Error("Failed to fetch data");
                const fetchedHotels = response.data;
                
                const reviewPromises = fetchedHotels.map((hotel) =>
                    getReviewWithHotelID(session.user.token, hotel.id),
                );

                const reviewResults = await Promise.all(reviewPromises);

                const updatedHotels: Hotel[] = [];
                const ratingsMap: { [hotelId: string]: number } = {};

                fetchedHotels.forEach((hotel, index) => {
                    const reviewData = reviewResults[index].data;
                    const ratings = reviewData.map(
                        (review: Review) => review.rating,
                    );
                    const ratingSum = ratings.reduce(
                        (a: number, b: number) => a + b,
                        0,
                    );
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

    // ** NO TOKEN NEED - CODE BY CHATGPT **
    // useEffect(() => {
    //     const fetchHotels = async () => {
    //         try {
    //             const response = await getHotels();
    //             if (!response) throw new Error("Failed to fetch hotels");
    //             const fetchedHotels = response.data;
    
    //             const updatedHotels: Hotel[] = fetchedHotels.map(hotel => ({
    //                 ...hotel,
    //                 userRatingCount: 0,
    //                 ratingSum: 0,
    //             }));
    
    //             const ratingsMap: { [hotelId: string]: number } = {};
    
    //             if (session?.user?.token) {
    //                 const reviewPromises = fetchedHotels.map((hotel) =>
    //                     getReviewWithHotelID(session.user.token, hotel.id)
    //                 );
    
    //                 const reviewResults = await Promise.all(reviewPromises);
    
    //                 fetchedHotels.forEach((hotel, index) => {
    //                     const reviewData = reviewResults[index].data;
    //                     const ratings = reviewData.map((review: Review) => review.rating);
    //                     const ratingSum = ratings.reduce((a, b) => a + b, 0);
    //                     const ratingCount = ratings.length;
    //                     const avg = ratingCount > 0 ? ratingSum / ratingCount : 0;
    
    //                     ratingsMap[hotel.id] = parseFloat(avg.toFixed(1));
    //                     updatedHotels[index] = {
    //                         ...updatedHotels[index],
    //                         userRatingCount: ratingCount,
    //                         ratingSum: ratingSum,
    //                     };
    //                 });
    //             }
    
    //             setAllHotels(updatedHotels);
    //             setDisplayedHotels(updatedHotels);
    //             setHotelsCount(response.count);
    //             setHotelRatings(ratingsMap);
    //             setLoading(false);
    //         } catch (error) {
    //             console.error("เกิดข้อผิดพลาดในการโหลดโรงแรม:", error);
    //             setLoading(false);
    //         }
    //     };
    
    //     fetchHotels();
    // }, [session?.user?.token]);
    

    useEffect(() => {
        if (allHotels.length === 0) return;

        let sortedHotels = [...allHotels];

        switch (sortOption) {
            case "star-rating":
                sortedHotels.sort((a, b) => {
                    const aRating =
                        a.userRatingCount > 0
                            ? a.ratingSum / a.userRatingCount
                            : 0;
                    const bRating =
                        b.userRatingCount > 0
                            ? b.ratingSum / b.userRatingCount
                            : 0;
                    return bRating - aRating;
                });
                break;
            case "lowest-price":
                sortedHotels.sort(
                    (a, b) => Number(a.dailyRate) - Number(b.dailyRate),
                );
                break;
            case "highest-price":
                sortedHotels.sort(
                    (a, b) => Number(b.dailyRate) - Number(a.dailyRate),
                );
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
        <section className="w-full px-4 md:px-8 text-black flex flex-col items-center justify-start gap-12">
            <div className="w-full max-w-screen-2xl flex flex-col justify-between items-start gap-8">
                {/* Search Section */}
                <div className="bg-ct-white rounded-2xl p-4 flex flex-col lg:flex-row gap-y-4 lg:gap-y-0 lg:gap-x-4 justify-between items-center w-full">
                    {/* Where */}
                    <div className="flex flex-col gap-2.5 justify-center items-start w-full lg:w-[30vw]">
                        <label className="text-h5-heading text-primary-dark">Where</label>
                        <input
                            type="text"
                            placeholder="Search Location"
                            className="text-p3-paragraphy-small text-ct-dark-grey placeholder-ct-dark-grey bg-transparent w-full focus:outline-none"
                        />
                    </div>

                    {/* Divider */}
                    <div className="hidden lg:block w-0.5 h-[56px] bg-ct-light-grey rounded-full" />

                    {/* Check In */}
                    <div className="flex flex-col gap-2.5 justify-center items-start w-full lg:w-[160px]">
                        <label className="text-h5-heading text-primary-dark">Check In</label>
                        <input
                            type="text"
                            placeholder="Select check-in"
                            className="text-p3-paragraphy-small text-ct-dark-grey placeholder-ct-dark-grey bg-transparent w-full focus:outline-none"
                        />
                    </div>

                    {/* Divider */}
                    <div className="hidden lg:block w-0.5 h-[56px] bg-ct-light-grey rounded-full" />

                    {/* Check Out */}
                    <div className="flex flex-col gap-2.5 justify-center items-start w-full lg:w-[160px]">
                        <label className="text-h5-heading text-primary-dark">Check Out</label>
                        <input
                            type="text"
                            placeholder="Select check-out"
                            className="text-p3-paragraphy-small text-ct-dark-grey placeholder-ct-dark-grey bg-transparent w-full focus:outline-none"
                        />
                    </div>

                    {/* Divider */}
                    <div className="hidden lg:block w-0.5 h-[56px] bg-ct-light-grey rounded-full" />

                    {/* Guest */}
                    <div className="flex flex-col gap-2.5 justify-center items-start w-full lg:w-[160px]">
                        <label className="text-h5-heading text-primary-dark">Guest</label>
                        <input
                            type="text"
                            placeholder="Number of guests"
                            className="text-p3-paragraphy-small text-ct-dark-grey placeholder-ct-dark-grey bg-transparent w-full focus:outline-none"
                        />
                    </div>

                    {/* Search Button */}
                    <div className="w-full lg:w-[160px] flex items-center justify-center">
                        <button className="w-full bg-primary-orange text-ui-label-semi-bold text-primary-dark py-4 px-6 rounded-[16px]">
                            Search
                        </button>
                    </div>
                </div>

                <div className="flex flex-col lg:flex-row gap-6">
                    {/* Filters */}
                    <div className="w-full lg:w-1/4 max-w-xs bg-ct-white p-4 rounded-2xl space-y-6">
                        <div className="flex justify-between items-center">
                            <h3 className="text-h5-heading text-primary-dark">Filter</h3>
                            <button className="text-p3-paragraphy-small text-primary-dark hover:underline">
                                Reset
                            </button>
                        </div>

                        {/* Price Range */}
                        <div className="space-y-6">
                            <div className="flex items-center justify-between mb-2">
                                <h4 className="text-h5-heading text-primary-dark">
                                    Price Range
                                </h4>
                                <img src="/res/svg/Arrow-Down.svg" alt="icon"/>
                            </div>
                            <div className="flex justify-between mb-2">
                                <span className="text-p3-paragraphy-small text-primary-dark">
                                    USD 10
                                </span>
                                <span className="text-p3-paragraphy-small text-primary-dark">
                                    USD 25
                                </span>
                            </div>
                            <div className="px-2">
                                <Slider
                                    defaultValue={[50]}
                                    max={100}
                                    step={1}
                                />
                            </div>
                        </div>

                        {/* Divider */}
                        <div className="a lg:block w-full h-1 bg-ct-light-grey rounded-full" />

                        {/* Rating */}
                        <div className="space-y-6">
                            <div className="flex items-center justify-between mb-2">
                                <h4 className="text-h5-heading text-primary-dark">
                                    Rating
                                </h4>
                                <img src="/res/svg/Arrow-Down.svg" alt="icon"/>
                            </div>
                            <div className="flex gap-4">
                                {["≤2", 3, 4, 5].map((rate) => (
                                    <button
                                        key={rate}
                                        className="flex items-center gap-1 px-2 py-1 bg-gray-100 rounded-md"
                                    >
                                        <span className="text-p3-paragraphy-small text-primary-dark">
                                            {rate}
                                        </span>
                                        <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Divider */}
                        <div className="hidden lg:block w-full h-1 bg-ct-light-grey rounded-full" />

                        {/* Location */}
                        <div className="space-y-6">
                            <div className="flex items-center justify-between mb-2">
                                <h4 className="text-h5-heading text-primary-dark">
                                    Location
                                </h4>
                                <img src="/res/svg/Arrow-Down.svg" alt="icon"/>
                            </div>
                            <div className="space-y-4">
                                <div className="flex items-center gap-2">
                                    <Checkbox id="siam" />
                                    <label
                                        htmlFor="siam"
                                        className="text-p3-paragraphy-small text-primary-dark"
                                    >
                                        Siam
                                    </label>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Checkbox id="sukhumvit" />
                                    <label
                                        htmlFor="sukhumvit"
                                        className="text-p3-paragraphy-small text-primary-dark"
                                    >
                                        Sukhumvit
                                    </label>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Checkbox id="airport" />
                                    <label
                                        htmlFor="airport"
                                        className="text-p3-paragraphy-small text-primary-dark"
                                    >
                                        Suvarnabhumi Airport
                                    </label>
                                </div>
                                <button className="text-p3-paragraphy-small text-primary-dark hover:underline">
                                    Show All 24
                                </button>
                            </div>
                        </div>

                        {/* Divider */}
                        <div className="hidden lg:block w-full h-1 bg-ct-light-grey rounded-full" />

                        {/* Property Type */}
                        <div className="space-y-6">
                            <div className="flex items-center justify-between mb-2">
                                <h4 className="text-h5-heading text-primary-dark">
                                    Property Type
                                </h4>
                                <img src="/res/svg/Arrow-Down.svg" alt="icon"/>
                            </div>
                            <div className="space-y-4">
                                <div className="flex items-center gap-2">
                                    <Checkbox id="hotel" />
                                    <label
                                        htmlFor="hotel"
                                        className="text-p3-paragraphy-small text-primary-dark"
                                    >
                                        Hotel
                                    </label>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Checkbox id="homes" />
                                    <label
                                        htmlFor="homes"
                                        className="text-p3-paragraphy-small text-primary-dark"
                                    >
                                        Homes & apts
                                    </label>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Checkbox id="serviced" />
                                    <label
                                        htmlFor="serviced"
                                        className="text-p3-paragraphy-small text-primary-dark"
                                    >
                                        Serviced apartment
                                    </label>
                                </div>
                                <button className="text-p3-paragraphy-small text-primary-dark hover:underline">
                                    Show All 13
                                </button>
                            </div>
                        </div>

                        {/* Divider */}
                        <div className="hidden lg:block w-full h-1 bg-ct-light-grey rounded-full" />

                        {/* Bed Type */}
                        <div className="space-y-6">
                            <div className="flex items-center justify-between mb-2">
                                <h4 className="text-h5-heading text-primary-dark">
                                    Bed Type
                                </h4>
                                <img src="/res/svg/Arrow-Down.svg" alt="icon"/>
                            </div>
                            <div className="space-y-4">
                                <div className="flex items-center gap-2">
                                    <Checkbox id="double" />
                                    <label
                                        htmlFor="double"
                                        className="text-p3-paragraphy-small text-primary-dark"
                                    >
                                        1 Double Bed
                                    </label>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Checkbox id="beds" />
                                    <label
                                        htmlFor="beds"
                                        className="text-p3-paragraphy-small text-primary-dark"
                                    >
                                        2 Beds
                                    </label>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Checkbox id="single" />
                                    <label
                                        htmlFor="single"
                                        className="text-p3-paragraphy-small text-primary-dark"
                                    >
                                        1 Single Bed
                                    </label>
                                </div>
                                <button className="text-p3-paragraphy-small text-primary-dark hover:underline">
                                    Show All 6
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Hotel Listings */}
                    <div className="w-full lg:w-3/4">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-p3-paragraphy-small text-primary-dark">
                                {hotelsCount} Hotels available
                            </h3>
                            <div className="flex items-center gap-2">
                                <span className="text-p3-paragraphy-small text-primary-dark">Sort By:</span>
                                <div className="relative sort-dropdown">
                                    <button
                                        className="flex items-center gap-1 text-p3-paragraphy-small text-primary-dark"
                                        onClick={toggleDropdown}
                                    >
                                        {sortOption === "default" && "Default"}
                                        {sortOption === "star-rating" &&
                                            "Star Rating"}
                                        {sortOption === "lowest-price" &&
                                            "Lowest Price"}
                                        {sortOption === "highest-price" &&
                                            "Highest Price"}
                                        <img src="/res/svg/Arrow-Down.svg" alt="icon"/>
                                    </button>

                                    {isDropdownOpen && (
                                        <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg z-50">
                                            <ul>
                                                <li
                                                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                                                    onClick={() => {
                                                        handleSortChange(
                                                            "default",
                                                        );
                                                        toggleDropdown();
                                                    }}
                                                >
                                                    Default
                                                </li>
                                                <li
                                                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                                                    onClick={() => {
                                                        handleSortChange(
                                                            "star-rating",
                                                        );
                                                        toggleDropdown();
                                                    }}
                                                >
                                                    Star Rating
                                                </li>
                                                <li
                                                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                                                    onClick={() => {
                                                        handleSortChange(
                                                            "lowest-price",
                                                        );
                                                        toggleDropdown();
                                                    }}
                                                >
                                                    Lowest Price
                                                </li>
                                                <li
                                                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                                                    onClick={() => {
                                                        handleSortChange(
                                                            "highest-price",
                                                        );
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
                                <div className="col-span-3 text-center py-8">
                                    Loading hotels...
                                </div>
                            ) : displayedHotels.length === 0 ? (
                                <div className="col-span-3 text-center py-8">
                                    No hotels found
                                </div>
                            ) : (
                                displayedHotels.map((hotel) => (
                                    <Link
                                        href={`/hotel/${hotel.id}`}
                                        key={hotel.id}
                                    >
                                        <div className="border border-gray-200 rounded-lg overflow-hidden">
                                            <div className="relative h-48">
                                                <Image
                                                    src={hotel.picture}
                                                    alt={hotel.name}
                                                    fill
                                                    className="object-cover"
                                                />
                                            </div>
                                            <div className="p-4">
                                                <h3 className="font-bold text-lg mb-1 text-black">
                                                    {hotel.name}
                                                </h3>
                                                <p className="text-sm text-gray-600 mb-2">
                                                    {hotel.description}
                                                </p>
                                                <div className="flex items-center gap-1 mb-2">
                                                    <MapPin className="w-4 h-4 text-gray-500" />
                                                    <span className="text-sm text-black">
                                                        {hotel.region},{" "}
                                                        {hotel.address}
                                                    </span>
                                                </div>
                                                <div className="flex justify-between items-center">
                                                    <div className="flex items-center gap-4">
                                                        <div className="flex items-center gap-1">
                                                            <Users className="w-4 h-4 text-gray-500" />
                                                            <span className="text-xs text-black">
                                                                {hotel.guests}
                                                            </span>
                                                        </div>
                                                        <div className="flex items-center gap-1">
                                                            <Maximize className="w-4 h-4 text-gray-500" />
                                                            <span className="text-xs text-black">
                                                                {hotel.size}
                                                            </span>
                                                        </div>
                                                        <div className="flex items-center gap-1">
                                                            <Star className="w-4 h-4 text-yellow-400" />
                                                            <span className="text-xs text-black">
                                                                {hotel.userRatingCount ===
                                                                0
                                                                    ? 0
                                                                    : (
                                                                          hotel.ratingSum /
                                                                          hotel.userRatingCount
                                                                      ).toFixed(
                                                                          1,
                                                                      )}
                                                            </span>
                                                        </div>
                                                    </div>
                                                    <div className="font-bold text-lg text-black">
                                                        ${hotel.dailyRate}
                                                    </div>
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
        </section>
    );
}
