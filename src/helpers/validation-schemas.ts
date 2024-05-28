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

export { loginSchema, registerSchema };
