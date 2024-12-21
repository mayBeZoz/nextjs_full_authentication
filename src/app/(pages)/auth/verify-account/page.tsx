'use client'

import { Button } from '@/components/ui/button'
import { Form } from '@/components/ui/form'
import { OTPFormInput } from '@/components/ui/form-otp-input'
import { Label } from '@/components/ui/label'
import { useForm } from 'react-hook-form'
import { useSendVerificationOTP } from '../_hooks/useSendVerificationOTP'
import { MouseEvent, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import { zodResolver } from '@hookform/resolvers/zod'
import { useSubmitVerificationOTP } from '../_hooks/useSubmitVerificationOTP'
import { z } from 'zod'

const fieldsSchema = z.object({
    account_verification_otp: z.string({
        required_error:"otp is required"
    }).min(6,"otp must be at least 6 characters"),
})

type TFormFields = z.infer<typeof fieldsSchema>

function VerifyAccount() {

    const params = useSearchParams()
    const email = params.get("email") || ""

    const form = useForm<TFormFields>({
        defaultValues:{
            account_verification_otp:""
        },
        resolver:zodResolver(fieldsSchema),
    })

    const { 
        isLoading:isSendingEmail,
        sendVerificationOTP 
    } = useSendVerificationOTP()

    const { 
        isAccountVerificationLoading,
        submitAccountVerificationOTP
    } = useSubmitVerificationOTP()

    useEffect(()=>{
        sendVerificationOTP(email)
    },[email,sendVerificationOTP])

    function handleResendEmail (e:MouseEvent<HTMLButtonElement>) {
        e.preventDefault()
        if (!isSendingEmail)
        sendVerificationOTP(email)
    }

    function handleSubmit ({ account_verification_otp: otp }:TFormFields) {
        submitAccountVerificationOTP({ email, otp })
    }

    const isButtonsDisabled = isAccountVerificationLoading || isSendingEmail

    return (
        <section className='h-screen flex justify-center items-center'>
            <Form 
                form={form} 
                handleSubmit={handleSubmit}
                className="flex p-4 items-center py-10 rounded-lg border flex-col w-[90%] sm:w-[500px]"
            >
                <h1 className='form_heading mb-10'>Activate Your Account</h1>            
                <div className="w-fit flex flex-col gap-2 mx-auto">
                    <Label htmlFor='otp_input'>
                        Enter Activation Code
                    </Label>
                    <OTPFormInput
                        id='otp_input' 
                        slots={6} 
                        slotClassName='w-[50px] h-[50px]'
                        name='account_verification_otp'
                    />            
                </div>      
                <div className='mt-8 w-full mx-auto flex gap-2 justify-between'>
                    <Button 
                        className='w-[50%]'
                        disabled={isButtonsDisabled}
                        onClick={handleResendEmail}
                    >Resend</Button>

                    <Button 
                        disabled={isButtonsDisabled}
                        className='w-[50%]'
                        type='submit'
                    >Submit</Button>
                </div>
            </Form>
        </section>
    )
}

export default VerifyAccount