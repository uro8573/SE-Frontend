import Link from "next/link"
import Image from "next/image"
import { ChevronDown, MapPin, User, HomeIcon, Calendar, Pencil } from "lucide-react"
import { Suspense } from "react"
import { LinearProgress } from "@mui/material"

export default function Dashboard() {
  return (
    <Suspense fallback={<p>Loading...<LinearProgress/></p>}>
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
                        <Link href="/manage/history/reservations" className="block py-1.5 font-medium">
                        Reservations
                        </Link>
                        <Link href="/manage/history/reviews" className="block py-1.5 text-gray-600">
                        Reviews
                        </Link>
                    </div>
                    </div>

                    <div>
                    <button className="w-full flex items-center justify-between p-3 rounded-md">
                        <span className="font-medium  ">Admin</span>
                        <ChevronDown className="h-4 w-4" />
                    </button>
                    <div className="pl-6 py-1">
                        <Link href="/manage/admin/reservations" className="block py-1.5 text-black-600 text-gray-600">
                        Reservations
                        </Link>
                        <Link href="/manage/admin/reviews" className="block py-1.5 text-gray-600">
                        Reviews
                        </Link>
                    </div>
                    </div>
                </nav>
                </div>

                {/* Main Content */}
                <div className="flex-1">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-lg font-medium">17 History Reservations</h2>
                    <div className="flex items-center">
                    <span className="text-sm mr-2">Sort By:</span>
                    <button className="flex items-center text-sm">
                        Default
                        <ChevronDown className="h-4 w-4 ml-1" />
                    </button>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {[1, 2, 3, 4, 5, 6].map((item) => (
                    <div key={item} className="border rounded-lg overflow-hidden">
                        <div className="relative h-48">
                        <Image src="/placeholder.svg?height=200&width=300" alt="Hotel room" fill className="object-cover" />
                        </div>
                        <div className="p-4">
                        <h3 className="font-medium text-lg">The Havencrest</h3>
                        <p className="text-sm text-gray-600 mt-1">
                            A serene escape nestled above the city skyline, offering luxury with a view.
                        </p>
                        <div className="flex items-center mt-3">
                            <MapPin className="h-4 w-4 text-gray-500 mr-1" />
                            <span className="text-sm text-gray-600">Bangkok</span>
                        </div>
                        <div className="flex items-center justify-between mt-3">
                            <div className="flex items-center">
                            <User className="h-4 w-4 text-gray-500 mr-1" />
                            <span className="text-sm text-gray-600">2</span>
                            </div>
                            <div className="flex items-center">
                            <HomeIcon className="h-4 w-4 text-gray-500 mr-1" />
                            <span className="text-sm text-gray-600">1</span>
                            </div>
                            <div className="flex items-center">
                            <Calendar className="h-4 w-4 text-gray-500 mr-1" />
                            <span className="text-sm text-gray-600">22/12/24</span>
                            </div>
                            <Link href= { `/manage/${item}`} className="block py-1.5 text-black-600 font-medium  ">
                            <div className="flex items-center">
                                <Pencil className="h-4 w-4 text-gray-500 mr-1" />
                            </div>
                            </Link>
                        </div>
                        </div>
                    </div>
                    ))}
                </div>
                </div>

                
            </div>
            </main>
        </div>
    </Suspense>
  )
}
