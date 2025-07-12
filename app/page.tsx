import { prisma} from "./utils/db"
import {BlogPostCard} from "@/components/general/BlogPostCard";
import {Suspense} from "react";
import {LoaderCircle} from "lucide-react";

async function getData() {
    // await new Promise((resolve) => setTimeout(resolve, 1000));
    return prisma.blogPost.findMany({
        select: {
            title: true,
            content: true,
            imageUrl: true,
            authorImage: true,
            authorName: true,
            id: true,
            createdAt: true,
            authorId: true,
            updatedAt: true,
        }
    });
}

export default function Home() {
    return (
        <>
            <div className="py-6">
                <h1 className={"text-3xl font-bold tracking-tight mb-8"}>
                    Latest posts
                </h1>

                <Suspense fallback={<LoaderCircle className="animate-spin h-6 w-6 text-muted-foreground" />}>
                <BlogPosts />
                </Suspense>
            </div>
        </>
    );
}

async function BlogPosts() {
    const data = await getData();
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {data.map((item) => (
                <BlogPostCard data={item} key={item.id} />
            ))}
        </div>
    );
}