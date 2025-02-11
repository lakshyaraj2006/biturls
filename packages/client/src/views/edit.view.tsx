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
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { urlSchema } from "@/schemas/url.schema";
import useAuth from "@/hooks/useAuth";
import { useEffect } from "react";

export default function EditUrl() {
    const form = useForm<z.infer<typeof urlSchema>>();
    const { auth } = useAuth();
    const navigate = useNavigate();
    const params = useParams();
    const { id } = params;

    useEffect(() => {
        getUrlData();
    }, [])

    const getUrlData = async () => {
        const response = await axios.get(`/urls/?id=${id}`, {
            headers: {
                'Authorization': `Bearer ${auth.authToken}`
            },
            withCredentials: true
        });

        form.setValue("url", response.data.url.url);
    };

    const onSubmit = async (data: z.infer<typeof urlSchema>) => {
        const response = await axios.put(`/urls/update?id=${id}`, JSON.stringify(data), {
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

            form.setValue("url", form.getValues("url"));

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
        <div className="container px-24 my-8">
            <h1 className="text-2xl font-bold text-rose-500 mb-6">Edit Your URL</h1>
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
                        Update
                    </button>
                </form>
            </Form>
        </div>
    )
}
