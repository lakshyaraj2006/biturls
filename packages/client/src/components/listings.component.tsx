import React, { useState, useEffect } from "react";
import useAuth from "@/hooks/useAuth";
import axios from "@/api/axios";
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Button } from "./ui/button";
import { Copy, Edit, Trash } from "lucide-react";
import { UrlDocument } from "@/types/url-document";
import { toast } from "react-toastify";
import AddUrl from "./add-url.component";
import { Link } from "react-router-dom";

export default function Listings() {
    const [urls, setUrls] = useState<UrlDocument[]>([] as UrlDocument[]);
    const { auth } = useAuth();

    useEffect(() => {
        fetchUrls();
    }, [])


    const fetchUrls = async () => {
        const response = await axios.get('/urls', {
            headers: {
                'Authorization': `Bearer ${auth.authToken}`
            },
            withCredentials: true
        })

        setUrls(response.data.urls);
    }

    const copyFn = (e: React.MouseEvent<HTMLButtonElement>) => {
        const index = parseInt(e.currentTarget.getAttribute('data-index')!);
        const url = urls.at(index);
        window.navigator.clipboard.writeText(window.location.origin + '/visit/' + url?.shortenID);

        toast.success('Url copied to clipboard!');
    }

    const deleteFn = async (e: React.MouseEvent<HTMLButtonElement>) => {
        const id = e.currentTarget.getAttribute('data-id')!;

        if (window.confirm('Are you sure, you want to delete this url ?\nThis action is irreversible!')) {
            const response = await axios.delete(`/urls/delete?id=${id}`, {
                headers: {
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

                setUrls(prev => prev.filter(item => item._id !== id));
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
    }

    return (
        <>
            <h1 className="text-2xl font-bold text-rose-500 mb-6">Add URL</h1>

            <AddUrl setUrls={setUrls} />

            <h1 className="text-2xl font-bold text-rose-500 mb-6">Your Shortened URLs</h1>
            {
                urls.length !== 0 && <Table>
                    <TableCaption>A list of your shortened urls.</TableCaption>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="text-center">Sl No</TableHead>
                            <TableHead className="text-center">Url</TableHead>
                            <TableHead className="text-center">Created</TableHead>
                            <TableHead className="text-center">Updated</TableHead>
                            <TableHead className="text-center">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {urls.map((url, index) => (
                            <TableRow key={url._id}>
                                <TableCell className="text-center">{index + 1}</TableCell>
                                <TableCell className="font-medium text-center">{window.location.origin + '/visit/' + url.shortenID}</TableCell>
                                <TableCell className="text-center">{new Date(url.createdAt).toLocaleString()}</TableCell>
                                <TableCell className="text-center">{new Date(url.updatedAt).toLocaleString()}</TableCell>
                                <TableCell className="flex gap-2 items-center justify-center">
                                    <Button data-index={index} onClick={copyFn}><Copy /></Button>

                                    <Link to={`/edit/${url._id}`}><Button className="bg-emerald-500 hover:bg-emerald-500"><Edit /></Button></Link>

                                    <Button variant="destructive" data-id={url._id} onClick={deleteFn}><Trash /></Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table >
            }

            {
                urls.length === 0 && <p className="text-lg">You have no urls!</p>
            }
        </>
    )
}
