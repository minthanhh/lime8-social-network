interface Props {
  width: string
  height: string
}

const Notify = ({ height, width }: Props) => {
  return (
    <svg xmlns='http://www.w3.org/2000/svg' width={width} height={height} viewBox='0 0 32 32' fill='none'>
      <path
        d='M29.1867 23.16C28.3295 22.3959 27.5791 21.5198 26.9556 20.5556C26.2749 19.2245 25.8669 17.7709 25.7556 16.28V11.8889C25.7614 9.54721 24.912 7.28398 23.3669 5.52442C21.8217 3.76486 19.6872 2.6301 17.3644 2.33333V1.18667C17.3644 0.871943 17.2394 0.57011 17.0169 0.347567C16.7943 0.125024 16.4925 0 16.1778 0C15.8631 0 15.5612 0.125024 15.3387 0.347567C15.1161 0.57011 14.9911 0.871943 14.9911 1.18667V2.35111C12.6891 2.66927 10.5804 3.81089 9.05558 5.56454C7.53074 7.31818 6.69309 9.56502 6.69778 11.8889V16.28C6.58645 17.7709 6.17847 19.2245 5.49778 20.5556C4.88523 21.5176 4.14684 22.3935 3.30222 23.16C3.20741 23.2433 3.13141 23.3458 3.0793 23.4608C3.02719 23.5757 3.00016 23.7005 3 23.8267V25.0356C3 25.2713 3.09365 25.4974 3.26035 25.6641C3.42705 25.8308 3.65314 25.9244 3.88889 25.9244H28.6C28.8357 25.9244 29.0618 25.8308 29.2285 25.6641C29.3952 25.4974 29.4889 25.2713 29.4889 25.0356V23.8267C29.4887 23.7005 29.4617 23.5757 29.4096 23.4608C29.3575 23.3458 29.2815 23.2433 29.1867 23.16ZM4 24.5C4.82703 23.7011 23.3863 16.9724 24 16C24.8574 14.3924 10.8911 18.0987 11 16.28L12 15C11.9647 13.9583 14.6168 8.47281 14.9911 7.5C15.3654 6.52719 9.93885 6.97581 10.6633 6.2264C11.3878 5.47699 6.72872 18.1844 12.5 23.8267C13.4596 23.4196 14.7467 20.4222 15.7891 20.4222C16.8314 20.4222 18.3295 19.0152 19.2891 19.4222C20.2487 19.8293 20.5646 21.6728 21.2891 22.4222C22.0135 23.1716 23.6257 23.0272 24 24C24.3743 24.9728 21.8243 19.8805 21.7891 20.9222L23.0616 23.8267C23.1705 25.6454 24.4316 23.3147 25.2891 24.9222C25.9028 25.8947 23.173 15.2011 24 16L4 24.5Z'
        fill='#F5F5F5'
      />
      <path
        d='M16.3822 31.2313C16.9422 31.2184 17.4795 31.0079 17.8992 30.637C18.3189 30.2661 18.5939 29.7587 18.6756 29.2046H14C14.084 29.7738 14.3718 30.293 14.81 30.6658C15.2483 31.0386 15.807 31.2396 16.3822 31.2313Z'
        fill='#F5F5F5'
      />
    </svg>
  )
}

export default Notify