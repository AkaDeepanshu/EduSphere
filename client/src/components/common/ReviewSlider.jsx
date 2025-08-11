import React, { useEffect, useState } from "react"
import ReactStars from "react-rating-stars-component"
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react"

// Import Swiper styles
import "swiper/css"
import "swiper/css/free-mode"
import "swiper/css/pagination"
import "../../App.css"
// Icons
import { FaStar } from "react-icons/fa"
// Import required modules
import { Autoplay, FreeMode, Pagination } from "swiper/modules"

// Get apiFunction and the endpoint
import { apiConnector } from "../../services/apiconnector"
import { ratingsEndpoints } from "../../services/apis"

function ReviewSlider() {
  const [reviews, setReviews] = useState([])
  const truncateWords = 15

  useEffect(() => {
    ;(async () => {
      const { data } = await apiConnector(
        "GET",
        ratingsEndpoints.REVIEWS_DETAILS_API
      )
      if (data?.success) {
        setReviews(data?.data)
      }
    })()
  }, [])

  // console.log(reviews)

  return (
    <div className="text-white">
      <div className="my-[50px] h-[184px] max-w-maxContentTab lg:max-w-maxContent">
        {reviews.length === 0 ? (
          <div className="flex h-full items-center justify-center text-richblack-25">
            No reviews yet
          </div>
        ) : (
          <Swiper
          slidesPerView={1}
          spaceBetween={25}
          loop={reviews.length > 1}
          freeMode={reviews.length > 1}
          autoplay={
            reviews.length > 1 
              ? {
                  delay: 2500,
                  disableOnInteraction: false,
                }
              : false
          }
          modules={[FreeMode, Pagination, Autoplay]}
          breakpoints={{
            640: {
              slidesPerView: reviews.length < 2 ? reviews.length : 2,
            },
            768: {
              slidesPerView: reviews.length < 3 ? reviews.length : 3,
            },
            1024: {
              slidesPerView: reviews.length < 4 ? reviews.length : 4,
            },
          }}
          className={`w-full ${reviews.length === 1 ? 'max-w-[400px] mx-auto' : ''}`}
        >
          {reviews.map((review, i) => {
            return (
              <SwiperSlide key={i}>
                <div className={`flex flex-col gap-3 bg-richblack-800 p-3 text-[14px] text-richblack-25 h-full ${reviews.length === 1 ? 'w-full' : ''}`}>
                  <div className="flex items-center gap-4">
                    <img
                      src={
                        review?.user?.image
                          ? review?.user?.image
                          : `https://api.dicebear.com/5.x/initials/svg?seed=${review?.user?.firstName} ${review?.user?.lastName}`
                      }
                      alt=""
                      className="h-9 w-9 rounded-full object-cover"
                    />
                    <div className="flex flex-col">
                      <h1 className="font-semibold text-richblack-5">{`${review?.user?.firstName} ${review?.user?.lastName}`}</h1>
                      <h2 className="text-[12px] font-medium text-richblack-500">
                        {review?.course?.courseName}
                      </h2>
                    </div>
                  </div>
                  <p className="font-medium text-richblack-25">
                    {review?.review.split(" ").length > truncateWords
                      ? `${review?.review
                          .split(" ")
                          .slice(0, truncateWords)
                          .join(" ")} ...`
                      : `${review?.review}`}
                  </p>
                  <div className="flex items-center gap-2 ">
                    <h3 className="font-semibold text-yellow-100">
                      {review.rating.toFixed(1)}
                    </h3>
                    <ReactStars
                      count={5}
                      value={review.rating}
                      size={20}
                      edit={false}
                      activeColor="#ffd700"
                      emptyIcon={<FaStar />}
                      fullIcon={<FaStar />}
                    />
                  </div>
                </div>
              </SwiperSlide>
            )
          })}
        </Swiper>
        )}
      </div>
    </div>
  )
}

export default ReviewSlider