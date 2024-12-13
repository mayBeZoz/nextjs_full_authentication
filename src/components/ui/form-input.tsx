import { ComponentProps, forwardRef } from "react"
import { Input } from "./input"
import { Controller, useFormContext } from "react-hook-form"

type TFormInputProps = {
    showErrorLabel?:boolean
} & ComponentProps<"input">

export const FormInput = forwardRef<HTMLInputElement, TFormInputProps>(
    function ({ name, showErrorLabel = true, ...props }, ref) {
        if (!name)
            throw new Error("Input Must Be Provided With Name")
        
        const { control } = useFormContext()

        return (
            <Controller
                name={name as string}
                control={control}
                render={({ field, fieldState }) => (
                    <>
                        <Input
                            {...field}
                            {...props}
                            ref={ref}
                        />
                        {
                            showErrorLabel && fieldState.error && <p className="text-red-500 capitalize text-[12px] mt-2">{fieldState.error.message}</p>
                        }
                    </>
                )}  
            />
        )
    }
)

FormInput.displayName = "FormInput"