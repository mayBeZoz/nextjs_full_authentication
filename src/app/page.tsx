import Link from "next/link";

export default function Home() {
    return (
        <div>
            <div>Home</div>
            <Link href="/dashboard">dashboard</Link>
            <Link href="/none-found">not exits route</Link>
        </div>
    );
}
