import { ESignUpInputFieldsId } from "../interfaces";
import * as Yup from "yup";

export const formSchema = Yup.object().shape({
  [ESignUpInputFieldsId.emails]: Yup.string()
    .email("Неверный email")
    .required("Обязательное поле"),
  [ESignUpInputFieldsId.password]: Yup.string()
    .min(8, "Введите более 8 символов")
    .required("Обязательное поле"),
  [ESignUpInputFieldsId.repeatPassword]: Yup.string()
    .oneOf([Yup.ref("password")], "Пароли не совпадают")
    .required("Обязательное поле"),
  [ESignUpInputFieldsId.tel]: Yup.string()
    .matches(/^\+7\d{10}$/,"Номер должен быть в формате +7XXXXXXXXXX")
    .required("Обязательное поле"),
})