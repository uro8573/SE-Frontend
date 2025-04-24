'use client'

import Link from "next/link"
import { ChevronDown } from "lucide-react"
import getBookings from '../../../../../libs/getBookings'
import { BookingItem } from '../../../../../../interfaces'
import { useState, useEffect } from 'react'
import { useSession } from "next-auth/react"
import { notification } from "../../../../../../interfaces"
import getNotifications from "@/libs/getNotifications"
import  updateNotification  from "@/libs/updateNotification"

export default function Dashboard() {
  const { data: session } = useSession();
  const [notifications, setNotifications] = useState<notification[]>([]);
  useEffect(() => {
    const fetchBookings = async () => {
      try {
        if (!session?.user?.token) throw new Error("User token is undefined");
        const response = await getNotifications(session.user.token);
        console.log("sussusamongus",response);
        setNotifications(response.data);
      } catch (error) {
        console.error("เกิดข้อผิดพลาดในการโหลดการจอง:", error);
      }
    };

    fetchBookings();
  }, [session]);
  
 
  const [expandedIds, setExpandedIds] = useState<Set<string>>(new Set());

  const toggleDetail = (id: string) => {
    setExpandedIds(prev => {
      const updated = new Set(prev);
      if (updated.has(id)) {
        updated.delete(id); // hide detail
      } else {
        updated.add(id);    // show detail
        
      }
      return updated;
    });
    if (!session?.user?.token) {
      console.error("User token is undefined");
      return;
    }
    //updateNotification(session.user.token, id)
  };

  

  

  
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
              <h2 className="text-lg font-medium">{notifications.length} Notifications</h2>
              <div className="flex items-center">
                <span className="text-sm mr-2">Sort By:</span>
                <button className="flex items-center text-sm">
                  Default
                  <ChevronDown className="h-4 w-4 ml-1" />
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {notifications.length === 0 ? (
                <p>ยังไม่มีการแจ้งเตือน</p>
              ) : (
                notifications.map((noti) => {
                  const isExpanded = expandedIds.has(noti._id);
      
                  return (
                    <div
                      key={noti._id}
                      className={`border-l-4 rounded-md p-4 shadow-sm ${
                        noti.type === 'success'
                          ? 'border-green-500 bg-green-50'
                          : noti.type === 'warning'
                          ? 'border-yellow-500 bg-yellow-50'
                          : noti.type === 'promo'
                          ? 'border-purple-500 bg-purple-50'
                          : noti.type === 'alert'
                          ? 'border-red-500 bg-red-50'
                          : 'border-blue-500 bg-blue-50'
                      }`}
                    >
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <h4 className="font-semibold text-base">{noti.typeAction}</h4>
                          {isExpanded ? (
                            <>
                              <p className="text-sm text-gray-600 mt-1">{noti.text}</p>
                              <button
                                onClick={() => toggleDetail(noti._id)}
                                className="text-sm text-blue-600 mt-1 hover:underline"
                              >
                                Hide detail
                              </button>
                            </>
                          ) : (
                            <button
                              onClick={() => toggleDetail(noti._id)}
                              className="text-sm text-blue-600 mt-1 hover:underline"
                            >
                              Show detail
                            </button>
                          )}
                        </div>

                        {!noti.isRead && (
                          <span className="ml-2 mt-1 inline-block bg-red-500 text-white text-xs px-2 py-0.5 rounded-full">
                            new
                          </span>
                        )}
                      </div>

                      <div className="text-xs text-gray-500 mt-2">
                        {new Date(noti.createdAt).toLocaleString('th-TH', {
                          dateStyle: 'short',
                          timeStyle: 'short',
                        })}
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
  );
}
