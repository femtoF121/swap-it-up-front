import * as yup from "yup";

const loginSchema = yup.object().shape({
  email: yup.string().email().required(),
  password: yup
    .string()
    .required()
    .min(6)
    .matches(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d).+$/, "Password must contain at least one letter of each case and one number!"),
});

const registerSchema = loginSchema.concat(
  yup.object().shape({
    confirmPassword: yup
      .string()
      .oneOf([yup.ref("password"), undefined], "Passwords must match")
      .required("Confirm password is required"),
    name: yup.string().required(),
    surname: yup.string().required(),
  })
);

const addItemSchema = yup.object().shape({
  name: yup.string().required().min(16).max(40),
  category: yup.object().required(),
  color: yup.object().required(),
  state: yup.object().required(),
  description: yup.string().required().min(40).max(500),
});

const changeInfoSchema = yup.object().shape({
  name: yup.string().required().max(40),
  surname: yup.string().required().max(40),
  nickname: yup.string().optional().max(40),
});

const changePasswordSchema = yup.object().shape({
  currentPassword: yup
    .string()
    .required()
    .min(6)
    .matches(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d).+$/, "Password must contain at least one letter of each case and one number!"),
  newPassword: yup
    .string()
    .required()
    .min(6)
    .matches(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d).+$/, "Password must contain at least one letter of each case and one number!"),
});

export { loginSchema, registerSchema, addItemSchema, changeInfoSchema, changePasswordSchema };
