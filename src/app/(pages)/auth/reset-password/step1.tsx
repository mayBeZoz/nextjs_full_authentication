import { Form } from '@/components/ui/form'
import { useResetPasswordProvider } from './page'
import { useSendResetPasswordOTP } from '../_hooks/useSendResetPasswordOTP'
import { useForm } from 'react-hook-form'
import { FormInput } from '@/components/ui/form-input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

type TFormFields = {
    email: string
}

function Step1() {
    
    const { sendResetPasswordOTP, isLoading } = useSendResetPasswordOTP()
    const providerValue = useResetPasswordProvider()

    const form = useForm<TFormFields>({
        defaultValues:{
            email: providerValue?.email || "",
        },
    })
    
    function handleSubmit (data: TFormFields) {
        sendResetPasswordOTP(data.email,{
            onSettled (res) {
                if (res?.success) {
                    providerValue?.setEmail(data.email)
                    providerValue?.handleGoNext()
                }
            }
        })
    }

    return (
        <Form 
            form={form}
            handleSubmit={handleSubmit}
            className="flex p-4 py-10 rounded-lg border flex-col w-[90%] sm:w-[500px]"
        >
            <h1 className='form_heading mb-10'>Reset Your Password</h1>
            <div className='w-full mb-2'>
                <Label htmlFor='email'>Enter Your Email</Label>
                <FormInput
                    id='email'
                    name='email'
                    type='email'
                    placeholder="Ex: John_doe@example.xyz"
                />
            </div>
            <p className="text-sm space-x-1 mb-5">
                <span>Already Have An Account?</span>
                <Link
                    href="/auth/login" 
                    className="text-blue-500"
                >Login</Link>
            </p>
            <Button
                className='w-full' 
                variant="default"
                disabled={isLoading}
            >
                Submit
            </Button>
        </Form>
    )
}

export default Step1