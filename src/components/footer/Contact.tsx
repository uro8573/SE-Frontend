import Link from "next/link";

export default function Contact({ txt, href }: { txt: string; href: string }) {
    return (
        <div>
            <Link href={href}>{txt}</Link>
        </div>
    );
}
