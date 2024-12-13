"use client"

import { Button } from '@/components/ui/button'
import { Form } from '@/components/ui/form'
import { FormInput } from '@/components/ui/form-input'
import { Label } from '@/components/ui/label'
import React from 'react'
import { useLogin } from '../_hooks/useLogin'
import { useForm } from 'react-hook-form'
import Link from 'next/link'

type TFormFields = {
    email: string,
    password: string
}

function Login() {

    const { loginFn, isLoading } = useLogin()

    const form = useForm<TFormFields>({
        defaultValues:{
            email:"",
            password:""
        },
    })

    return (
        <section className='h-screen flex justify-center items-center'>
            <Form
                form={form}
                handleSubmit={loginFn}
                className="flex p-4 py-10 rounded-lg border flex-col w-[90%] sm:w-[500px]"
            >
                <h1 className='form_heading mb-10'>Welcome Back!</h1>
                <div className="space-y-5">
                    <div>
                        <Label>Email</Label>
                        <FormInput 
                            placeholder="Ex: John_doe@example.xyz"
                            name="email"
                            type="email"
                        />
                    </div>
                    <div>
                        <Label>Password</Label>
                        <FormInput 
                            placeholder="Enter Your First Name"
                            name="password"
                            type="password"
                        />
                    </div>
                </div>
                <p className="text-sm space-x-1 mb-5 mt-2">
                    <span>{"Don't"} Have An Account?</span>
                    <Link
                        href="/auth/register" 
                        className="text-blue-500"
                    >Register</Link>
                </p>
                <Button disabled={isLoading} type="submit">Login</Button>
            </Form>
        </section>
    )
}

export default Login