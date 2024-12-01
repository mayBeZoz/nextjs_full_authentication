"use client"

import { Form } from "@/components/ui/form"
import { FormInput } from "@/components/ui/form-input"
import { registerSchema } from "@/lib/schemas"
import { zodResolver } from "@hookform/resolvers/zod"
import { Label } from "@radix-ui/react-label"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { useRegister } from "../_hooks/useRegister"
import { Button } from "@/components/ui/button"

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
                <h1 className='font-extrabold text-3xl mb-10 text-center'>Create Account</h1>
                <div className="space-y-5 mb-8">
                    <div>
                        <Label>First Name</Label>
                        <FormInput 
                            placeholder="Enter Your First Name"
                            name="first_name"
                            type="text"
                        />
                    </div>
                    <div>
                        <Label>last Name</Label>
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

                <Button disabled={isLoading} type="submit">Submit</Button>
            </Form>
        </section>
    )
}

export default Register