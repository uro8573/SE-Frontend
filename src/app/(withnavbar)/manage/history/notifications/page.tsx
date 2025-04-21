'use client'

import Link from "next/link"
import Image from "next/image"
import { ChevronDown, MapPin, User, HomeIcon, Calendar, Pencil } from "lucide-react"
import getBookings from '../../../../../libs/getBookings'
import { BookingItem } from '../../../../../../interfaces'
import { useState, useEffect } from 'react'
import { useSession } from "next-auth/react"

export default function Dashboard() {
  const { data: session } = useSession();
  const [bookings, setBookings] = useState<BookingItem[]>([]);
  const [bookingCount, setBookingCount] = useState<number>(0);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        if (!session?.user?.token) throw new Error("User token is undefined");

        const response = await getBookings(session.user.token);
        setBookingCount(response.count);
        setBookings(response.data);
      } catch (error) {
        console.error("เกิดข้อผิดพลาดในการโหลดการจอง:", error);
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
          <div className="w-full md:w-64">
            <nav className="space-y-1">
              <div>
                <button className="w-full flex items-center justify-between p-3 rounded-md hover:bg-gray-100">
                  <span className="font-medium">Current</span>
                  <ChevronDown className="h-4 w-4" />
                </button>
                <div className="pl-6 py-1">
                  <Link href="/manage/current-reservations" className="block py-1.5 text-gray-600">
                    Reservations
                  </Link>
                </div>
              </div>

              {/* <div>
                <button className="w-full flex items-center justify-between p-3 rounded-md hover:bg-gray-100">
                  <span className="font-medium">Historyaaaaaaaa</span>
                  <ChevronDown className="h-4 w-4" />
                </button>
                <div className="pl-6 py-1">
                  <Link href="/manage/history/reservations" className="block py-1.5 text-gray-600">
                    Reservations
                  </Link>
                  <Link href="/manage/history/reviews" className="block py-1.5 text-gray-600">
                    Reviews
                  </Link>
                </div>
              </div> */}

              <div>
                <button className="w-full flex items-center justify-between p-3 rounded-md bg-gray-100">
                  <span className="font-medium">History</span>
                  <ChevronDown className="h-4 w-4" />
                </button>
                <div className="pl-6 py-1">
                  <Link href="/manage/history/reservations" className="block py-1.5 text-gray-600">
                    Reservations
                  </Link>
                  <Link href="/manage/history/reviews" className="block py-1.5 text-gray-600">
                    Reviews
                  </Link>
                  <Link href="/manage/history/notifications" className="block py-1.5 font-medium">
                    Notifications
                </Link>
                </div>
                
              </div>
            </nav>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-lg font-medium">{bookingCount} Notifications</h2> {/* ยังเอาเลขมาจาก booking ทั้งหมด */}
              <div className="flex items-center">
                <span className="text-sm mr-2">Sort By:</span>
                <button className="flex items-center text-sm">
                  Default
                  <ChevronDown className="h-4 w-4 ml-1" />
                </button>
              </div>
            </div>

            {/* <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {bookings.length === 0 ? (
                <p>กำลังโหลดข้อมูลการจอง...</p>
              ) : (
                bookings.map((booking) => (
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
                          <span className="text-sm text-gray-600">{booking.checkInDate}</span>
                        </div>
                        <Link href={`/manage/${booking._id}`} className="block py-1.5 text-black-600 font-medium">
                          <div className="flex items-center">
                            <Pencil className="h-4 w-4 text-gray-500 mr-1" />
                          </div>
                        </Link>
                      </div>
                      <div className="text-sm text-gray-500 mt-2">Check-Out: {booking.checkOutDate}</div>
                    </div>
                  </div>
                ))
              )}
            </div> */}


          </div>
        </div>
      </main>
    </div>
  )
}
