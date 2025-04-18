// pages/index.tsx
import Image from "next/image";
import Banner from "@/components/Banner";
import TopHotelSection from "@/components/TopHotelSection";
import FiveStarsHotel from "@/components/FiveStarsHotel";
import CustomerReviewSection from "@/components/CustomerReviewSection";

export default function Home() {
  return (
    <div className="bg-white text-black">
      <Banner />
      <TopHotelSection />
      <FiveStarsHotel />
      <CustomerReviewSection />
    </div>
  );
}
