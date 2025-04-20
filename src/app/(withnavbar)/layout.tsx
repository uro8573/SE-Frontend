import TopMenu from "@/components/topmenu/TopMenu";
import NextAuthProvider from "@/providers/NextAuthProvider";
import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]/authOptions";

export default async function layout_name ({ children } : { children: React.ReactNode }) {
  const session = await getServerSession(authOptions);
  
  return (
    <NextAuthProvider session={session}>
      <TopMenu />
      <div className="mt-[100px]">{children}</div>
    </NextAuthProvider>
  )
}