import userLogIn from '@/libs/userLogIn';
import NextAuth from 'next-auth';
import { AuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import getUserProfile from '@/libs/getUserProfile';

export const authOptions:AuthOptions = {
    providers: [
        // Authentication Provider, use Credentials Provider
        CredentialsProvider({
            name: "Credentials",
            credentials: {
              email: { label: "Email", type: "email", placeholder: "email"},
              password: { label: "Password", type: "password", placeholder: "password" }
            },
            async authorize(credentials, req) {
              if(!credentials) return null;

              const user = await userLogIn(credentials.email, credentials.password);

              if (!user || !user.token) return null;

              const userProfile = await getUserProfile(user.token);
              
              return {
                id: userProfile.data._id,
                email: userProfile.data.email,
                name: userProfile.data.name,
                role: userProfile.data.role,
                token: user.token, // ถ้าคุณอยากใช้ต่อภายหลัง
                isVerify: userProfile.data.isVerify,
              };

              
            }
          })
    ],
    session: {strategy: 'jwt'},
    callbacks: {
      async jwt({ token, user }) {
        if (user) {
          const customUser = user as {
              id: string;
              email: string;
              name: string;
              role: string;
              token: string;
              isVerify: string;
          };
  
          token.id = customUser.id;
          token.email = customUser.email;
          token.name = customUser.name;
          token.role = customUser.role;
          token.token = customUser.token;
          token.isVerify = customUser.isVerify;
      }
  
      return token;
      },
      async session({ session, token }) {
        session.user = {
            _id: token.id as string,
            email: token.email as string,
            name: token.name as string,
            role: token.role as string,
            token: token.token as string,
            isVerify: token.isVerify as string,
        };
        return session;
      }
    },
    pages: {
      signIn: "/signin",
      signOut: "/signout1",
    },
}

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST }