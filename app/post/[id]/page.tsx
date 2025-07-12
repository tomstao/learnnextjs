import {prisma} from "@/app/utils/db";
import {notFound} from "next/navigation";
import Link from "next/link";
import {buttonVariants} from "@/components/ui/button";
import Image from "next/image";
import {Card, CardContent} from "@/components/ui/card";

async function getData(id: string) {
    const data = await prisma.blogPost.findUnique({
        where: {
            id: id,
        },
    })

    if (!data) {
        return notFound();
    }

    return data
}

type Params = Promise<{id: string}>;

export default async function IdPage({params}: {params: Params}) {
    const {id} = await params;
    const data = await getData(id)

    return(
        <div className="max-w-3xl mx-auto py-8 px-4">
            <Link href={`/`} className={buttonVariants({variant: "secondary"})}>
                Back to Posts
            </Link>

            <div className="mb-8 mt-6">

                <h1 className={'text-3xl font-bold tracking-tight mb-4'}>{data.title}</h1>
                <div className={'flex items-center space-x-4'}>
                    <div className="flex items-center space-x-2">
                            <div className="relative size-10 overflow-hidden rounded-full">
                                <Image fill
                                       src={data.authorImage}
                                       alt={data.authorName}
                                       className="object-cover"/>
                            </div>

                            <p className="text-sm font-medium text-gray-700">
                                {data.authorName}
                            </p>
                        </div>

                        <p className={"text-sm text-gray-500"}>{new Intl.DateTimeFormat('en-US',
                            {
                                year: 'numeric',
                                month: 'short',
                                day: 'numeric',
                            }).format(data.createdAt)
                        }
                        </p>
                    </div>
                </div>

                <div className={"relative h-[400px] w-full mb-8 overflow-hidden rounded-lg"}>
                    <Image
                        src={data.imageUrl}
                        alt={data.title}
                        fill
                        className="object-cover"
                        priority
                    />
                </div>

                <Card>
                    <CardContent>
                        <p className={"text-gray-700"}>
                            {data.content}
                        </p>
                    </CardContent>
                </Card>
            </div>
    )
}