import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card";
import {Label} from "@/components/ui/label"
import {Input} from "@/components/ui/input";
import {Textarea} from "@/components/ui/textarea";
import {Button} from "@/components/ui/button";
import React from "react";
import {handleSubmit} from "@/app/actions";


export default function CreateBlogroute() {



    return (
        <>
            <div>
                <Card className={"max-w-lg mx-auto"}>
                    <CardHeader>
                        <CardTitle>Create Post</CardTitle>
                        <CardDescription>Create a new post to share with the world</CardDescription>
                    </CardHeader>

                    <CardContent>
                        <form className="flex flex-col gap-4" action={handleSubmit}>
                            <div className="flex flex-col gap-2">
                                <Label htmlFor="title">Title</Label>
                                <Input required type="text" placeholder="Title" name={"title"} />
                            </div>

                            <div className="flex flex-col gap-2">
                                <Label>Content</Label>
                                <Textarea required placeholder="Content" name={"content"} />
                            </div>

                            <div className="flex flex-col gap-2">
                                <Label>Image URL</Label>
                                <Input required type="url" placeholder="Image url" name={"url"} />
                            </div>

                            <Button>Create Post</Button>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </>
    )
        ;
}