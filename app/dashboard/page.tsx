import Link from "next/link";
import {buttonVariants} from "@/components/ui/button";
import {prisma} from "@/app/utils/db";
import {getKindeServerSession} from "@kinde-oss/kinde-auth-nextjs/server";
import {BlogPostCard} from "@/components/general/BlogPostCard";

async function getData(userId: string) {
    // await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulate a delay for demonstration purposes

    const data = await prisma.blogPost.findMany({
        where: {
            authorId: userId,
        },
        orderBy: {
            createdAt: "desc",
        }

    })
    return data
}

export default async function DashboardRoute() {

    const {getUser} = getKindeServerSession()
    const user = await getUser(); // ✅ now user is a real object, not a Promise

    if (!user) {
        throw new Error("User not authenticated");
    }

    const data = await getData(user.id);
    return (
        <>
            <div>
                <div className={"flex items-center justify-between mb-4"}>
                    <h2 className={"text-xl font-medium"}>Your blog articles</h2>

                    <Link href={"/dashboard/create"} className={buttonVariants()}>Create post</Link>
                </div>

                <div className={"grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"}>
                    {
                        data.map((post) => (
                            <BlogPostCard data={post} key={post.id} />
                        ))
                    }
                </div>
            </div>
        </>
    )
}