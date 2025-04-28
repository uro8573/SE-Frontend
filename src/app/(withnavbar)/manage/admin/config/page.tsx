'use client'

import Link from "next/link"
import Image from "next/image"
import { ChevronDown, MapPin, User, HomeIcon, Calendar, Pencil } from "lucide-react"
import { ToastContainer, toast } from "react-toastify"
import { TextField } from '@mui/material'
import { useState, useEffect } from 'react'
import { useSession } from "next-auth/react"
import SideBar from "@/components/manage/sidebar"
import getAdminConfig from "@/libs/getAdminConfig"
import updateAdminConfig from "@/libs/updateAdminConfig"

export default function Dashboard() {
  const { data: session } = useSession();
  const [config, setConfig] = useState(null);

  const [loading, setLoading] = useState<boolean>(true);
  const [notiPeriod, setNotiPeriod] = useState<number>(-1);

  useEffect(() => {

    if(!loading) return;

    const getConfig = async () => {
      try {
        if (!session?.user?.token) throw new Error("User token is undefined");
        const response = await getAdminConfig({token: session?.user.token});
        setConfig(response.data);
        console.log(response.data);
      } catch(err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    getConfig();

  });

  const updateConfig = async () => {
    
    try {
      if (!session?.user?.token) throw new Error("User token is undefined");

      const response = await updateAdminConfig({token: session?.user.token, noti_period: notiPeriod});

      if(response.success) {
        toast.success("Update config successfully.");
      } else toast.error(response.message || "An Error has occured while updating config.");

    } catch(err) {
      toast.error(`${err}`);
    }

  }

  if(!loading && notiPeriod == -1) {
    setNotiPeriod(config.noti_period);
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
              <h2 className="text-lg font-medium">Admin Config</h2>
            </div>

            {
              loading ? (
                <div>
                  Loading...
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  <div className="flex flex-col">
                    <TextField type="number" label={`Notification Period : day(s)`} variant="standard" value={notiPeriod} onChange={(e) => setNotiPeriod(parseInt(e.target.value))}/>
                    <button 
                    className="my-5 w-1/3 bg-lime-400 text-ui-label-semi-bold text-primary-dark py-3 rounded-full duration-300 hover:bg-lime-500"
                    onClick={updateConfig} >
                        Save
                    </button>
                  </div>
                </div>
              )
            }
          </div>
        </div>
        <ToastContainer/>
      </main>
    </div>
  )
}
