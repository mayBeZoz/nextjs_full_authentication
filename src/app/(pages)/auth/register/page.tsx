"use client"

import { Form } from "@/components/ui/form"
import { FormInput } from "@/components/ui/form-input"
import { registerSchema } from "@/lib/schemas"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { useRegister } from "../_hooks/useRegister"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Label } from "@/components/ui/label"

type TFormFields = z.infer<typeof registerSchema>

function Register() {

    const { registerFn, isLoading } = useRegister()

    const form = useForm<TFormFields>({
        defaultValues:{
            first_name:"",
            last_name:"",
            email:"",
            password:""
        },
        resolver:zodResolver(registerSchema)
    })

    return (
        <section className='h-screen flex justify-center items-center'>
            <Form 
                form={form}
                handleSubmit={registerFn}
                className="flex p-4 py-10 rounded-lg border flex-col w-[90%] sm:w-[500px]"
            >
                <h1 className='form_heading mb-10'>Create An Account</h1>
                <div className="space-y-5 mb-4">
                    <div>
                        <Label>First Name</Label>
                        <FormInput 
                            placeholder="Enter Your First Name"
                            name="first_name"
                            type="text"
                        />
                    </div>
                    <div>
                        <Label>Last Name</Label>
                        <FormInput 
                            placeholder="Enter Your Last Name"
                            name="last_name"
                            type="text"
                        />
                    </div>
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
                <p className="text-sm space-x-1 mb-5">
                    <span>Already Have An Account?</span>
                    <Link 
                        href="/auth/login" 
                        className="text-blue-500"
                    >Login</Link>
                </p>
                <Button disabled={isLoading} type="submit">Register</Button>
            </Form>
        </section>
    )
}

export default Register