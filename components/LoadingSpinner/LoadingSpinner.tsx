import clsx from 'clsx'

const LoadingSpinner = () => {
  return (
    <div
      className={clsx(
        'flex items-center justify-center',
        'space-x-2 animate-bounce',
        'w-full h-full'
      )}
    >
      <div className={clsx('w-8 h-8', 'bg-[#002781]', 'rounded-full')}></div>
      <div className={clsx('w-8 h-8', 'bg-[#ffe35c]', 'rounded-full')}></div>
      <div className={clsx('w-8 h-8', 'bg-[#d00a1e]', 'rounded-full')}></div>
    </div>
  )
}

export default LoadingSpinner
