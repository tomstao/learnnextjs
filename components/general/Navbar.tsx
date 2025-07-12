import Link from "next/link";
import {buttonVariants} from "@/components/ui/button";
import {RegisterLink, LoginLink, LogoutLink} from "@kinde-oss/kinde-auth-nextjs/components";
import {getKindeServerSession} from "@kinde-oss/kinde-auth-nextjs/server";

export async function Navbar() {
    const {getUser} = getKindeServerSession();
    const user = await getUser();


    return (
        <nav className="py-5 flex items-center justify-between">
            <div className={"flex items-center gap-6"}>
                <Link href="/">
                    <h1 className={"text-3xl font-semibold "}>Blog<span className={"text-blue-500"}>Marshal</span></h1>
                </Link>

                <div className={"hidden sm:flex items-center gap-6"}>
                    <Link className={"text-sm font-medium hover:text-blue-500 transition-colors"} href="/">Home</Link>
                    <Link className={"text-sm font-medium hover:text-blue-500 transition-colors"}
                          href="/dashboard">Dashboard</Link>
                </div>

            </div>

            {user ? (
                <div className={"flex items-center gap-4"}>
                    <div>{user.given_name}</div>
                    <LogoutLink className={buttonVariants({variant: "secondary"})}>Logout</LogoutLink>
                </div>

            ) : (
                <div className={"flex items-center gap-4"}>
                    <LoginLink className={buttonVariants()}>Log in</LoginLink>
                    <RegisterLink className={buttonVariants({variant: "secondary"})}>Sign up</RegisterLink>
                </div>
            )}
        </nav>
    )
}