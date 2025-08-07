import { useState, type ChangeEvent } from "react";
import * as Yup from "yup";
import style from "./Login.module.css"
import { ELoginInputFieldsId } from "./interfaces";
import { formSchema } from "./shared/validateFormSchema";


export const Login = () => {
  const [formData, setFormData] = useState({
    [ELoginInputFieldsId.emails]: "",
    [ELoginInputFieldsId.password]: "",
    [ELoginInputFieldsId.repeatPassword]: "",
  });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const handleFormData = (id: ELoginInputFieldsId, value: string) => {
    setFormData({ ...formData, [id]: value });
  };

  const handleSubmit = async () => {
    try {
      // Валидация данных формы
      await formSchema.validate(formData, { abortEarly: false });
      console.log("Форма валидна, данные:", formData);
      alert(
        `Вы успешно зарегестрировались email ${
          formData[ELoginInputFieldsId.emails]
        } пароль ${formData[ELoginInputFieldsId.password]}`
      );
    } catch (err) {
      if (err instanceof Yup.ValidationError) {
        const errorMessages: { [key: string]: string } = {};
        err.inner.forEach((error) => {
          if (error.path) {
            errorMessages[error.path] = error.message;
          }
        });
        setErrors(errorMessages);
      }
    }
  };

  return (
    <>
      <input
        type="email"
        value={formData[ELoginInputFieldsId.emails]}
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          handleFormData(ELoginInputFieldsId.emails, e.target.value)
        }
        placeholder="Введите email"
        className={errors[ELoginInputFieldsId.emails] ? style.errorInput : style.normalInput}
      />
      {errors[ELoginInputFieldsId.emails] && (
        <div>{errors[ELoginInputFieldsId.emails]}</div>
      )}
      <input
        type="password"
        value={formData[ELoginInputFieldsId.password]}
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          handleFormData(ELoginInputFieldsId.password, e.target.value)
        }
        placeholder="Пароль"
        className={errors[ELoginInputFieldsId.password] ? style.errorInput : style.normalInput}
      />
      {errors[ELoginInputFieldsId.password] && (
        <div>{errors[ELoginInputFieldsId.password]}</div>
      )}
      <input
        type="password"
        value={formData[ELoginInputFieldsId.repeatPassword]}
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          handleFormData(ELoginInputFieldsId.repeatPassword, e.target.value)
        }
        placeholder="Повторить пароль"
        className={errors[ELoginInputFieldsId.repeatPassword] ? style.errorInput : style.normalInput}
      />
      {errors[ELoginInputFieldsId.repeatPassword] && (
        <div>{errors[ELoginInputFieldsId.repeatPassword]}</div>
      )}
      <button onClick={handleSubmit}>Войти</button>
    </>
  );
};
