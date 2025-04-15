import TopMenuItem from './TopMenuItem';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/authOptions';
import { Link } from '@mui/material';

export default async function TopMenu() {

    const session = await getServerSession(authOptions);

    return (
        <div className="w-full h-[100px] bg-white absolute top-0 left-0 z-30">
            <div className="flex h-full justify-between ml-[5%] mr-[5%] items-center">
                <div>
                    <span className="text-[#F3E158] text-[28px] font-bold">UFA</span>
                    <span className="text-[#D3C44E] text-[28px] font-bold">888</span>
                </div>
                <div className="flex">
                    <TopMenuItem title="Home" pageRef='/'/>
                    <TopMenuItem title="Booking" pageRef='/booking'/>
                </div>
                <div className='flex flex-row gap-2'>
                    <Link href={session ? "/api/auth/signout" : "/api/auth/signin"}>
                        <div className="text-[14px] bg-black text-white px-[24px] py-[14px] rounded-lg hover:shadow-xl hover:bg-white hover:text-black duration-300">
                                {session ? `Sign Out` : `Sign In`}
                        </div>
                    </Link>
                    {
                        !session ? (
                            <Link href={"/api/auth/signup"}>
                                <div className="text-[14px] bg-white text-black border border-black px-[24px] py-[14px] rounded-lg hover:shadow-xl hover:bg-black hover:text-white duration-300">
                                        Sign Up
                                </div>
                            </Link>
                        ) : ""
                    }
                </div>
            </div>
        </div>
    )
}