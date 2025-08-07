import { ELoginInputFieldsId } from "../interfaces";
import * as Yup from "yup";

export const formSchema = Yup.object().shape({
  [ELoginInputFieldsId.emails]: Yup.string()
    .email("Неверный email")
    .required("Обязательное поле"),
  [ELoginInputFieldsId.password]: Yup.string()
    .min(8, "Введите более 8 символов")
    .required("Обязательное поле"),
  [ELoginInputFieldsId.repeatPassword]: Yup.string()
    .oneOf([Yup.ref("password")], "Пароли не совпадают")
    .required("Обязательное поле"),
});