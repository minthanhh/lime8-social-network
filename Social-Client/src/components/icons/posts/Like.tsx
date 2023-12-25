const Like = ({ className, reactions, username }: { className?: string; reactions: any[]; username: string }) => {
  const checkReaction = reactions.some((r) => r.username === username)

  return checkReaction ? (
    <svg xmlns='http://www.w3.org/2000/svg' className={className} viewBox='0 0 34 34' fill='none'>
      <path
        d='M23.1663 29.1934H17.4122C16.2895 29.1944 15.1758 28.9943 14.1237 28.6024L9.64131 26.9376C9.3958 26.844 9.19721 26.6572 9.08878 26.4179C8.98036 26.1786 8.97087 25.9061 9.06239 25.6599C9.15392 25.4136 9.33903 25.2134 9.57744 25.103C9.81584 24.9926 10.0882 24.9808 10.3353 25.0703L15.246 24.3165C16.0764 24.6251 16.5263 27.201 17.4122 27.1999H23.1663C23.4165 27.1999 23.6566 27.1005 23.8335 26.9235C24.0105 26.7466 24.1099 26.5065 24.1099 26.2563C24.1099 26.006 24.0105 25.766 23.8335 25.589C23.6566 25.4121 23.4165 25.3126 23.1663 25.3126C22.9021 25.3126 22.6487 25.2077 22.4619 25.0209C22.2751 24.8341 22.1702 24.5807 22.1702 24.3165C22.1702 24.0524 22.2751 23.799 22.4619 23.6122C22.6487 23.4254 22.9021 23.3205 23.1663 23.3205H24.5243C24.7745 23.3205 25.0146 23.221 25.1915 23.0441C25.3685 22.8671 25.4679 22.6271 25.4679 22.3768C25.4679 22.1266 25.3685 21.8865 25.1915 21.7096C25.0146 21.5326 24.7745 21.4332 24.5243 21.4332C24.2601 21.4332 24.0067 21.3282 23.8199 21.1414C23.6331 20.9546 23.5282 20.7013 23.5282 20.4371C23.5282 20.1729 23.6331 19.9196 23.8199 19.7328C24.0067 19.5459 24.2601 19.441 24.5243 19.441H25.8816C26.0683 19.4411 26.2508 19.3857 26.406 19.2821C26.5612 19.1784 24.968 19.9198 26 19C26.0714 18.8275 25.7581 18.4614 25.7217 18.2783C25.6852 18.0952 26.681 17.962 26.549 17.83C26.4616 17.742 26.3576 17.6722 26.2431 17.6248C26.1285 17.5774 26.0056 17.5532 25.8816 17.5537C25.6174 17.5537 25.3641 17.4488 25.1773 17.262C24.9905 17.0752 24.8855 16.8218 24.8855 16.5576C24.8855 16.2935 24.9905 16.0401 25.1773 15.8533C25.3641 15.6665 25.6174 15.5615 25.8816 15.5615H27.2396C27.426 15.5609 26.3717 15.0639 26.5264 14.9599C26.6811 14.856 25.4553 13.6322 25.5264 13.4599C25.5974 13.2876 28.1984 14.6157 28.1619 14.4329C28.1254 14.2502 28.0355 14.0823 27.9037 13.9505C27.8167 13.8628 28.7664 14.1171 28.6524 14.0696C28.5385 14.0221 27.0819 18.5016 27.0264 15.9599L24.5818 27.8306L17.4122 27.1999L9.57744 25.103C9.75632 28.7216 10.0848 13.2701 9.93417 13.1843C9.78356 13.0985 17.0633 13.3336 16.9751 13.1843C16.8869 13.0351 16.8392 12.8655 16.8366 12.6921C16.8341 12.5188 16.8768 12.3478 16.9606 12.1961C17.2632 11.5821 17.4693 10.9252 17.5715 10.2484C17.7967 8.79608 17.5191 7.48323 16.7468 6.34635C16.6474 6.20476 18.6902 7.01557 18.5264 6.95993C18.3625 6.90428 17.8123 9.25514 17.6472 9.30689C18.0264 9.45993 17.6743 10.1092 17.5715 10.2484C18.0264 10.9599 20.0272 15.2869 20.0264 15.4599C21.2888 24.1087 13.72 12.7028 10.7051 13.9831C10.5843 14.0371 10.4538 14.0666 10.3214 14.0696C10.1891 14.0727 10.0574 14.0493 9.93417 14.0009C9.81093 13.9525 9.69858 13.8799 9.60369 13.7876C9.5088 13.6952 9.43328 13.5849 9.38155 13.463C9.32981 13.3411 9.30289 13.2101 9.30236 13.0777C9.30184 12.9453 9.32772 12.8141 9.3785 12.6918C9.42927 12.5695 9.50392 12.4586 9.59807 12.3655C9.69223 12.2724 9.804 12.199 9.92685 12.1496C11.17 11.6183 12.0758 10.8381 12.6196 9.82007C13.0632 8.98932 13.2837 7.98393 13.2724 6.83178C13.2624 5.57272 14.0387 4.51022 15.246 4.13436C16.4533 3.7585 17.6904 4.18616 18.397 5.22741C20.0379 7.64194 19.7417 10.1481 19.2921 11.6828H27.2396C27.9021 11.6828 28.545 11.907 29.0639 12.3187C29.5829 12.7304 29.9473 13.3055 30.0981 13.9506C30.2488 14.5957 30.1769 15.2727 29.8942 15.8718C29.6114 16.4708 29.1343 16.9566 28.5405 17.2503C28.8659 17.946 28.9061 18.7416 28.6524 19.4666C28.3988 20.1916 27.8714 20.7886 27.1832 21.1297C27.5088 21.8257 27.5489 22.6214 27.2951 23.3466C27.0413 24.0718 26.5137 24.6688 25.8252 25.0098C26.0348 25.4572 26.1283 25.9502 26.0968 26.4433C26.0653 26.9364 25.91 27.4135 25.6452 27.8306C25.3804 28.2477 25.0146 28.5913 24.5818 28.8295C24.1489 29.0677 23.663 29.1929 23.1689 29.1934H23.1663Z'
        fill='url(#paint0_linear_1603_439)'
      />
      <path
        d='M9.6984 27.2596H3.99609C3.73191 27.2596 3.47855 27.1547 3.29175 26.9679C3.10495 26.7811 3 26.5277 3 26.2635V12.6084C3 12.3442 3.10495 12.0909 3.29175 11.9041C3.47855 11.7173 3.73191 11.6123 3.99609 11.6123H9.6984C9.96258 11.6123 10.2159 11.7173 10.4027 11.9041C10.5895 12.0909 10.6945 12.3442 10.6945 12.6084V26.2635C10.6945 26.5277 10.5895 26.7811 10.4027 26.9679C10.2159 27.1547 9.96258 27.2596 9.6984 27.2596ZM4.99418 25.2674H8.7023L4.5 26L4.99219 13.6045L4.99418 25.2674Z'
        fill='url(#paint1_linear_1603_439)'
      />
      <defs>
        <linearGradient id='paint0_linear_1603_439' x1='9' y1='19' x2='27.5' y2='20' gradientUnits='userSpaceOnUse'>
          <stop stopColor='#2ECEC2' />
          <stop offset='0.447917' stopColor='#34BAD0' />
          <stop offset='1' stopColor='#3B89F1' />
        </linearGradient>
        <linearGradient id='paint1_linear_1603_439' x1='3' y1='19' x2='11' y2='19' gradientUnits='userSpaceOnUse'>
          <stop stopColor='#2ECEC2' />
          <stop offset='0.447917' stopColor='#34BAD0' />
          <stop offset='1' stopColor='#3B89F1' />
        </linearGradient>
      </defs>
    </svg>
  ) : (
    <svg xmlns='http://www.w3.org/2000/svg' className={className} viewBox='0 0 34 34' fill='none'>
      <path
        d='M23.1399 28.7335H17.3858C16.2631 28.7345 15.1494 28.5343 14.0974 28.1425L9.61494 26.4777C9.36943 26.3841 9.17084 26.1973 9.06241 25.958C8.95398 25.7187 8.9445 25.4462 9.03602 25.1999C9.12755 24.9536 9.31266 24.7535 9.55107 24.6431C9.78947 24.5326 10.0618 24.5209 10.3089 24.6103L14.7906 26.2751C15.621 26.5837 16.4999 26.7411 17.3858 26.74H23.1399C23.3902 26.74 23.6302 26.6406 23.8071 26.4636C23.9841 26.2866 24.0835 26.0466 24.0835 25.7964C24.0835 25.5461 23.9841 25.3061 23.8071 25.1291C23.6302 24.9521 23.3902 24.8527 23.1399 24.8527C22.8757 24.8527 22.6224 24.7478 22.4356 24.561C22.2487 24.3742 22.1438 24.1208 22.1438 23.8566C22.1438 23.5924 22.2487 23.3391 22.4356 23.1523C22.6224 22.9655 22.8757 22.8605 23.1399 22.8605H24.4979C24.7482 22.8605 24.9882 22.7611 25.1652 22.5841C25.3421 22.4072 25.4415 22.1672 25.4415 21.9169C25.4415 21.6666 25.3421 21.4266 25.1652 21.2496C24.9882 21.0727 24.7482 20.9733 24.4979 20.9733C24.2337 20.9733 23.9804 20.8683 23.7936 20.6815C23.6068 20.4947 23.5018 20.2414 23.5018 19.9772C23.5018 19.713 23.6068 19.4596 23.7936 19.2728C23.9804 19.086 24.2337 18.9811 24.4979 18.9811H25.8552C26.0419 18.9811 26.2244 18.9258 26.3796 18.8221C26.5349 18.7184 26.6559 18.5711 26.7273 18.3986C26.7987 18.2261 26.8174 18.0364 26.781 17.8533C26.7446 17.6702 26.6547 17.502 26.5226 17.3701C26.4353 17.2821 26.3313 17.2123 26.2167 17.1649C26.1021 17.1175 25.9793 17.0933 25.8552 17.0938C25.5911 17.0938 25.3377 16.9889 25.1509 16.8021C24.9641 16.6153 24.8592 16.3619 24.8592 16.0977C24.8592 15.8335 24.9641 15.5802 25.1509 15.3934C25.3377 15.2066 25.5911 15.1016 25.8552 15.1016H27.2133C27.3996 15.101 27.5817 15.0452 27.7364 14.9413C27.8911 14.8374 28.0116 14.6899 28.0826 14.5176C28.1537 14.3453 28.1721 14.1558 28.1355 13.973C28.099 13.7902 28.0091 13.6224 27.8773 13.4906C27.7904 13.4029 27.6869 13.3333 27.573 13.2858C27.459 13.2382 27.3367 13.2137 27.2133 13.2137H17.8075C17.6341 13.2139 17.4637 13.1689 17.3131 13.0831C17.1625 12.9973 17.0369 12.8736 16.9487 12.7244C16.8605 12.5752 16.8128 12.4055 16.8103 12.2322C16.8077 12.0589 16.8505 11.8879 16.9342 11.7362C17.2368 11.1222 17.4429 10.4653 17.5452 9.78846C17.7703 8.33616 17.4927 7.0233 16.7204 5.88643C16.621 5.74483 16.4791 5.63852 16.3153 5.58288C16.1515 5.52723 15.9742 5.52514 15.8091 5.57689C15.644 5.62864 15.4996 5.73157 15.3969 5.87077C15.2942 6.00998 15.2383 6.17826 15.2376 6.35127C15.2701 9.76323 13.6936 12.2428 10.6788 13.5231C10.5579 13.5772 10.4275 13.6066 10.2951 13.6097C10.1627 13.6127 10.031 13.5894 9.9078 13.5409C9.78456 13.4925 9.67221 13.42 9.57732 13.3277C9.48243 13.2353 9.40691 13.125 9.35517 13.0031C9.30344 12.8812 9.27652 12.7502 9.27599 12.6178C9.27547 12.4854 9.30135 12.3542 9.35213 12.2319C9.4029 12.1096 9.47755 11.9987 9.5717 11.9056C9.66586 11.8125 9.77763 11.7391 9.90048 11.6897C11.1436 11.1584 12.0494 10.3781 12.5933 9.36014C13.0369 8.5294 13.2573 7.52401 13.246 6.37186C13.2361 5.1128 14.0124 4.0503 15.2196 3.67444C16.4269 3.29858 17.664 3.72623 18.3706 4.76748C20.0115 7.18202 19.7153 9.68819 19.2658 11.2228H27.2133C27.8757 11.2229 28.5186 11.447 29.0376 11.8588C29.5565 12.2705 29.921 12.8456 30.0717 13.4907C30.2224 14.1357 30.1506 14.8128 29.8678 15.4119C29.585 16.0109 29.108 16.4967 28.5142 16.7903C28.8396 17.4861 28.8798 18.2816 28.6261 19.0067C28.3724 19.7317 27.845 20.3287 27.1568 20.6698C27.4824 21.3657 27.5226 22.1615 27.2688 22.8867C27.015 23.6119 26.4873 24.2089 25.7988 24.5499C26.0085 24.9973 26.1019 25.4903 26.0704 25.9834C26.039 26.4764 25.8837 26.9536 25.6188 27.3707C25.354 27.7878 24.9882 28.1313 24.5554 28.3696C24.1226 28.6078 23.6366 28.7329 23.1426 28.7335H23.1399Z'
        className={`fill-dark dark:fill-light`}
      />
      <path
        d='M10.2931 27.2586H4.59082C4.32664 27.2586 4.07328 27.1537 3.88648 26.9669C3.69967 26.7801 3.59473 26.5267 3.59473 26.2625V12.6074C3.59473 12.3432 3.69967 12.0899 3.88648 11.9031C4.07328 11.7163 4.32664 11.6113 4.59082 11.6113H10.2931C10.5573 11.6113 10.8107 11.7163 10.9975 11.9031C11.1843 12.0899 11.2892 12.3432 11.2892 12.6074V26.2625C11.2892 26.5267 11.1843 26.7801 10.9975 26.9669C10.8107 27.1537 10.5573 27.2586 10.2931 27.2586ZM5.58891 25.2664H9.29703V13.6035H5.58691L5.58891 25.2664Z'
        className={`fill-dark dark:fill-light`}
      />
    </svg>
  )
}

export default Like
