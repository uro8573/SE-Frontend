import Service from "./Service"

export default function ServicePanel() {
    return (
        <div className="w-full mt-[5%] relative">
            <div className="text-3xl text-black font-bold mb-[30px]">
                Service
            </div>
            <div className="flex w-full flex-wrap h-full gap-[30px] justify-around items-center">
                <Service title="Rooms" imgSrc="/img/rooms_main.png"/>
                <Service title="Evening" imgSrc="/img/evening_main.png"/>
                <Service title="Food" imgSrc="/img/food_main.png"/>
                <Service title="Beach" imgSrc="/img/beach_main.png"/>
                <Service title="Appartment" imgSrc="/img/appartment_main.png"/>
                <Service title="Sun Rises" imgSrc="/img/sunrise_main.png"/>
            </div>
        </div>
    )
}