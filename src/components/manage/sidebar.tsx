'use client'

import Link from "next/link"
import { ChevronDown } from "lucide-react"
import { usePathname } from "next/navigation";
import { useSession } from "next-auth/react";

type Section = {
    title: string;
    links: string[];
    isAdmin: boolean;
};

export default function SideBar() {

    const pathname = usePathname();

    const { data:session } = useSession();

    const items: Section[] = [
        {
          title: "History",
          links: ["Reservations", "Reviews", "Notifications"],
          isAdmin: false
        },
        {
          title: "Admin",
          links: ["Config"],
          isAdmin: true
        }
    ];

    return (
        <div className="w-full md:w-64">
            <nav className="space-y-1">
                {
                    items.map((section, index) => {

                        if(!session) return (<></>)
                        if(session?.user.role !== 'admin' && section.isAdmin) return (<></>)

                        return (
                            <div key={index}>
                                <button className="w-full flex items-center justify-between p-3 rounded-md bg-gray-100">
                                    <span className="font-medium">{section.title}</span>
                                    <ChevronDown className="h-4 w-4" />
                                </button>
                                <div className="pl-6 py-1">
                                    {
                                        section.links.map((link, idx) => {
                                            const linkHref = `/manage/${section.title.toLowerCase()}/${link.toLowerCase()}`;
                                            return (
                                                <Link key={idx} href={linkHref} className={`block py-1.5 ${pathname === linkHref ? "font-medium" : "text-gray-600"}`}>
                                                    {link}
                                                </Link>
                                            )
                                        })
                                    }
                                </div>
                            </div>
                        )
                    })
                }
            </nav>
        </div>
    )
}

// import Link from "next/link";
// import { ChevronDown } from "lucide-react";

// type Section = {
//   title: string;
//   links: string[];
// };

// export default function SideBar() {
//   const items: Section[] = [
//     {
//       title: "History",
//       links: ["Reservations", "Reviews", "Notifications"]
//     },
//     {
//       title: "Admin",
//       links: ["Manage"]
//     }
//   ];

//   return (
//     <div className="w-full md:w-64">
//       <nav className="space-y-1">
//         {items.map((section, index) => (
//           <div key={index}>
//             <button className="w-full flex items-center justify-between p-3 rounded-md bg-gray-100">
//               <span className="font-medium">{section.title}</span>
//               <ChevronDown className="h-4 w-4" />
//             </button>
//             <div className="pl-6 py-1">
//               {section.links.map((link, idx) => (
//                 <Link
//                   key={idx}
//                   href={`/manage/${section.title.toLowerCase()}/${link.toLowerCase()}`}
//                   className="block py-1.5 text-gray-600"
//                 >
//                   {link}
//                 </Link>
//               ))}
//             </div>
//           </div>
//         ))}
//       </nav>
//     </div>
//   );
// }
