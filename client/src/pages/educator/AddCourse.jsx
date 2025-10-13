import React, { useContext, useEffect, useRef, useState } from 'react';
import { assets } from '../../assets/assets';
import { toast } from 'react-toastify';
import Quill from 'quill';
import uniqid from 'uniqid';
import axios from 'axios';
import { AppContext } from '../../context/AppContext';
import { motion, AnimatePresence } from 'framer-motion';

const AddCourse = () => {
  const editorRef = useRef(null);
  const quillRef = useRef(null);
  const { backendUrl, getToken } = useContext(AppContext);

  const [courseTitle, setCourseTitle] = useState('');
  const [coursePrice, setCoursePrice] = useState('');
  const [discount, setDiscount] = useState('');
  const [image, setImage] = useState(null);
  const [chapters, setChapters] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [currentChapterId, setCurrentChapterId] = useState(null);
  const [lectureDetails, setLectureDetails] = useState({
    lectureTitle: '',
    lectureDuration: '',
    lectureUrl: '',
    isPreviewFree: false,
  });
  const [errors, setErrors] = useState({});

  const handleChapter = (action, chapterId) => {
    if (action === 'add') {
      const title = prompt('Enter Chapter Name:');
      if (title) {
        const newChapter = {
          chapterId: uniqid(),
          chapterTitle: title,
          chapterContent: [],
          collapsed: false,
          chapterOrder: chapters.length > 0 ? chapters.slice(-1)[0].chapterOrder + 1 : 1,
        };
        setChapters([...chapters, newChapter]);
      }
    } else if (action === 'remove') {
      setChapters(chapters.filter((chapter) => chapter.chapterId !== chapterId));
    } else if (action === 'toggle') {
      setChapters(
        chapters.map((chapter) =>
          chapter.chapterId === chapterId ? { ...chapter, collapsed: !chapter.collapsed } : chapter
        )
      );
    }
  };

  const handleLecture = (action, chapterId, lectureIndex) => {
    if (action === 'add') {
      setCurrentChapterId(chapterId);
      setShowPopup(true);
    } else if (action === 'remove') {
      setChapters(
        chapters.map((chapter) => {
          if (chapter.chapterId === chapterId) {
            chapter.chapterContent.splice(lectureIndex, 1);
          }
          return chapter;
        })
      );
    }
  };

  const addLecture = () => {
    if (!lectureDetails.lectureTitle || !lectureDetails.lectureDuration || !lectureDetails.lectureUrl) {
      toast.error('Please fill all lecture details');
      return;
    }

    setChapters(
      chapters.map((chapter) => {
        if (chapter.chapterId === currentChapterId) {
          const newLecture = {
            ...lectureDetails,
            lectureOrder:
              chapter.chapterContent.length > 0
                ? chapter.chapterContent.slice(-1)[0].lectureOrder + 1
                : 1,
            lectureId: uniqid(),
          };
          chapter.chapterContent.push(newLecture);
        }
        return chapter;
      })
    );
    setShowPopup(false);
    setLectureDetails({
      lectureTitle: '',
      lectureDuration: '',
      lectureUrl: '',
      isPreviewFree: false,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = {};
    if (!courseTitle.trim()) newErrors.courseTitle = 'Course title is required';
    if (!coursePrice) newErrors.coursePrice = 'Course price is required';
    if (discount === '' || discount < 0 || discount > 100)
      newErrors.discount = 'Discount must be 0-100';
    if (!image) newErrors.image = 'Course thumbnail is required';

    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;

    try {
      const courseData = {
        courseTitle,
        courseDescription: quillRef.current.root.innerHTML,
        coursePrice: Number(coursePrice),
        discount: Number(discount),
        courseContent: chapters,
      };

      const formData = new FormData();
      formData.append('courseData', JSON.stringify(courseData));
      formData.append('image', image);

      const token = await getToken();
      const { data } = await axios.post(backendUrl + '/api/educator/add-course', formData, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (data.success) {
        toast.success(data.message);
        setCourseTitle('');
        setCoursePrice('');
        setDiscount('');
        setImage(null);
        setChapters([]);
        quillRef.current.root.innerHTML = '';
        setErrors({});
      } else toast.error(data.message);
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    if (!quillRef.current && editorRef.current) {
      quillRef.current = new Quill(editorRef.current, { theme: 'snow' });
    }
  }, []);

  return (
    <div className="min-h-screen flex justify-center items-start bg-gradient-to-b from-gray-50 to-gray-200 py-10 px-4">
      <motion.form
        onSubmit={handleSubmit}
        className="w-full max-w-2xl bg-white/90 backdrop-blur-md shadow-xl rounded-2xl p-6 md:p-8 flex flex-col gap-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        {/* Title */}
        <h2 className="text-4xl font-extrabold text-center bg-gradient-to-r from-cyan-500 to-blue-600 bg-clip-text text-transparent mb-4">
          Add New Project
        </h2>

        {/* Project Title */}
        <div className="flex flex-col gap-1">
          <p className="font-semibold">Project Title</p>
          <input
            type="text"
            placeholder="Type here"
            className={`outline-none py-2.5 px-3 rounded border focus:ring-2 transition ${
              errors.courseTitle ? 'border-red-500 focus:ring-red-300' : 'border-gray-300 focus:ring-cyan-300'
            }`}
            value={courseTitle}
            onChange={(e) => setCourseTitle(e.target.value)}
          />
          {errors.courseTitle && <span className="text-red-500 text-sm">{errors.courseTitle}</span>}
        </div>

        {/* Project Description */}
         <div className="flex flex-col gap-2">
           <p className="font-semibold text-gray-700 text-lg">Project Description</p>
           <div
             ref={editorRef}
             className="min-h-[250px] p-5 rounded-3xl bg-white/40 backdrop-blur-md shadow-inner hover:shadow-lg transition-all border border-gray-200 focus-within:ring-2 focus-within:ring-cyan-300 outline-none"
           />
         </div>


        {/* Price, Discount, Thumbnail */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="flex flex-col gap-1">
            <p className="font-semibold">Project Price</p>
            <input
              type="number"
              placeholder="0"
              className={`outline-none py-2 px-3 rounded border focus:ring-2 transition ${
                errors.coursePrice ? 'border-red-500 focus:ring-red-300' : 'border-gray-300 focus:ring-cyan-300'
              }`}
              value={coursePrice}
              onChange={(e) => setCoursePrice(e.target.value)}
            />
            {errors.coursePrice && <span className="text-red-500 text-sm">{errors.coursePrice}</span>}
          </div>

          <div className="flex flex-col gap-1">
            <p className="font-semibold">Discount %</p>
            <input
              type="number"
              placeholder="0"
              min={0}
              max={100}
              className={`outline-none py-2 px-3 rounded border focus:ring-2 transition ${
                errors.discount ? 'border-red-500 focus:ring-red-300' : 'border-gray-300 focus:ring-cyan-300'
              }`}
              value={discount}
              onChange={(e) => setDiscount(e.target.value)}
            />
            {errors.discount && <span className="text-red-500 text-sm">{errors.discount}</span>}
          </div>

           {/* Thumbnail */}
          <div className="flex flex-col gap-2 sm:col-span-2">
            <p className="font-semibold text-gray-700">Project Thumbnail</p>
            <label
              className={`flex flex-col items-center justify-center gap-3 py-6 px-4 rounded-2xl border-2 border-dashed cursor-pointer transition-all ${
                errors.image ? 'border-red-500 bg-red-50' : 'border-cyan-400 hover:bg-cyan-50'
              }`}
            >
              <img
                src={assets.file_upload_icon}
                alt="Upload"
                className="w-16 h-16 p-3 bg-cyan-200 rounded-full hover:bg-cyan-300 transition"
              />
              <span className="text-gray-600 font-medium">Click to upload project thumbnail</span>
              <input type="file" accept="image/*" className="hidden" onChange={(e) => setImage(e.target.files[0])} />
              {image && (
                <img
                  className="mt-3 max-h-40 rounded-xl shadow-md border border-gray-200"
                  src={URL.createObjectURL(image)}
                  alt=""
                />
              )}
            </label>
            {errors.image && <span className="text-red-500 text-sm">{errors.image}</span>}
          </div>
        </div>

        {/* Chapters */}
        <div>
          <AnimatePresence>
            {chapters.map((chapter, idx) => (
              <motion.div
                key={chapter.chapterId}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.25 }}
                className="bg-gray-50 border border-gray-200 rounded-lg mb-3 shadow-sm hover:shadow-md transition-shadow"
              >
                <div
                  className="flex justify-between items-center p-3 border-b cursor-pointer"
                  onClick={() => handleChapter('toggle', chapter.chapterId)}
                >
                  <div className="flex items-center gap-2">
                    <img
                      src={assets.dropdown_icon}
                      alt=""
                      className={`w-4 transition-transform ${chapter.collapsed ? '-rotate-90' : ''}`}
                    />
                    <span className="font-semibold">
                      {idx + 1}. {chapter.chapterTitle}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-gray-500">{chapter.chapterContent.length} Lectures</span>
                    <img
                      src={assets.cross_icon}
                      alt=""
                      className="w-4 cursor-pointer"
                      onClick={() => handleChapter('remove', chapter.chapterId)}
                    />
                  </div>
                </div>

                <AnimatePresence>
                  {!chapter.collapsed &&
                    chapter.chapterContent.map((lecture, lidx) => (
                      <motion.div
                        key={lecture.lectureId}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -10 }}
                        transition={{ duration: 0.2 }}
                        className="flex justify-between items-center p-2 px-4 border-b last:border-none hover:bg-gray-50 rounded"
                      >
                        <span>
                          {lidx + 1}. {lecture.lectureTitle} - {lecture.lectureDuration} mins -{' '}
                          <a href={lecture.lectureUrl} target="_blank" className="text-cyan-500 hover:underline">
                            Link
                          </a>{' '}
                          - {lecture.isPreviewFree ? 'Free' : 'Paid'}
                        </span>
                        <img
                          src={assets.cross_icon}
                          alt=""
                          className="w-4 cursor-pointer"
                          onClick={() => handleLecture('remove', chapter.chapterId, lidx)}
                        />
                      </motion.div>
                    ))}
                </AnimatePresence>

                <div
                  className="p-2 text-center cursor-pointer bg-cyan-50 rounded-b hover:bg-cyan-100 transition"
                  onClick={() => handleLecture('add', chapter.chapterId)}
                >
                  + Add Lecture
                </div>
              </motion.div>
            ))}
          </AnimatePresence>

          <div
            className="flex justify-center items-center mt-2 p-2 bg-cyan-100 rounded-lg cursor-pointer hover:bg-cyan-200 transition"
            onClick={() => handleChapter('add')}
          >
            + Add Chapter
          </div>
        </div>

        <button
          type="submit"
          className="mt-4 bg-gradient-to-r from-cyan-600 to-blue-600 text-white py-3 px-6 rounded-2xl shadow-md hover:shadow-lg hover:scale-105 transition-all font-semibold"
        >
          Add Project
        </button>
      </motion.form>

      {/* Lecture Popup */}
      <AnimatePresence>
        {showPopup && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50 backdrop-blur-sm"
          >
            <motion.div
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -20, opacity: 0 }}
              className="bg-white/60 backdrop-blur-md p-6 rounded-3xl shadow-2xl w-full max-w-md border border-gray-200"
            >
              <h2 className="text-2xl font-bold mb-4 text-gray-800 text-center">
                Add Lecture
              </h2>
              <div className="flex flex-col gap-3">
                <input
                  type="text"
                  placeholder="Lecture Title"
                  className="border px-4 py-3 rounded-xl focus:ring-2 focus:ring-cyan-300 outline-none transition"
                  value={lectureDetails.lectureTitle}
                  onChange={(e) => setLectureDetails({ ...lectureDetails, lectureTitle: e.target.value })}
                />
                <input
                  type="number"
                  placeholder="Duration (mins)"
                  className="border px-4 py-3 rounded-xl focus:ring-2 focus:ring-cyan-300 outline-none transition"
                  value={lectureDetails.lectureDuration}
                  onChange={(e) => setLectureDetails({ ...lectureDetails, lectureDuration: e.target.value })}
                />
                <input
                  type="text"
                  placeholder="Lecture URL"
                  className="border px-4 py-3 rounded-xl focus:ring-2 focus:ring-cyan-300 outline-none transition"
                  value={lectureDetails.lectureUrl}
                  onChange={(e) => setLectureDetails({ ...lectureDetails, lectureUrl: e.target.value })}
                />
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    className="scale-125"
                    checked={lectureDetails.isPreviewFree}
                    onChange={(e) => setLectureDetails({ ...lectureDetails, isPreviewFree: e.target.checked })}
                  />
                  <span className="text-gray-700 font-medium">Free Preview</span>
                </div>
                <button
                  type="button"
                  className="bg-gradient-to-r from-cyan-500 to-blue-500 text-white py-3 rounded-2xl font-semibold hover:scale-105 shadow-lg transition-all"
                  onClick={addLecture}
                >
                  Add Lecture
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AddCourse;
