import { useParams } from "react-router-dom";
import axios from "@/api/axios";
import { useEffect, useState } from "react";


export default function RedirectToURL() {
    const params = useParams();
    const { id } = params;
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        redirect();
    })

    const redirect = async () => {
        const response = await axios.get(`/urls/redirect?id=` + id);
        window.location.href = response.data.url;
        setLoading(false);
    }

    return <div className="px-24 my-3">
        {loading && <h1 className="font-bold text-4x text-rose-500">Redirecting you to the url...</h1>}
    </div>

}


