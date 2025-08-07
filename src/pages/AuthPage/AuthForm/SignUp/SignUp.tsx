import { useState, type ChangeEvent } from "react";
import { ESignUpInputFieldsId } from "./interfaces";
import * as Yup from "yup";
import { formSchema } from "./shared/validateFormSchema";

export const SignUp = () => {

    const [formData, setFormData] = useState({
        [ESignUpInputFieldsId.emails]: "",
        [ESignUpInputFieldsId.password]: "",
        [ESignUpInputFieldsId.repeatPassword]: "",
        [ESignUpInputFieldsId.tel]: ""
    })
    const [errors, setErrors] = useState<{ [key: string]: string }>({});
    const [isLoading, setIsLoading] = useState(false)

    const handleFormData = (id: ESignUpInputFieldsId, value: string) => {
        setFormData({...formData, [id]: value})
    }


    const sendData = async () => {
        setIsLoading(true)
        const sendData = () => {
            return new Promise((resolve) => {
                setTimeout(() => {
                    resolve(true)
                }, 2000)
            })
        }
        try {
            await formSchema.validate(formData, { abortEarly: false })
            await sendData()
        } catch (error) {
            if(error instanceof Yup.ValidationError) {
                const errorMessages: { [key: string]: string } = {}
                error.inner.forEach((err) => {
                    if(err.path) {
                        errorMessages[err.path] = err.message
                    }
                })
                setErrors(errorMessages)
            }
        } finally {
            setIsLoading(false)
        }
    }


    return (
        <>
            <input
            type="email"
            placeholder="Введите email"
            value={formData[ESignUpInputFieldsId.emails]}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
                handleFormData(ESignUpInputFieldsId.emails, e.target.value)
            }
            />
            {errors[ESignUpInputFieldsId.emails] && (
                <div>{errors[ESignUpInputFieldsId.emails]}</div>
            )}
            <input 
            type="tel"
            placeholder="Введите номер телефона +7XXXXXXXXXX"
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
                handleFormData(ESignUpInputFieldsId.tel, e.target.value)
            }
            />
            {errors[ESignUpInputFieldsId.tel] && (
                <div>{errors[ESignUpInputFieldsId.tel]}</div>
            )}
            <input 
            type="password"
            placeholder="Пароль"
            value={formData[ESignUpInputFieldsId.password]}
            onChange={(e: ChangeEvent<HTMLInputElement>) => 
                handleFormData(ESignUpInputFieldsId.password, e.target.value)
            }
            />
            {errors[ESignUpInputFieldsId.password] && (
                <div>{errors[ESignUpInputFieldsId.password]}</div>
            )}
            <input 
            type="password"
            placeholder="Повторите пароль"
            value={formData[ESignUpInputFieldsId.repeatPassword]}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
                handleFormData(ESignUpInputFieldsId.repeatPassword, e.target.value)
            }
            />
            {errors[ESignUpInputFieldsId.repeatPassword] && (
                <div>{errors[ESignUpInputFieldsId.repeatPassword]}</div>
            )}
            <button onClick={sendData} disabled={isLoading}>
                {isLoading ? "Загрузка..." : "Зарегестрироваться"}
            </button>
        </>
    )
}