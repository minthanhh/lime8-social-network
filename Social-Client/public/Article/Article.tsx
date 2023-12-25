import clsx from 'clsx'

interface ArticleProps extends React.HTMLAttributes<HTMLDivElement> {
  margin?: string
}

export default function Article({ children, className, margin, ...props }: ArticleProps) {
  return (
    <div
      className={clsx(
        'bg-light dark:bg-dark shadow-shadowMain rounded-md flex flex-col flex-grow',
        className,
        margin ? margin : 'mx-2'
      )}
      {...props}
    >
      {children}
    </div>
  )
}
