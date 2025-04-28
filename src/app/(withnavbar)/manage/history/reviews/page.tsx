'use client'
import Link from "next/link"
import { ChevronDown, Edit, Star, Delete } from "lucide-react"
import React, { Suspense } from "react"
import { LinearProgress } from "@mui/material"

import { useState } from 'react'
import { useEffect } from 'react'
import { Review, ReviewJson, ReviewItem } from '../../../../../../interfaces'
import getReviews from '../../../../../libs/getReviews'

import { useSession } from "next-auth/react"

import Swal from 'sweetalert2';

import { toast, ToastContainer } from "react-toastify";

import Rating from '@mui/material/Rating'

import updateReview from "@/libs/updateReview"
import deleteReview from "@/libs/deleteReview"
import SideBar from "@/components/manage/sidebar"

export default function Dashboard() {

  const { data:session } = useSession();

  const [reviews, setReview] = useState<Review[]>([]);
  const [reviewCount, setReviewCount] = useState<number>(0);

  const [comment, setComment] = useState<Map<string, string>>(new Map());
  const [rating, setRating] = useState<Map<string, number>>(new Map());
  const [editingId, setEditingId] = useState<string>("");
  const [editedComment, setEditingComment] = useState<string>("");
  const [editedRating, setEditedRating] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);
  


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
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, []);

  if(reviews.length > 0 && comment.size == 0 && rating.size == 0) {

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

      const response = await updateReview(reviewId, session.user.token, editedComment || "", editedRating || 0);
        if(response.success == true) {
            toast.success("Update Review Successfully.");
            const newCommentState = new Map<string, string>(comment);
            const newRatingState = new Map<string, number>(rating);
            newCommentState.set(reviewId, editedComment);
            newRatingState.set(reviewId, editedRating);
            setComment(newCommentState);
            setRating(newRatingState);
        } else toast.error(response.message ? response.message : `An Error has occurred while update review.`);
        setEditingId("null");
    } else toast.error("Invalid comment or rating");
  }

  const handleDeleteReview = async (reviewId: string) => {
      if(session) {
          Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
          }).then(async (result) => {
            if (result.isConfirmed) {
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
                  setReviewCount(reviewCount-1);
              } else toast.error(response.message ? response.message : `An Error has occurred while delete review.`);
            }
          });
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
          <SideBar/>


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
              {reviews.length === 0 && loading ? (
                <p>กำลังโหลดข้อมูลรีวิว...</p>
              ) : reviews.length === 0 && !loading ? (
                <p>ไม่มีข้อมูล</p>
              ) : (
                reviews.map((review) => (
                    <div
                      key={review._id}
                      className={`border rounded-lg overflow-hidden ${editingId === review._id ? 'bg-white shadow-md' : ''}`}
                    >
                      <div className="mx-2">
                        <div className="flex flex-row items-center">
                          <div className="w-8 h-8 bg-gray-200 rounded-full flex-shrink-0 my-1"></div>
                          <div className="flex-1 mx-2">
                            <div className="flex gap-5">
                              <Link href="#" className="font-medium hover:underline">
                                {review.hotel.name}
                              </Link>
                              <div>reviewed by {review.user.name}</div>
                              <button onClick={() => {
                                setEditingId(review._id);
                                setEditingComment(comment.get(review._id) || "");
                                setEditedRating(rating.get(review._id) || 0);
                              }}>
                                <Edit className="h-4 w-4 text-gray-500" />
                              </button>
                              <button onClick={() => {
                                handleDeleteReview(review._id);
                              }}>
                                <Delete className="h-4 w-4 text-gray-500" />
                              </button>
                            </div>
                          </div>
                        </div>
                      {/* Conditional rendering for editing or displaying the review */}

                      {editingId === review._id ? (
                        <div className="space-y-2">
                          <textarea
                            className="w-full border rounded-md p-2 bg-ct-light-grey"
                            value={editedComment}
                            onChange={(e) => setEditingComment(e.target.value)}
                          />
                          <Rating
                            value={editedRating}
                            precision={1}
                            onChange={(e, newValue) => setEditedRating(newValue ?? 0)}
                          />
                          <div className="flex gap-2">
                          <button
                            onClick={() => handleUpdateReview(review._id)}
                            className="text-white bg-blue-600 px-3 py-1 rounded hover:bg-blue-900 duration-300"
                          >
                            Save
                          </button>
                            <button
                              onClick={() => setEditingId("")}
                              className="text-gray-600 border border-gray-300 px-3 py-1 rounded hover:bg-gray-100 duration-300"
                            >
                              Cancel
                            </button>
                          </div>
                        </div>
                      ) : (
                        <>
                          <Rating
                            name="simple-controlled"
                            value={rating.get(review._id)}
                            precision={1}
                            size="small"
                            readOnly
                          />
                          <p className="text-sm text-gray-600">{comment.get(review._id)}</p>
                        </>
                      )}

                    </div>
                  </div>
                ))
              )
              
              }
            </div>


            
          </div>
        </div>
        <ToastContainer/>
      </main>

      
    </div>
  )
}
