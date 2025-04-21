"use client";
import { useRouter } from "next/navigation";

export default function Banner() {
    const router = useRouter();

    return (
        <section
            className="relative h-[75vh] bg-cover bg-center"
            style={{ backgroundImage: "url(/res/img/home/banner.jpg)" }}
        >
            <div className="absolute inset-0 bg-black/40 flex flex-col justify-center items-center text-white px-4 text-center gap-9">
                <h2 className="text-h2-heading">
                    Your Journey Starts with<br/>
                    The Perfect Stay
                </h2>
                <p className="text-p3-paragraphy-small">
                    unique spots, local charm, and rooms made for explorers.
                </p>

                <div className="flex items-center justify-center">
                    <button className="w-full bg-primary-orange text-ui-label-semi-bold text-primary-dark py-4 px-16 rounded-full">
                        Explore More
                    </button>
                </div>
            </div>
        </section>
    );
}
