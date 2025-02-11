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
import { signupSchema } from "@/schemas/signup.schema";
import axios from "@/api/axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function SignUp() {
  const form = useForm<z.infer<typeof signupSchema>>();
  const navigate = useNavigate();

  const onSubmit = async (data: z.infer<typeof signupSchema>) => {
    const response = await axios.post('/auth/signup', JSON.stringify(data), {
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
      form.reset({ username: "", email: "", password: "", cpassword: "" });

      setTimeout(() => {
        navigate('/');
      }, 2500);
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
        <h1 className="text-3xl text-center font-bold text-rose-500">Register to BitUrls</h1>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 my-8">
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input placeholder="Username" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email Address</FormLabel>
                  <FormControl>
                    <Input placeholder="Email Address" {...field} />
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
            <FormField
              control={form.control}
              name="cpassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirm Password</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="Confirm Password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <button className="bg-rose-500 text-white px-4 py-2 rounded-lg font-medium shadow-md w-full hover:shadow-lg hover:bg-rose-600 transition">
              Register
            </button>
          </form>
        </Form>
      </div>
    </div>
  )
}
