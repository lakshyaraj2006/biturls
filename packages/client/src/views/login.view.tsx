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
import { signinSchema } from "../schemas/signin.schema";
import axios from "@/api/axios";
import useAuth from "@/hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function Login() {
  const form = useForm<z.infer<typeof signinSchema>>();
  const { setAuth } = useAuth();
  const navigate = useNavigate();

  const onSubmit = async (data: z.infer<typeof signinSchema>) => {
    const response = await axios.post('/auth/login', JSON.stringify(data), {
      headers: {
        'Content-Type': 'application/json'
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

    const { success, message, accessToken } = response?.data;

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

      form.reset({ identifier: "", password: "" });
      
      setTimeout(() => {
        setAuth({ authToken: accessToken });
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
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="p-6 bg-white rounded-lg shadow w-1/3">
        <h1 className="text-3xl text-center font-bold text-rose-500">Login to BitUrls</h1>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 my-8">
            <FormField
              control={form.control}
              name="identifier"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Identifier</FormLabel>
                  <FormControl>
                    <Input placeholder="Email or Username" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="Password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <button className="bg-rose-500 text-white px-4 py-2 rounded-lg font-medium shadow-md w-full hover:shadow-lg hover:bg-rose-600 transition">
              Log In
            </button>
          </form>
        </Form>
      </div>
    </div>
  )
}
