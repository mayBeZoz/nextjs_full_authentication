import { Form } from '@/components/ui/form'
import { useResetPasswordProvider } from './page'
import { useSendResetPasswordOTP } from '../_hooks/useSendResetPasswordOTP'
import { useForm } from 'react-hook-form'
import { FormInput } from '@/components/ui/form-input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'

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
            className="flex p-4 items-center py-10 rounded-lg border flex-col w-[90%] sm:w-[500px]"
        >
            <h1 className='form_heading mb-10'>Enter Your Email</h1>
            <div className='w-full mb-6'>
                <Label>Email</Label>
                <FormInput
                    name='email'
                    required={true}
                    type='email'
                    placeholder="Ex: John_doe@example.xyz"
                />
            </div>
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