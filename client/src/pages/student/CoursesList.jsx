import React, { useContext, useEffect, useState } from 'react'
import Footer from '../../components/student/Footer'
import { assets } from '../../assets/assets'
import CourseCard from '../../components/student/CourseCard';
import { AppContext } from '../../context/AppContext';
import { useParams } from 'react-router-dom';
import SearchBar from '../../components/student/SearchBar';
import { motion } from 'framer-motion';

const CoursesList = () => {

    const { input } = useParams()
    const { allCourses, navigate } = useContext(AppContext)
    const [filteredCourse, setFilteredCourse] = useState([])

    useEffect(() => {
        if (allCourses && allCourses.length > 0) {
            const tempCourses = allCourses.slice()
            input
                ? setFilteredCourse(
                    tempCourses.filter(
                        item => item.courseTitle.toLowerCase().includes(input.toLowerCase())
                    )
                )
                : setFilteredCourse(tempCourses)
        }
    }, [allCourses, input])

    return (
        <>
            <div className="relative md:px-36 px-8 pt-20 text-left">
                <div className='flex md:flex-row flex-col gap-6 items-start justify-between w-full'>
                    <div>
                        {/* Changed heading text */}
                        <h1 className='text-4xl font-semibold text-gray-800'>Projects List</h1>
                        <p className='text-gray-500'>
                            <span onClick={() => navigate('/')} className='text-blue-600 cursor-pointer'>Home</span> / <span>Projects List</span>
                        </p>
                    </div>

                    {/* SearchBar with textColor black to fix visibility issue */}
                    <SearchBar data={input} textColor="black" />
                </div>

                {/* Show active search input */}
                {input && (
                    <div className='inline-flex items-center gap-4 px-4 py-2 border mt-8 -mb-8 text-gray-600'>
                        <p>{input}</p>
                        <img
                            onClick={() => navigate('/course-list')}
                            className='cursor-pointer'
                            src={assets.cross_icon}
                            alt=""
                        />
                    </div>
                )}

                {/* Projects Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 my-16 gap-6 px-2 md:p-0">
                    {filteredCourse.length > 0 ? (
                        filteredCourse.map((course, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                            >
                                <CourseCard course={course} />
                            </motion.div>
                        ))
                    ) : (
                        <motion.div
                            className="col-span-full text-center py-20 text-gray-500 text-lg"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.8 }}
                        >
                            No Projects Added Yet
                        </motion.div>
                    )}
                </div>
            </div>
            <Footer />
        </>
    )
}

export default CoursesList;