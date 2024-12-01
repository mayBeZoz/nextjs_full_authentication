import { ComponentProps, forwardRef } from "react"
import { Input } from "./input"
import { Controller, useFormContext } from "react-hook-form"



export const FormInput = forwardRef<HTMLInputElement, ComponentProps<"input">>(
    function ({ name, ...props }, ref) {
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
                            fieldState.error && <p className="text-red-500 capitalize text-[12px] mt-2">{fieldState.error.message}</p>
                        }
                    </>
                )}  
            />
        )
    }
)

FormInput.displayName = "FormInput"