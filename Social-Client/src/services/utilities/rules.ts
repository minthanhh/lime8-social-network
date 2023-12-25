import * as Yup from 'yup'

export const registerSchema = Yup.object({
  email: Yup.string()
    .required('Vui lòng nhập email')
    .email('Email không đúng định dạng')
    .min(10, 'Email tối thiểu 10 kí tự')
    .max(30, 'Email không vượt quá 30 kí tự'),
  password: Yup.string()
    .required('Vui lòng nhập password')
    .min(6, 'Password tối thiểu là 6 kí tự')
    .max(15, 'Password không quá 15 kí tự'),
  username: Yup.string()
    .required('Vui lòng nhập username')
    .min(6, 'username tối thiểu 6 kí tự')
    .max(10, 'username không quá 10 kí tự'),
  confirm: Yup.string()
    .required('Vui lòng nhập lại password')
    .min(6, 'Password tối thiểu là 6 kí tự')
    .max(15, 'Password không quá 15 kí tự')
    .oneOf([Yup.ref('password')], 'password nhập lại không trùng khớp')
})

export const loginSchema = Yup.object({
  email: Yup.string()
    .required('Vui lòng nhập email')
    .email('Email không đúng định dạng')
    .min(10, 'Email tối thiểu 10 kí tự')
    .max(50, 'Email không vượt quá 50 kí tự'),
  password: Yup.string()
    .required('Vui lòng nhập password')
    .min(6, 'Password tối thiểu là 6 kí tự')
    .max(15, 'Password không quá 15 kí tự')
})

export const forgotSchema = Yup.object({
  email: Yup.string().required('Vui lòng nhập email').email('Email không đúng định dạng')
})

export const resetPassword = Yup.object({
  password: Yup.string()
    .required('Vui lòng nhập password')
    .min(6, 'Password tối thiểu là 6 kí tự')
    .max(15, 'Password không quá 15 kí tự'),
  confirmPassword: Yup.string()
    .required('Vui lòng nhập lại password')
    .min(6, 'Password tối thiểu là 6 kí tự')
    .max(15, 'Password không quá 15 kí tự')
    .oneOf([Yup.ref('password')], 'password nhập lại không trùng khớp')
})

export type RegisterSchema = Yup.InferType<typeof registerSchema>
export type LoginSchema = Yup.InferType<typeof loginSchema>
export type ResetPasswordSchema = Yup.InferType<typeof resetPassword>
export type ForgotPasswordSchena = Yup.InferType<typeof forgotSchema>
