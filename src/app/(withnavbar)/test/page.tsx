"use client"

import { useEffect, useState } from "react";
import { HotelItem } from '../../../../interfaces'
import getHotels from '@/libs/getHotels'
import Image from "next/image";
import { Star } from "lucide-react";

export default function Page() {
  const [hotels, setHotels] = useState<Hotel[]>([]);

  useEffect(() => {
    const fetchHotels = async () => {
      try {
        const response = await getHotels(); // สมมุติ return เป็น HotelJson
        setHotels(response.data); // << ดึง .data จาก HotelJson
      } catch (error) {
        console.error("เกิดข้อผิดพลาดในการโหลดโรงแรม:", error);
      }
    };

    fetchHotels();
  }, []);

  return (
    <div className="container mx-auto p-4 flex flex-col md:flex-row gap-4 text-black">
      {/* Sidebar Filters */}
      <div className="w-full md:w-1/4 bg-white p-4 rounded shadow">
        <h2 className="text-xl font-semibold mb-4">ค้นหาที่พัก</h2>

        {/* Filters */}
        <div className="mb-4">
          <label className="block mb-2 font-medium">ช่วงราคา</label>
          <input type="range" min="500" max="5000" className="w-full" />
        </div>

        <div className="mb-4">
          <label className="block mb-2 font-medium">เรตติ้ง</label>
          {[2, 3, 4, 5].map((rating) => (
            <div key={rating} className="flex items-center mb-2">
              <input type="radio" id={`rating-${rating}`} name="rating" className="mr-2" />
              <label htmlFor={`rating-${rating}`}>
                {Array.from({ length: rating }, (_, i) => (
                  <Star key={i} size={16} className="inline text-yellow-500" />
                ))}
              </label>
            </div>
          ))}
        </div>

        <div className="mb-4">
          <label className="block mb-2 font-medium">จังหวัด</label>
          {["กรุงเทพ", "เชียงใหม่", "ภูเก็ต"].map((province) => (
            <div key={province} className="flex items-center mb-1">
              <input type="checkbox" className="mr-2" />
              <label>{province}</label>
            </div>
          ))}
        </div>
      </div>

      {/* Hotel List */}
      <div className="w-full md:w-3/4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {hotels.length === 0 ? (
          <p>กำลังโหลดข้อมูลโรงแรม...</p>
        ) : (
          hotels.map((hotel) => (
            <div key={hotel._id} className="bg-white rounded-lg shadow overflow-hidden">
              <Image
                src={"/placeholder.jpg"} // คุณสามารถใช้ hotel.imageUrl ถ้ามี
                alt={hotel.name}
                width={400}
                height={250}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h3 className="text-lg font-semibold">{hotel.name}</h3>
                <p className="text-gray-500 text-sm">{hotel.address}, {hotel.district}, {hotel.province}</p>
                <div className="mt-2 text-blue-600 font-bold">{hotel.dailyRate} บาท / คืน</div>
                <div className="text-sm text-gray-600 mt-1">โทร: {hotel.tel}</div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
