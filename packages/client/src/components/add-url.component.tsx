import { Input } from "@/components/ui/input";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormMessage,
    FormLabel
} from "@/components/ui/form";

import { useForm } from "react-hook-form";
import { z } from "zod";
import axios from "@/api/axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { urlSchema } from "@/schemas/url.schema";
import { UrlDocument } from "@/types/url-document";
import { Plus } from "lucide-react"
import useAuth from "@/hooks/useAuth";

type AddUrlProps = {
    setUrls: React.Dispatch<React.SetStateAction<UrlDocument[]>>
}

export default function AddUrl(props: AddUrlProps) {
    const form = useForm<z.infer<typeof urlSchema>>();
    const { auth } = useAuth();
    const navigate = useNavigate();

    const onSubmit = async (data: z.infer<typeof urlSchema>) => {
        const response = await axios.post('/urls/create', JSON.stringify(data), {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${auth.authToken}`
            },
            withCredentials: true
        })
            .catch(error => {
                toast.error(error.response.data.message, {
                    position: "top-right",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: false,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light"
                });
            });

        const { success, message } = response?.data;

        if (success) {
            toast.success(message, {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });

            form.reset({ url: "" });
            props.setUrls(urls => urls.concat(response?.data.data));

            setTimeout(() => {
                navigate('/');
            }, 2200);
        } else {
            toast.error(message, {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
        }
    }

    return (
        <>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 my-8">
                    <FormField
                        control={form.control}
                        name="url"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="text-lg">Enter your url</FormLabel>
                                <FormControl>
                                    <Input placeholder="Url" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <button className="bg-rose-500 text-white px-4 py-2 rounded-lg font-medium shadow-md hover:shadow-lg hover:bg-rose-600 transition">
                        <Plus />
                    </button>
                </form>
            </Form>
        </>
    )
}
