import { Button } from '@/components/ui/button'
import { Form } from '@/components/ui/form'
import { FormInput } from '@/components/ui/form-input'
import { Label } from '@radix-ui/react-label'
import { useForm } from 'react-hook-form'
import { useResetPasswordProvider } from './page'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { passwordRegex } from '@/lib/schemas'
import { useSubmitResetPasswordOTP } from '../_hooks/useSubmitResetPasswordOTP'

const fieldsSchema = z.object({
    password: z.string({
        required_error:"user password is required"
    }).regex(passwordRegex,"password must be at least 6 characters, include capital letter, number, special character"),
})

type TFormFields = z.infer<typeof fieldsSchema>

function Step3() {
    
    const providerValue = useResetPasswordProvider()
    const { isResitingPasswordLoading, submitResetPasswordOTP } = useSubmitResetPasswordOTP()

    const form = useForm<TFormFields>({
        defaultValues:{
            password:""
        },
        resolver:zodResolver(fieldsSchema),
    })

    function handleSubmit (data: TFormFields) {
        if (providerValue) {
            submitResetPasswordOTP({
                email: providerValue.email,
                otp: providerValue.otp,
                password: data.password
            },{
                onSettled (res) {
                    if (!res?.success) {
                        providerValue.handleGoBack()
                    }
                }
            })
        }
    }

    return (
        <Form
            form={form} 
            handleSubmit={handleSubmit}
            className="flex p-4 py-10 rounded-lg border flex-col w-[90%] sm:w-[500px]"
        >            
            <h1 className='form_heading mb-10'>Set A New Password</h1>
            <div className='w-full mb-6'>
                <Label htmlFor='password'>New Password</Label>
                <FormInput
                    placeholder='Enter Your New Password Here'
                    id='password'
                    name='password'
                    type='password'
                />
            </div>
            <div className='mt-2 w-full mx-auto flex gap-2 justify-between'>
                <Button
                    disabled={isResitingPasswordLoading}
                    className='w-[50%]'
                    onClick={(e) => {
                        e.preventDefault()
                        providerValue?.handleGoBack()
                    }}
                >Back</Button>

                <Button 
                disabled={isResitingPasswordLoading}
                className='w-[50%]'
                type='submit'>Submit</Button>
            </div>
        </Form>
    )
}

export default Step3