import Link from "next/link";
import Image from "next/image";

export default function Contact({ message, iconUrl }: { message: string, iconUrl: string }) {

    return (
        <div className="flex flex-row gap-[0.5rem] justify-between items-center px-3 py-2 bg-transparent-bg rounded-full border border-transparent-stroke">
            <Image
                src={iconUrl}
                alt="Contact Icon"
                width={20}
                height={20}
            />
            <p>{message}</p>
        </div>
    );
}
