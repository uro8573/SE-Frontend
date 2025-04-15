import HotelCatalog from "@/components/HotelCatalog"
import { LinearProgress } from "@mui/material";
import { Suspense } from "react";

export default async function Hotel() {

    return (
        <main className="text-center p-5">
            <h1 className="text-2xl text-black font-medium">Select Your Hotel</h1>
            <Suspense fallback={<p>Loading...<LinearProgress/></p>}>
                <HotelCatalog />
            </Suspense>
        </main>
    )
}