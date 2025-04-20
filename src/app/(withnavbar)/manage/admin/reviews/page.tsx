'use client'
import Link from "next/link"
import { ChevronDown, Edit, Star } from "lucide-react"
import { Suspense } from "react"
import { LinearProgress } from "@mui/material"

import { useState } from 'react'
import { useEffect } from 'react'
import { Review, ReviewJson, ReviewItem } from '../../../../../../interfaces'
import getReviews from '../../../../../libs/getReviews'

import { useSession } from "next-auth/react"

export default function Dashboard() {

  const { data:session } = useSession();

  const [reviews, setReview] = useState<Review[]>([]);
  const [reviewCount, setReviewCount] = useState<number>(0);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        if (!session?.user?.token) {
          throw new Error("User token is undefined");
        }
        console.log("Fetching bookings with token:", session);
        const respond = await getReviews(session.user.token);
        setReview(respond.data);
        setReviewCount(respond.count);
      } catch (err) {
        console.error("เกิดข้อผิดพลาดในการโหลดรีวิว : ", err)
      }
    };

    fetchReviews();
  }, []);

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

              <div>
                <button className="w-full flex items-center justify-between p-3 rounded-md">
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
                </div>
              </div>

              <div>
                <button className="w-full flex items-center justify-between p-3 rounded-md bg-gray-100">
                  <span className="font-medium">Admin</span>
                  <ChevronDown className="h-4 w-4" />
                </button>
                <div className="pl-6 py-1">
                  <Link href="/manage/admin/reservations" className="block py-1.5 text-gray-600">
                    Reservations
                  </Link>
                  <Link href="/manage/admin/reviews" className="block py-1.5 text-black-600">
                    Reviews
                  </Link>
                </div>
              </div>
            </nav>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-lg font-medium">{reviewCount} Reviews</h2>
              <div className="flex items-center">
                <span className="text-sm mr-2">Sort By:</span>
                <button className="flex items-center text-sm">
                  Default
                  <ChevronDown className="h-4 w-4 ml-1" />
                </button>
              </div>
            </div>

            <div className="space-y-4">
            {reviews.length === 0 ? (
                      <p>กำลังโหลดข้อมูลรีวิว...</p>
                    ) : (

                      reviews.map((review) => (
                        <div key={review._id} className="border rounded-lg overflow-hidden">
                          <div className="p-4">
                            <h3 className="font-medium text-lg">Hotel : {review.hotel.name}</h3>
                            <h3 className="font-medium text-lg">User : {review.user.name}</h3>
                            {
                              review.comment ? (
                                <h3 className="font-medium text-lg">Comment : {review.comment}</h3>
                              ) : ''
                            }
                            <h3 className="font-medium text-lg">Rating : {review.rating}/5</h3>                       
                          </div>
                        </div>
                    )))
                  }
            </div>
          </div>
        </div>
      </main>

      
    </div>
  )
}
