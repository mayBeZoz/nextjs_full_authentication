import { TChildren } from "@/types"
import { ComponentProps } from "react"
import { FieldValues, FormProvider, UseFormReturn } from "react-hook-form"

type TFormProps<TFields extends FieldValues> = {
    form: UseFormReturn<TFields>,
    handleSubmit: (fields:TFields) => void
} & TChildren & Omit<ComponentProps<"form">,"children">

export function Form <T extends FieldValues>({ 
    form, 
    children, 
    handleSubmit:onSubmit,
    ...props 
}: TFormProps<T>) {
    return (
        <FormProvider {...form}>
            <form 
                {...props} 
                onSubmit={form.handleSubmit(onSubmit)}
            >
                { children }
            </form>
        </FormProvider>
    )
}