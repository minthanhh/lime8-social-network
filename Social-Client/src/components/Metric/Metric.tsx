interface MetricProps {
  count: number
  label: string
}

const Metric = ({ count, label }: MetricProps) => {
  return (
    <div className='flex flex-col items-center justify-center md:justify-between gap-1'>
      <span className='md:text-[10px] lg:text-xs uppercase font-bold'>{count}</span>
      <p className='font-medium md:text-[8px] xl:text-xs uppercase'>{label}</p>
    </div>
  )
}

export default Metric
