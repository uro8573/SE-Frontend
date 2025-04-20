import Link from "next/link"
import { ChevronDown, Edit, Star } from "lucide-react"

export default function Dashboard() {
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
                <button className="w-full flex items-center justify-between p-3 rounded-md bg-gray-100">
                  <span className="font-medium">History</span>
                  <ChevronDown className="h-4 w-4" />
                </button>
                <div className="pl-6 py-1">
                  <Link href="/manage/history/reservations" className="block py-1.5 text-gray-600">
                    Reservations
                  </Link>
                  <Link href="/manage/history/reviews" className="block py-1.5 font-medium">
                    Reviews
                  </Link>
                </div>
              </div> */}

              <div>
                <button className="w-full flex items-center justify-between p-3 rounded-md hover:bg-gray-100">
                  <span className="font-medium">Admin</span>
                  <ChevronDown className="h-4 w-4" />
                </button>
                <div className="pl-6 py-1">
                  <Link href="/manage/admin/reservations" className="block py-1.5 text-gray-600">
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
              <h2 className="text-lg font-medium">5 History Reviews</h2>
              <div className="flex items-center">
                <span className="text-sm mr-2">Sort By:</span>
                <button className="flex items-center text-sm">
                  Default
                  <ChevronDown className="h-4 w-4 ml-1" />
                </button>
              </div>
            </div>

            <div className="space-y-4">
              {[1, 2, 3, 4, 5].map((item) => (
                <div key={item} className="flex gap-4 p-4 border-b">
                  <div className="w-8 h-8 bg-gray-200 rounded-full flex-shrink-0"></div>
                  <div className="flex-1">
                    <div className="flex justify-between">
                      <Link href="#" className="font-medium hover:underline">
                        The Havencrest
                      </Link>
                      <button>
                        <Edit className="h-4 w-4 text-gray-500" />
                      </button>
                    </div>
                    <div className="flex my-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star key={star} className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                      ))}
                    </div>
                    <p className="text-sm text-gray-600">
                      This place feels like stepping into a romantic novel. The vintage decor is gorgeous, and the staff
                      made our anniversary weekend extra special.
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>

      
    </div>
  )
}
