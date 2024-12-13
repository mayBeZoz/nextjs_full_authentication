import { ComponentProps, forwardRef } from "react"
import { Controller, useFormContext } from "react-hook-form"
import { InputOTP, InputOTPGroup, InputOTPSlot } from "./input-otp"


type TInputOTPProps = {
    slots:number,
    showErrorLabel?:boolean,
    slotClassName?:string
} & Omit<ComponentProps<"input">,"onChange" | "children" | "maxLength">

export const OTPFormInput = forwardRef<HTMLInputElement, TInputOTPProps>(
    function ({ slots, name, showErrorLabel = true, slotClassName, ...props}, ref) {
        const { control } = useFormContext()

        return (
            <Controller
                name={name as string}
                control={control}
                render={({ field, fieldState }) => (
                    <>
                        <InputOTP
                            {...field}
                            {...props}
                            ref={ref}
                            maxLength={slots}
                        >
                            <InputOTPGroup>
                                {
                                    Array(slots).fill("").map((_,idx)=> (
                                        <InputOTPSlot 
                                            className={slotClassName}
                                            key={idx} 
                                            index={idx}
                                        />
                                    )) 
                                }
                            </InputOTPGroup>
                        </InputOTP>
                        {
                            showErrorLabel && fieldState.error && <p className="text-red-500 capitalize text-[12px] mt-2">{fieldState.error.message}</p>
                        }
                    </>
                )}  
            />
        )
    }
)

OTPFormInput.displayName = "OTPFormInput"