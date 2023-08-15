'use client'

import Link from "next/link";
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { ErrorMessage } from '@hookform/error-message';
import { signIn} from 'next-auth/react';
import Button from "@/components/ui/button";
import { useState } from "react";
import { useRouter } from "next/navigation";

const schema = yup
  .object({
    name: yup.string().required(),
    email: yup.string().email().required(),
    password: yup.string()
        .min(6, "Password must be longer that 6 letters")
        .required(),
    signUp: yup.string()
  })
  .required();

const SignupPage = () => {
    const router = useRouter();
    const [loading, setLoading] = useState<boolean>(false);
    const {
        formState: { errors, isDirty, isValid, isSubmitting },
        handleSubmit,
        register,
        reset,
        setError,
      } = useForm({
        mode: 'onChange',
        resolver: yupResolver(schema),
      });

    const onSubmit = async (value: {
        name: string,
        email: string,
        password: string
    }) => {
      try {
        setLoading(true);
        const response = await fetch("/api/signup", {
            method: "POST",
            body: JSON.stringify(value)
        })

        const data = await response.json();

        if (!data.success) {
        // Parse errors
            setError('signUp', {
                type: 'api',
                message: data.message,
            }); 
        }
        else {
            const retSignin = await signIn("credentials", {
                redirect: false,
                email: value.email,
                password: value.password
            });
            if (retSignin) {
                const { error } = retSignin;
                if( error ) {
                    setError("signUp", {
                        type: "api",
                        message: "Invalid username or password",
                    });
                    reset();
        
                }
                else {
                    router.replace('/');
                }
            }
        
        }
        reset();
      } catch (error) {
        setError('signUp', {
            type: 'api',
            message: 'Unknown error. try again later',
        });
      }
      finally{
        setLoading(false);
      }
    };
    

    return (
      <>
        <div className="mx-auto max-w-[500px] rounded-md bg-primary bg-opacity-5 py-10 px-6 dark:bg-dark sm:p-[60px]">
            <h3 className="mb-3 text-center text-2xl font-bold text-black dark:text-white sm:text-3xl">
                Create your account
            </h3>
            <form 
                onSubmit={handleSubmit(onSubmit)}
            >
                <div className="mb-8">
                    { errors.signUp && !isDirty && (
                        <ErrorMessage 
                            errors={errors}
                            name="signUp"
                            render={({message}) => <p>{message}</p>}
                        />
                    )}
                    <label
                        htmlFor="name"
                        className="mb-3 block text-sm font-medium text-dark dark:text-white"
                    >
                        {" "}
                        Full Name{" "}
                    </label>
                    <input
                        type="text"
                        placeholder="Enter your full name"
                        className="w-full rounded-md border border-transparent py-3 px-6 text-base text-body-color placeholder-body-color shadow-one outline-none focus:border-primary focus-visible:shadow-none dark:bg-[#242B51] dark:shadow-signUp"
                        { ...register("name") }
                    />
                    <ErrorMessage 
                        errors={errors}
                        name="name"
                        render={({ message }) => <p>{message}</p>}
                    />
                </div>
                <div className="mb-8">
                    <label
                        htmlFor="email"
                        className="mb-3 block text-sm font-medium text-dark dark:text-white"
                    >
                        {" "}
                        Work Email{" "}
                    </label>
                    <input
                        type="email"
                        placeholder="Enter your Email"
                        className="w-full rounded-md border border-transparent py-3 px-6 text-base text-body-color placeholder-body-color shadow-one outline-none focus:border-primary focus-visible:shadow-none dark:bg-[#242B51] dark:shadow-signUp"
                        { ...register("email")}
                    />
                    <ErrorMessage 
                        errors={errors}
                        name="email"
                        render={({message}) => <p>{message}</p>}
                    />
                </div>
                <div className="mb-8">
                    <label
                        htmlFor="password"
                        className="mb-3 block text-sm font-medium text-dark dark:text-white"
                    >
                        {" "}
                        Your Password{" "}
                    </label>
                    <input
                        type="password"
                        placeholder="Enter your Password"
                        className="w-full rounded-md border border-transparent py-3 px-6 text-base text-body-color placeholder-body-color shadow-one outline-none focus:border-primary focus-visible:shadow-none dark:bg-[#242B51] dark:shadow-signUp"
                        { ...register("password") }
                    />
                    <ErrorMessage 
                        errors={errors}
                        name="password"
                        render={({message}) => <p>{message}</p>}
                    />
                </div>
                <div className="mb-8 flex">
                <label
                    htmlFor="checkboxLabel"
                    className="flex cursor-pointer select-none text-sm font-medium text-body-color"
                >
                    <div className="relative">
                    <input
                        type="checkbox"
                        id="checkboxLabel"
                        className="sr-only"
                    />
                    <div className="box mr-4 mt-1 flex h-5 w-5 items-center justify-center rounded border border-body-color border-opacity-20 dark:border-white dark:border-opacity-10">
                        <span className="opacity-0">
                        <svg
                            width="11"
                            height="8"
                            viewBox="0 0 11 8"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                            d="M10.0915 0.951972L10.0867 0.946075L10.0813 0.940568C9.90076 0.753564 9.61034 0.753146 9.42927 0.939309L4.16201 6.22962L1.58507 3.63469C1.40401 3.44841 1.11351 3.44879 0.932892 3.63584C0.755703 3.81933 0.755703 4.10875 0.932892 4.29224L0.932878 4.29225L0.934851 4.29424L3.58046 6.95832C3.73676 7.11955 3.94983 7.2 4.1473 7.2C4.36196 7.2 4.55963 7.11773 4.71406 6.9584L10.0468 1.60234C10.2436 1.4199 10.2421 1.1339 10.0915 0.951972ZM4.2327 6.30081L4.2317 6.2998C4.23206 6.30015 4.23237 6.30049 4.23269 6.30082L4.2327 6.30081Z"
                            fill="#3056D3"
                            stroke="#3056D3"
                            strokeWidth="0.4"
                            />
                        </svg>
                        </span>
                    </div>
                    </div>
                    <span>
                    By creating account means you agree to the
                    <a href="#0" className="text-primary hover:underline">
                        {" "}
                        Terms and Conditions{" "}
                    </a>
                    , and our
                    <a href="#0" className="text-primary hover:underline">
                        {" "}
                        Privacy Policy{" "}
                    </a>
                    </span>
                </label>
                </div>
                <div className="mb-6">
                    {/* <button 
                        className="flex w-full items-center justify-center rounded-md bg-primary py-4 px-9 text-base font-medium text-white transition duration-300 ease-in-out hover:bg-opacity-80 hover:shadow-signUp"
                        disabled={isDirty && !isValid}
                        type="submit"
                    >
                        Sign up
                    </button> */}
                    <Button 
                        className="w-full"
                        size="large"
                        loading={loading}
                        disabled={isDirty && !isValid}
                        type="submit"
                    >
                        Sign Up
                    </Button>
                </div>
            </form>
            <p className="text-center text-base font-medium text-body-color">
                Already using Startup?
                <Link href="/signin" className="text-primary hover:underline">
                Sign in
                </Link>
            </p>
        </div>
      </>
    );
};

export default SignupPage;
