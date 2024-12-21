import { Form } from '@/components/ui/form'
import { OTPFormInput } from '@/components/ui/form-otp-input'
import { zodResolver } from '@hookform/resolvers/zod'
import { Label } from '@radix-ui/react-label'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { useResetPasswordProvider } from './page'
import { Button } from '@/components/ui/button'

const fieldsSchema = z.object({
    reset_password_otp: z.string({
        required_error:"password reset code is required"
    }).min(6,"password reset code must be at least 6 characters"),
})

type TFormFields = z.infer<typeof fieldsSchema>

function Step2() {
    
    const providerValue = useResetPasswordProvider()

    const form = useForm<TFormFields>({
        defaultValues:{
            reset_password_otp: providerValue?.otp || ""
        },
        resolver:zodResolver(fieldsSchema),
    })

    function handleSubmit (data:TFormFields) {
        if (providerValue) {
            providerValue.setOtp(data.reset_password_otp)
            providerValue.handleGoNext()
        }
    }

    return (
        <Form
            form={form} 
            handleSubmit={handleSubmit}
            className="flex p-4 py-10 rounded-lg border flex-col w-[90%] sm:w-[500px]"
        >
            <h1 className='form_heading mb-10'>Enter Reset Code</h1>
            
            <div className="w-fit flex flex-col gap-2 mx-auto">
                <Label htmlFor='otp_input'>
                    Enter Password Reset Code
                </Label>
                <OTPFormInput
                    id='otp_input' 
                    slots={6} 
                    slotClassName='w-[50px] h-[50px]'
                    name='reset_password_otp'
                />            
            </div>
            <div className='mt-8 w-full mx-auto flex gap-2 justify-between'>
                <Button 
                    className='w-[50%]'
                    onClick={(e) => {
                        e.preventDefault()
                        providerValue?.handleGoBack()
                    }}
                >Back</Button>

                <Button 
                className='w-[50%]'
                type='submit'>Next</Button>
            </div>
        </Form>
    )
}

export default Step2