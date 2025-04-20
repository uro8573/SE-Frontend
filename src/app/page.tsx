// pages/index.tsx
import Image from "next/image";
import Banner from "@/components/home/Banner";
import TopHotelSection from "@/components/home/TopHotelSection";
import FiveStarsHotel from "@/components/home/FiveStarsHotel";
import CustomerReviewSection from "@/components/home/CustomerReviewSection";
import TopMenu from "@/components/topmenu/TopMenu";
import Footer from "@/components/footer/FooterHome";

export default function Home() {
  return (
    <div>
      <TopMenu />
      <div className="bg-white flex flex-col gap-20 md:gap-32 lg:gap-[256px] text-black">
        <Banner />
        <TopHotelSection />
        <FiveStarsHotel />
        <CustomerReviewSection />
        <Footer />
      </div>
    </div>
  );
}
