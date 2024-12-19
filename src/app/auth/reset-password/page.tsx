'use client'

import { createContext, useContext, useState } from "react"
import Step1 from "./step1"
import Step2 from "./step2"
import Step3 from "./step3"


type TContextValue = {
    email: string,
    setEmail: (newEmail:string) => void,
    otp: string, 
    setOtp: (newEmail:string) => void,
    handleGoNext: () => void
    handleGoBack: () => void
}

const ResetPasswordContext = createContext<TContextValue|undefined>(undefined)


export function useResetPasswordProvider () {
    return useContext(ResetPasswordContext)
}

function ResetPassword() {

    const [ currStep, setCurrStep ] = useState<number>(1)
    const [ email, setEmail ] = useState<string>("")
    const [ otp, setOtp ] = useState<string>("")
    
    function handleGoNext () {
        if (currStep <= steps.length) {
            setCurrStep((prev) => prev + 1)
        }
    }
    
    function handleGoBack () {
        setCurrStep((prev) => prev - 1)
    }
    return (
        <ResetPasswordContext.Provider value={{
            handleGoNext,
            handleGoBack,
            email,
            setEmail,
            setOtp,
            otp
        }}>
            <section className='h-screen flex justify-center items-center'>
                {
                    steps.find(curr => curr.index === currStep)?.render
                }
            </section>
        </ResetPasswordContext.Provider>
    )
}

export default ResetPassword

const steps = [
    {
        render:<Step1/>,
        index: 1
    },
    {
        render:<Step2/>,
        index: 2
    },
    {
        render:<Step3/>,
        index: 3
    },
]
