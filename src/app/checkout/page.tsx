import Image from "next/image"
import Link from "next/link"

import { ChevronLeft, MapPin, Plus, Star } from "lucide-react"
import { Button } from "@mui/material"

export default function CheckoutPage() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl text-black">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm mb-6">
        <Link href="/search" className="flex items-center gap-1 text-gray-600">
          <ChevronLeft className="h-4 w-4" />
          Search
        </Link>
        <span className="text-gray-400">•</span>
        <Link href="/details" className="text-gray-600">
          Details
        </Link>
        <span className="text-gray-400">•</span>
        <span className="font-medium">Check Out</span>
      </div>

      <h1 className="text-3xl font-bold mb-2">Check Out</h1>

      <div className="flex items-center gap-2 mb-8">
        <span className="font-medium">The Havencrest</span>
        <div className="flex items-center gap-1">
          <MapPin className="h-4 w-4 text-gray-500" />
          <span className="text-gray-600">Bangkok, Thailand</span>
        </div>
        <div className="flex items-center gap-1">
          <span>4.6</span>
          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          {/* Payment Method */}
          <div className="mb-8">
            <h2 className="text-xl font-bold mb-4">Payment Method</h2>
            <div className="mb-2">
              <p className="text-sm font-medium mb-2">Saved Card</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-gray-100 rounded-lg p-4 flex items-center gap-4">
                  <div className="w-10 h-6 flex items-center">
                    <svg viewBox="0 0 24 24" className="w-6 h-6 text-blue-600">
                      <path fill="currentColor" d="M20 12a8 8 0 0 0-8-8v8h8z" />
                      <path fill="currentColor" d="M12 4a8 8 0 0 0 0 16V4z" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-medium">Paypal ending in 1234</p>
                    <p className="text-sm text-gray-500">Expiry 06/2025</p>
                  </div>
                </div>
                <div className="bg-gray-100 rounded-lg p-4 flex items-center gap-4">
                  <div className="w-10 h-6 flex items-center">
                    <svg viewBox="0 0 24 24" className="w-6 h-6 text-red-500">
                      <circle cx="12" cy="12" r="10" fill="#EB001B" opacity="0.6" />
                      <circle
                        cx="12"
                        cy="12"
                        r="10"
                        fill="#F79E1B"
                        opacity="0.6"
                        style={{ transform: "translateX(6px)" }}
                      />
                    </svg>
                  </div>
                  <div>
                    <p className="font-medium">Mastercard ending in 1234</p>
                    <p className="text-sm text-gray-500">Expiry 06/2025</p>
                  </div>
                </div>
                <div className="bg-gray-100 rounded-lg p-4 flex items-center gap-4">
                  <div className="w-10 h-6 flex items-center">
                    <svg viewBox="0 0 24 24" className="w-6 h-6 text-blue-800">
                      <rect width="24" height="16" fill="#1A1F71" rx="2" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-medium">Visa ending in 1234</p>
                    <p className="text-sm text-gray-500">Expiry 06/2025</p>
                  </div>
                </div>
                <div className="bg-gray-100 rounded-lg p-4 flex items-center justify-center gap-2 cursor-pointer">
                  <Plus className="h-5 w-5" />
                  <span className="font-medium">Add New Payment</span>
                </div>
              </div>
            </div>
          </div>

          {/* Cancel Policy */}
          <div className="mb-8">
            <h2 className="text-xl font-bold mb-4">Cancel Policy</h2>
            <div className="text-sm">
              <p>Free cancellation before Nov 30.</p>
              <p className="flex items-center gap-1">
                After that, the reservation is non-refundable.
                <Link href="#" className="text-blue-600 font-medium">
                  Learn more
                </Link>
              </p>
            </div>
          </div>

          {/* Ground Rules */}
          <div className="mb-8">
            <h2 className="text-xl font-bold mb-4">Ground rules</h2>
            <div className="text-sm">
              <p className="mb-2">We ask every guest to remember a few simple things about what makes a great guest.</p>
              <ul className="list-disc pl-5 space-y-1">
                <li>Follow the Hotel rules</li>
                <li>Be on time for check-in and check-out.</li>
                <li>No smoking in rooms or restricted areas.</li>
                <li>Respect other guests.</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Summary */}
        <div className="lg:col-span-1">
          <div className="border border-gray-200 rounded-lg overflow-hidden">
            <div className="relative h-48 w-full">
              <Image src="/placeholder.svg?height=300&width=400" alt="Hotel room" fill className="object-cover" />
            </div>
            <div className="p-4">
              <h3 className="text-lg font-bold mb-4">Summary</h3>

              <div className="space-y-2 mb-4">
                <div className="flex justify-between">
                  <span className="text-gray-600">Total Guest</span>
                  <span className="font-medium">2 Person</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Total room</span>
                  <span className="font-medium">1 Room</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Check In</span>
                  <span className="font-medium">22 December 2024</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Check Out</span>
                  <span className="font-medium">24 December 2024</span>
                </div>
              </div>

              <h4 className="font-bold mb-2">Price Details</h4>
              <div className="space-y-2 mb-4">
                <div className="flex justify-between">
                  <span className="text-gray-600">$10.99 X 1 night</span>
                  <span className="font-medium">$30</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Vat 7%</span>
                  <span className="font-medium">$2.45</span>
                </div>
              </div>

              <div className="border-t pt-4">
                <div className="flex justify-between mb-4">
                  <span className="font-bold">Total Price</span>
                  <span className="font-bold">$37.45</span>
                </div>

                <Button className="w-full bg-black hover:bg-gray-800 text-white">Confirm & Pay</Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
