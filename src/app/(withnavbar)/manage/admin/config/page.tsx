'use client'

import Link from "next/link"
import Image from "next/image"
import { ChevronDown, MapPin, User, HomeIcon, Calendar, Pencil } from "lucide-react"
import getBookings from '../../../../../libs/getBookings'
import { BookingItem } from '../../../../../../interfaces'
import { useState, useEffect } from 'react'
import { useSession } from "next-auth/react"
import SideBar from "@/components/manage/sidebar"

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
              {bookings.length === 0 ? (
                <p>กำลังโหลดข้อมูลการจอง...</p>
              ) : (
                bookings.map((booking) => (
                  <div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
