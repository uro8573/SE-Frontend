'use client'

import Link from "next/link"
import { ChevronDown, X } from "lucide-react"
import { useState, useEffect } from 'react'
import { useSession } from "next-auth/react"
import { notification } from "../../../../../../interfaces"
import getNotifications from "@/libs/getNotifications"
import updateNotification from "@/libs/updateNotification"

export default function Dashboard() {
  const { data: session } = useSession();
  const [notifications, setNotifications] = useState<notification[]>([]);
  const [unRead, setUnRead] = useState<Set<string>>();
  const [selectedNotification, setSelectedNotification] = useState<notification | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        setIsLoading(true);
        if (!session?.user?.token) throw new Error("User token is undefined");
        const response = await getNotifications(session.user.token);
        setNotifications(response.data);
      } catch (error) {
        console.error("เกิดข้อผิดพลาดในการโหลดการแจ้งเตือน:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchNotifications();
  }, [session]);

  // Initialize unread notifications set
  useEffect(() => {
    if (!unRead && notifications.length > 0) {
      const initialUnRead = new Set<string>();
      for (let i = 0; i < notifications.length; ++i) {
        if (notifications[i].isRead) continue;
        initialUnRead.add(notifications[i]._id);
      }
      setUnRead(initialUnRead);
    }
  }, [notifications, unRead]);

  const openNotificationDetail = async (notification: notification) => {
    setSelectedNotification(notification);
    setIsModalOpen(true);

    if (!session?.user?.token) {
      console.error("User token is undefined");
      return;
    }

    if (unRead?.has(notification._id)) {
      const newUnReadState = new Set<string>(unRead);
      newUnReadState.delete(notification._id);
      setUnRead(newUnReadState);
      
      await updateNotification(session.user.token, notification._id);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedNotification(null);
  };

  // Get background and border color based on notification type
  const getNotificationStyles = (type: string) => {
    switch (type) {
      case 'success': return 'border-green-500 bg-green-50';
      case 'warn': return 'border-yellow-500 bg-yellow-50';
      case 'info': return 'border-purple-500 bg-purple-50';
      case 'fail': return 'border-red-500 bg-red-50';
      default: return 'border-blue-500 bg-blue-50';
    }
  };

  // Render loading skeleton for notifications
  const renderLoadingSkeletons = () => {
    return Array(6).fill(0).map((_, index) => (
      <div key={`skeleton-${index}`} className="border-l-4 border-gray-300 rounded-md p-4 shadow-sm animate-pulse">
        <div className="flex justify-between items-start">
          <div className="flex-1">
            <div className="h-4 bg-gray-200 rounded w-3/4 mb-3"></div>
            <div className="h-3 bg-gray-200 rounded w-full mb-2"></div>
            <div className="h-3 bg-gray-200 rounded w-5/6 mb-2"></div>
            <div className="h-3 bg-gray-200 rounded w-1/4 mt-2"></div>
          </div>
        </div>
        <div className="h-2 bg-gray-200 rounded w-1/3 mt-4"></div>
      </div>
    ));
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
              <h2 className="text-lg font-medium">
                {isLoading 
                  ? "Loading notifications..." 
                  : `${notifications.length} Notifications`
                }
              </h2>
              <div className="flex items-center">
                <span className="text-sm mr-2">Sort By:</span>
                <button className="flex items-center text-sm">
                  Default
                  <ChevronDown className="h-4 w-4 ml-1" />
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {isLoading ? (
                renderLoadingSkeletons()
              ) : notifications.length === 0 ? (
                <div className="col-span-full text-center py-8">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                  </svg>
                  <p className="text-gray-600 mt-4">ยังไม่มีการแจ้งเตือน</p>
                </div>
              ) : (
                notifications.map((noti) => (
                  <div
                    key={noti._id}
                    className={`border-l-4 rounded-md p-4 shadow-sm transition-all hover:shadow-md ${getNotificationStyles(noti.type)}`}
                  >
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <h4 className="font-semibold text-base">{noti.typeAction}</h4>
                        <p className="text-sm text-gray-600 mt-1 line-clamp-2">{noti.text}</p>
                        <button className="text-sm text-blue-600 mt-1 cursor-pointer hover:underline" onClick={() => openNotificationDetail(noti)}>
                          View details
                        </button>
                      </div>

                      {unRead?.has(noti._id) && (
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
                ))
              )}
            </div>
          </div>
        </div>
      </main>

      {/* Modal for notification details */}
      {isModalOpen && selectedNotification && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-md mx-4 overflow-hidden">
            <div className={`py-3 px-4 border-b flex items-center justify-between ${getNotificationStyles(selectedNotification.type)}`}>
              <h3 className="font-bold text-lg">{selectedNotification.typeAction}</h3>
              <button 
                onClick={closeModal}
                className="p-1 rounded-full hover:bg-gray-200 transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            
            <div className="p-5">
              <p className="text-gray-700 mb-4">{selectedNotification.text}</p>
              
              <div className="flex justify-between items-center text-sm text-gray-500 mt-4">
                <span>Notification ID: {selectedNotification._id.substring(0, 8)}...</span>
                <span>
                  {new Date(selectedNotification.createdAt).toLocaleString('th-TH', {
                    dateStyle: 'medium',
                    timeStyle: 'short',
                  })}
                </span>
              </div>
            </div>
            
            <div className="bg-gray-50 py-3 px-5 flex justify-end">
              <button 
                onClick={closeModal}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}