import Link from "next/link";

export default function Home() {
    return (<>
            <div>
                <h1>Hellow from the home page.</h1>
                <Link href="/dashboard">Dash board</Link>
            </div>
        </>
    );
}
