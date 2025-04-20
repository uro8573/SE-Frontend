'use client'
import Link from "next/link"
import { ChevronDown, Edit, Star, Delete } from "lucide-react"
import { Suspense } from "react"
import { LinearProgress } from "@mui/material"

import { useState } from 'react'
import { useEffect } from 'react'
import { Review, ReviewJson, ReviewItem } from '../../../../../../interfaces'
import getReviews from '../../../../../libs/getReviews'

import { useSession } from "next-auth/react"

import Rating from '@mui/material/Rating'

import updateReview from "@/libs/updateReview"
import deleteReview from "@/libs/deleteReview"


export default function Dashboard() {

  const { data:session } = useSession();

  const [reviews, setReview] = useState<Review[]>([]);
  const [reviewCount, setReviewCount] = useState<number>(0);

  const [comment, setComment] = useState<Map<string, string>>(new Map());
  const [rating, setRating] = useState<Map<string, number>>(new Map());


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

  if(reviews.length > 0 && comment.size == 0 && rating == 0) {

    const initialCommentState = new Map<string, string>();
    const initialRatingState = new Map<string, number>();

    reviews.map((review) => {
      initialCommentState.set(review._id, review.comment);
      initialRatingState.set(review._id, review.rating);
    });

    setComment(initialCommentState);
    setRating(initialRatingState);

  }

  const handleUpdateReview = async (reviewId: string) => {
    if(comment.get(reviewId) && session && rating.get(reviewId)) {
        const response = await updateReview(reviewId, session.user.token, comment.get(reviewId), rating.get(reviewId));
        if(response.success == true) {
            toast.success("Update Review Successfully.");
        } else toast.error(response.message ? response.message : `An Error has occurred while update review.`);
    } else toast.error("Invalid comment or rating");
  }

  const handleDeleteReview = async (reviewId: string) => {
      if(session) {
          const response = await deleteReview(reviewId, session.user.token);
          if(response.success == true) {
              toast.success("Delete Review Successfully.");
              const newReview = structuredClone(reviews);
              for(var i = 0; i < reviews.length; ++i) {
                  if(reviews[i]._id == reviewId) {
                      newReview.splice(i, 1);
                      break;
                  }
              }
              setReview(newReview);
          } else toast.error(response.message ? response.message : `An Error has occurred while delete review.`);
      } else toast.error("Invalid Session.");
  }

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
                  <div
                    key={review._id}
                    className={`border rounded-lg overflow-hidden ${editingId === review._id ? 'bg-white shadow-md' : ''}`}
                  >
                    <div className="w-8 h-8 bg-gray-200 rounded-full flex-shrink-0 mx-2 my-1"></div>
                    <div className="flex-1 mx-2">
                      <div className="flex gap-5">
                        <Link href="#" className="font-medium hover:underline">
                          {review.hotel.name}
                        </Link>
                        <div>reviewed by {review.user.name}</div>
                        <button onClick={() => setEditingId(review._id)}>
                          <Edit className="h-4 w-4 text-gray-500" />
                        </button>
                        <button >
                          <Delete className="h-4 w-4 text-gray-500" />
                        </button>
                      </div>

                      {/* Conditional rendering for editing or displaying the review */}
                      {editingId === review._id ? (
                        <div className="space-y-2">
                          <textarea
                            className="w-full border rounded-md p-2 bg-ct-light-grey"
                            value={editedComment}
                            onChange={(e) => setEditedComment(e.target.value)}
                          />
                          <Rating
                            value={editedRating}
                            precision={1}
                            onChange={(e, newValue) => setEditedRating(newValue ?? 0)}
                          />
                          <div className="flex gap-2">
                          <button
                            onClick={() => handleUpdateReview}
                            className="text-white bg-blue-600 px-3 py-1 rounded"
                          >
                            Save
                          </button>
                            <button
                              onClick={() => setEditingId(null)}
                              className="text-gray-600 border border-gray-300 px-3 py-1 rounded"
                            >
                              Cancel
                            </button>
                          </div>
                        </div>
                      ) : (
                        <>
                          <Rating
                            name="simple-controlled"
                            value={review.rating}
                            precision={1}
                            size="small"
                            readOnly
                          />
                          <p className="text-sm text-gray-600">{review.comment}</p>
                        </>
                      )}
                    </div>
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
