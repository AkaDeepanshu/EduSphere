import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Outlet, useParams } from "react-router-dom"
import { AiOutlineMenu } from "react-icons/ai"

import CourseReviewModal from "../components/core/ViewCourse/CourseReviewModal"
import VideoDetailsSidebar from "../components/core/ViewCourse/VideoDetailsSidebar"
import { getFullDetailsOfCourse } from "../services/operations/courseDetailsAPI"
import {
  setCompletedLectures,
  setCourseSectionData,
  setEntireCourseData,
  setTotalNoOfLectures,
} from "../slices/viewCourseSlice"

export default function ViewCourse() {
  const { courseId } = useParams()
  const { token } = useSelector((state) => state.auth)
  const dispatch = useDispatch()
  const [reviewModal, setReviewModal] = useState(false)

  useEffect(() => {
    ;(async () => {
      const courseData = await getFullDetailsOfCourse(courseId, token)
      // console.log("Course Data here... ", courseData.courseDetails)
      dispatch(setCourseSectionData(courseData.courseDetails.courseContent))
      dispatch(setEntireCourseData(courseData.courseDetails))
      dispatch(setCompletedLectures(courseData.completedVideos))
      let lectures = 0
      courseData?.courseDetails?.courseContent?.forEach((sec) => {
        lectures += sec.subSection.length
      })
      dispatch(setTotalNoOfLectures(lectures))
    })()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const [showSidebar, setShowSidebar] = useState(false)

  return (
    <>
      <div className="relative flex min-h-[calc(100vh-3.5rem)]">
        {/* Mobile Sidebar */}
        <div className={`fixed inset-0 z-[1000] lg:hidden ${showSidebar ? "block" : "hidden"}`}>
          <div 
            className="absolute inset-0 bg-richblack-900 opacity-50"
            onClick={() => setShowSidebar(false)}
          ></div>
          <div className="absolute left-0 top-0 bottom-0 w-[320px] bg-richblack-800">
            <VideoDetailsSidebar 
              setReviewModal={setReviewModal} 
              closeSidebar={() => setShowSidebar(false)}
            />
          </div>
        </div>

        {/* Desktop Sidebar */}
        <div className="hidden lg:block">
          <VideoDetailsSidebar setReviewModal={setReviewModal} />
        </div>

        <div className="h-[calc(100vh-3.5rem)] flex-1 overflow-auto">
          <div className="p-4 md:p-6 lg:p-8">
            {/* Mobile menu button */}
            <button 
              className="mb-4 rounded-full p-2 bg-richblack-800 lg:hidden"
              onClick={() => setShowSidebar(true)}
            >
              <AiOutlineMenu className="text-2xl text-richblack-100" />
            </button>

            <Outlet />
          </div>
        </div>
      </div>
      {reviewModal && <CourseReviewModal setReviewModal={setReviewModal} />}
    </>
  )
}