'use client'

import { useState } from "react";
import { useEffect } from "react";
import getBookings from "@/libs/getBookings";
import { useSession } from "next-auth/react";
import DateReserve from "./DateReserve";
import dayjs, { Dayjs } from "dayjs";
import updateBooking from "@/libs/updateBooking";
import deleteBooking from "@/libs/deleteBooking"
import { ToastContainer, toast } from "react-toastify";
import getUserProfile from "@/libs/getUserProfile";
import { BookingItem, BookingJson, userJson } from "../../interfaces";

export default function BookingList() {

    const [items, setItems] = useState<BookingJson|null>(null);
    const [profile, setProfile] = useState<userJson|null>(null);
    const [loadingItems, setLoadingItems] = useState(true);
    const [loadingProfile, setLoadingProfile] = useState(true);

    const [checkInDate, setCheckInDate] = useState<Map<string, Dayjs>>(new Map());
    const [checkOutDate, setCheckOutDate] = useState<Map<string, Dayjs>>(new Map());

    const { data:session } = useSession();
    
    if(!session) return (<div></div>)
        
        useEffect(() => {
            const fetchItems = async () => {
                try {
                    const response = await getBookings(session.user.token);
                    
                    if(!response) throw new Error("Failed to fetch data.");
                    
                    setItems(response);
                    
                } catch(err) {
                    console.error(err);
                } finally {
                    setLoadingItems(false);
                }
            }
            
            const fetchProfile = async() => {
                try {
                    const response = await getUserProfile(session.user.token);
                    
                    if(!response) throw new Error("Failed to fetch user data.");
                    
                    setProfile(response);
                    
                } catch(err) {
                    console.error(err);
                } finally {
                    setLoadingProfile(false);
                }
            }
            
        fetchItems();
        fetchProfile();
        
    }, []);

    if(loadingItems || loadingProfile || !items || !profile) return (<div></div>)
    
    const handleUpdateBooking = async (bookingId: string) => {
        if(checkInDate.get(bookingId) && session && checkOutDate.get(bookingId)) {
            const response = await updateBooking(bookingId, session.user.token, checkInDate.get(bookingId)?.format("YYYY-MM-DD") || "", checkOutDate.get(bookingId)?.format("YYYY-MM-DD") || "");
            if(response.success == true) {
                toast.success("Update Booking Successfully.");
            } else toast.error(response.message ? response.message : `An Error has occurred while update booking.`);
        } else toast.error("Invalid Date or Session.");
    }
    const handleDeleteBooking = async (bookingId: string) => {
        if(session) {
            const response = await deleteBooking(bookingId, session.user.token);
            if(response.success == true) {
                toast.success("Delete Booking Successfully.");
                const newItem = structuredClone(items);
                for(var i = 0; i < items.data.length; ++i) {
                    if(items.data[i]._id == bookingId) {
                        newItem.data.splice(i, 1);
                        break;
                    }
                }
                setItems(newItem);
            } else toast.error(response.message ? response.message : `An Error has occurred while delete booking.`);
        } else toast.error("Invalid Session.");
    }


    if(items.data.length > 0 && checkInDate.size == 0 && checkOutDate.size == 0) {

        const initialCheckInMapState = new Map<string, Dayjs>();
        const initialCheckOutMapState = new Map<string, Dayjs>();
    
        items.data.map((item: BookingItem) => {
            initialCheckInMapState.set(item._id, dayjs(new Date(item.checkInDate)));
            initialCheckOutMapState.set(item._id, dayjs(new Date(item.checkOutDate)))
        });

        setCheckInDate(initialCheckInMapState);
        setCheckOutDate(initialCheckOutMapState);

    }

    return (
        <div>
            {
                items.data.length == 0 ? (
                    <div className="mt-[5%] text-4xl text-center text-black">No Booking.</div>
                )
                : items.data.map((item: BookingItem) => (
                    <div className="bg-slate-200 rounded px-5 mx-5 py-2 my-2" key={item._id}>
                        <div className="text-xl text-black font-bold">
                            {item.hotel ? item.hotel.name : `Unknown Hotel`} 
                        </div>
                        {
                            profile.data._id != item.user ? (
                                <div className="text-l text-black font-bold">
                                User : &nbsp; 
                                {
                                    item.user
                                }
                                </div>
                            ) : ""
                        }
                        <div className="text-md text-black">
                            Booking Time: {new Date(item.createdAt).toString()}
                        </div>
                        <div className="flex flex-row gap-3">
                            <div>
                                <div className="text-md text-black">Check-In Date</div>
                                <DateReserve defaultDate={dayjs(new Date(item.checkInDate))} onDateChange={(value:Dayjs)=>{ setCheckInDate(prev => new Map(prev).set(item._id, value)) }}/>
                            </div>
                            <div>
                                <div className="text-md text-black">Check-Out Date</div>
                                <DateReserve defaultDate={dayjs(new Date(item.checkOutDate))} onDateChange={(value:Dayjs)=>{ setCheckOutDate(prev => new Map(prev).set(item._id, value)) }}/>
                            </div>
                        </div>
                        <div className="flex flex-row gap-2 mt-[3px]">
                            <button className="block rounded-md bg-lime-600 hover:bg-indigo-600 px-3 py-1 text-white shadow-sm duration-300" 
                            onClick={() => handleUpdateBooking(item._id)}>
                                Update
                            </button>
                            <button className="block rounded-md bg-red-600 hover:bg-indigo-600 px-3 py-1 text-white shadow-sm duration-300" 
                            onClick={() => handleDeleteBooking(item._id)}>
                                Delete
                            </button>
                        </div>
                    </div>
                ))
            }
            <ToastContainer/>
        </div>
    )
}