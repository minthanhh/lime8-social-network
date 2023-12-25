import { InputHTMLAttributes, ReactNode, useState } from 'react'
import type { FieldPath, FieldValues, RegisterOptions, UseFormRegister } from 'react-hook-form'
import clsx from 'clsx'
import OpenEye from '../icons/OpenEye'
import HiddenEye from '../icons/HiddenEye'

interface Props<TFieldValues extends FieldValues> extends InputHTMLAttributes<HTMLInputElement> {
  labelText?: string
  firstIcon?: ReactNode
  errorMessage?: string
  styleInput?: string
  register?: UseFormRegister<TFieldValues>
  rules?: RegisterOptions
  name?: FieldPath<TFieldValues>
}
export default function Input<TFieldValues extends FieldValues = FieldValues>({
  labelText,
  errorMessage,
  className,
  name,
  register,
  rules,
  styleInput,
  firstIcon,
  ...rest
}: Props<TFieldValues>) {
  const [openEye, setOpenEye] = useState(false)
  const registerResult = register && name ? register(name, rules) : null
  const toggleEye = () => {
    setOpenEye((prev) => !prev)
  }
  const handleType = () => {
    if (rest.type === 'password') {
      return openEye ? 'text' : 'password'
    }
    return rest.type
  }
  return (
    <div className={clsx('relative mb-2', className)}>
      <label className='pb-2 block text-black-2' htmlFor={rest.id}>
        {labelText}
      </label>
      <span className='absolute left-2 top-[37%] bg-slate-100 rounded-lg shadow'>{firstIcon}</span>
      <input
        {...registerResult}
        {...rest}
        className={clsx('w-full outline-none py-[10px]', styleInput)}
        type={handleType()}
        autoComplete='false'
      />
      {rest.type === 'password' && openEye && (
        <button className='absolute right-1 top-10' onClick={toggleEye}>
          <OpenEye width='32' height='32' />
        </button>
      )}
      {rest.type === 'password' && !openEye && (
        <button className='absolute right-1 top-10' onClick={toggleEye}>
          <HiddenEye width='30' height='30' />
        </button>
      )}
      <div className={clsx('text-red-500 px-1 inline-block min-h-[16px] text-[12px]', errorMessage && 'bg-red-50')}>
        {errorMessage}
      </div>
    </div>
  )
}
