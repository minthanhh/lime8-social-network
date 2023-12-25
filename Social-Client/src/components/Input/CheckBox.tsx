import clsx from 'clsx'
import React from 'react'

interface Props {
  id: string
  textCheck: string
  name: string
  value?: any
  checked?: boolean
  handleChange?: () => void
  onChange?: any
}
export default function CheckBox({ id, textCheck, name, value, onChange }: Props) {
  const [checked, setChecked] = React.useState(false)

  const handleCheck = (value: boolean) => {
    setChecked(!checked)
    onChange(!value)
  }

  return (
    <label className='flex items-center gap-2 px-1' htmlFor={id}>
      <span
        className={clsx(
          'w-[22px] h-[22px] border border-sky-200 rounded-md relative',
          checked && 'style-bg-main outline outline-sky-300 outline-offset-1'
        )}
      >
        <span className='absolute border-b-2 border-l-2 top-[3px] left-[2px] border-white w-3/4 h-2/5 -rotate-45'></span>
      </span>
      <input
        type='checkbox'
        name={name}
        checked={checked}
        value={value}
        id={id}
        className='hidden'
        onChange={() => handleCheck(value)}
      />
      <span>{textCheck}</span>
    </label>
  )
}
