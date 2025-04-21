// TopMenu.tsx (server component)
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/(withoutnavbar)/api/auth/[...nextauth]/authOptions';
import TopMenuClient from './TopMenuClient';

export default async function TopMenu() {
    const session = await getServerSession(authOptions);
    return <TopMenuClient session={session} />;
}
