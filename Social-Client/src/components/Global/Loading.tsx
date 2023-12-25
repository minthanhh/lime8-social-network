import './Loading.css'

export default function Loading() {
  return (
    <div className=' loading fixed left-0 top-0 bottom-0 right-0 bg-[#0009] text-center text-white'>
      <svg width='205' height='250' viewBox='0 0 40 50'>
        <polygon stroke='#fff' strokeWidth='1' fill='none' points='20,1 40,40 1,40' />
        <text fill='#fff' x='5' y='47'>
          Loading
        </text>
      </svg>
    </div>
  )
}
