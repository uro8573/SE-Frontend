'use client'

import Link from "next/link"
import Image from "next/image"
import { ChevronDown, MapPin, User, HomeIcon, Calendar, Pencil } from "lucide-react"
import getBookings from '../../../../../libs/getBookings'
import { BookingItem } from '../../../../../../interfaces'
import { useState, useEffect } from 'react'
import { useSession } from "next-auth/react"
import SideBar from "@/components/manage/sidebar"
import { useRouter } from "next/router"

export default function Dashboard() {
  const { data: session,status } = useSession();
  const [bookings, setBookings] = useState<BookingItem[]>([]);
  const [bookingCount, setBookingCount] = useState<number>(0);

  const [loading, setLoading] = useState<boolean>(true);


  if (!session?.user.token) {
    return (
      <>
        <div className='w-full h-[80vh] text-h3-heading text-primary-dark flex justify-center items-center'>Please log in to the Manage page</div>
      </>
    );
  }


  useEffect(() => {
    const fetchBookings = async () => {
      try {
        if (!session?.user?.token) throw new Error("User token is undefined");

        const response = await getBookings(session.user.token);
        setBookingCount(response.data.filter((booking: BookingItem) => booking.isConfirmed == true).length);
        setBookings(response.data.filter((booking: BookingItem) => booking.isConfirmed == true));
      } catch (error) {
        console.error("เกิดข้อผิดพลาดในการโหลดการจอง:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, [session]);

  return (
    <div className="min-h-screen flex flex-col text-black">
      <main className="flex-1 max-w-7xl mx-auto w-full px-6 py-8">
        <div className="mb-6">
          <h1 className="text-2xl font-bold">Manage</h1>
          <p className="text-gray-600">Manage your bookings and reviews.</p>
        </div>

        <div className="flex flex-col md:flex-row gap-8">
          {/* Sidebar */}
          <SideBar/>

          {/* Main Content */}
          <div className="flex-1">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-lg font-medium">{bookingCount} Reservations</h2>
              <div className="flex items-center">
                <span className="text-sm mr-2">Sort By:</span>
                <button className="flex items-center text-sm">
                  Default
                  <ChevronDown className="h-4 w-4 ml-1" />
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {bookings.length === 0 && loading ? (
                <p>กำลังโหลดข้อมูลการจอง...</p>
              ) : bookings.length === 0 && !loading ? (
                <p>ไม่มีข้อมูลการจองที่ได้รับการยืนยัน</p>
              ) : (
                bookings.map((booking) => {
                  const checkInDate = new Date(booking.checkInDate);
                  const now = new Date();
                  const isEditable = now <= checkInDate;

                  return (
                    <div key={booking._id} className="border rounded-lg overflow-hidden">
                      <div className="relative h-48">
                        <Image
                          src={booking.hotel.picture || "/placeholder.svg"}
                          alt="Hotel room"
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="p-4">
                        <h3 className="font-medium text-lg">{booking.hotel.name}</h3>
                        <p className="text-sm text-gray-600 mt-1">ติดต่อโรงแรม: {booking.hotel.tel}</p>
                        <div className="flex items-center mt-3">
                          <MapPin className="h-4 w-4 text-gray-500 mr-1" />
                          <span className="text-sm text-gray-600">{booking.hotel.address || "ไม่ระบุ"}</span>
                        </div>
                        <div className="flex items-center justify-between mt-3">
                          <div className="flex items-center">
                            <User className="h-4 w-4 text-gray-500 mr-1" />
                            <span className="text-sm text-gray-600">{booking.guest}</span>
                          </div>
                          <div className="flex items-center">
                            <HomeIcon className="h-4 w-4 text-gray-500 mr-1" />
                            <span className="text-sm text-gray-600">{booking.room}</span>
                          </div>
                          <div className="flex items-center">
                            <Calendar className="h-4 w-4 text-gray-500 mr-1" />
                            <span className="text-sm text-gray-600">{new Date(booking.checkInDate).toLocaleDateString()}</span>
                          </div>
                          
                        </div>
                        <div className="flex items-center justify-between mt-2">
                            <div className="text-sm text-gray-500">
                                Check-Out: {new Date(booking.checkOutDate).toLocaleDateString()}
                            </div>
                            {isEditable && (
                                <Link href={`/manage/${booking._id}`} className="block py-1.5 text-black-600 font-medium">
                                    <div className="flex items-center">
                                        <Pencil className="h-4 w-4 text-gray-500" />
                                    </div>
                                </Link>
                            )}
                        </div>
                        
                      </div>
                    </div>
                  );
                })
              )}
          </div>

          </div>
        </div>
      </main>
    </div>
  )
}
