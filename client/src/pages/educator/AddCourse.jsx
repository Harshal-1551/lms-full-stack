import React, { useEffect, useRef, useState, useContext } from "react";
import { toast } from "react-toastify";
import Quill from "quill";
import axios from "axios";
import { AppContext } from "../../context/AppContext";
import ThumbnailUpload from "./ThumbnailUpload";
import { useImageSelector } from "../../hooks/useImageSelector";

const AddCourse = () => {
  const editorRef = useRef(null);
  const quillRef = useRef(null);
  const {
    image,
    preview,
    inputRef,
    openPicker,
    handleChange,
    reset,
  } = useImageSelector();
  const { backendUrl, getToken } = useContext(AppContext);

  const [courseTitle, setCourseTitle] = useState("");
  const [coursePrice, setCoursePrice] = useState("");
  const [discount, setDiscount] = useState("");
  const [pdfLink, setPdfLink] = useState("");
  const [domain, setDomain] = useState("");
  const [description, setDescription] = useState("");
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const savedForm = sessionStorage.getItem("addCourseForm");
    if (savedForm) {
      const data = JSON.parse(savedForm);
      setCourseTitle(data.courseTitle || "");
      setCoursePrice(data.coursePrice || "");
      setDiscount(data.discount || "");
      setPdfLink(data.pdfLink || "");
      setDomain(data.domain || "");
      setDescription(data.description || "");
    }
  }, []);

  useEffect(() => {
    if (!quillRef.current && editorRef.current) {
      quillRef.current = new Quill(editorRef.current, { theme: "snow" });
      quillRef.current.on("text-change", () => {
        setDescription(quillRef.current.root.innerText);
      });

      const savedForm = sessionStorage.getItem("addCourseForm");
      if (savedForm) {
        const data = JSON.parse(savedForm);
        if (data.description) quillRef.current.root.innerHTML = data.description;
      }
    }
  }, []);

  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.visibilityState === "hidden") {
        const formState = {
          courseTitle,
          coursePrice,
          discount,
          pdfLink,
          domain,
          description,
        };
        sessionStorage.setItem("addCourseForm", JSON.stringify(formState));
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () =>
      document.removeEventListener("visibilitychange", handleVisibilityChange);
  }, [courseTitle, coursePrice, discount, pdfLink, domain, description]);

  const isValidURL = (url) => {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    try {
      const formData = new FormData();
      const selectedDomain = domain && domain.trim() !== "" ? domain : "General";
      const courseData = {
        courseTitle,
        courseDescription: description,
        coursePrice: Number(coursePrice),
        discount: Number(discount),
        domain: selectedDomain, // ✅ always valid
        pdfLink,
      };

       console.log("Submitting courseData to backend:", courseData);
       
      formData.append("courseData", JSON.stringify(courseData));
      formData.append("image", image);

      const token = await getToken();
      const { data } = await axios.post(
        `${backendUrl}/api/educator/add-course`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (data.success) {
        toast.success(data.message);
        resetForm();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error("Upload error:", error);
      toast.error(error.response?.data?.message || error.message);
    }
  };

  const resetForm = () => {
    setCourseTitle("");
    setCoursePrice("");
    setDiscount("");
    setPdfLink("");
    setDomain("");
    setDescription("");
    setErrors({});
    sessionStorage.removeItem("addCourseForm");
    reset();
  };
  

  return (
    <div className="flex min-h-screen">
      <div className="flex-1 flex justify-center items-start bg-gradient-to-b from-gray-50 to-gray-200 py-10 px-4">
        <form
          onSubmit={handleSubmit}
          encType="multipart/form-data"
          className="w-full max-w-2xl bg-white/90 backdrop-blur-md shadow-xl rounded-2xl p-6 md:p-8 flex flex-col gap-6"
        >
          <h2 className="text-4xl font-extrabold text-center bg-gradient-to-r from-cyan-500 to-blue-600 bg-clip-text text-transparent mb-4">
            Add New Project
          </h2>

          {/* Project Title */}
          <div className="flex flex-col gap-1">
            <p className="font-semibold">Project Title</p>
            <input
              type="text"
              placeholder="Type here"
              className={`outline-none py-2.5 px-3 rounded border ${
                errors.courseTitle ? "border-red-500" : "border-gray-300"
              }`}
              value={courseTitle}
              onChange={(e) => setCourseTitle(e.target.value)}
            />
            {errors.courseTitle && (
              <span className="text-red-500 text-sm">{errors.courseTitle}</span>
            )}
          </div>

          {/* Description */}
          <div className="flex flex-col gap-2">
            <p className="font-semibold text-gray-700 text-lg">
              Project Description
            </p>
            <div
              ref={editorRef}
              className="min-h-[200px] p-4 rounded-xl border border-gray-200 focus-within:ring-2 focus-within:ring-cyan-300"
            />
          </div>

          {/* Domain */}
          <div className="flex flex-col gap-1">
            <p className="font-semibold">Project Domain</p>
            <select
              className={`outline-none py-2.5 px-3 rounded border ${
                errors.domain ? "border-red-500" : "border-gray-300"
              }`}
              value={domain}
              onChange={(e) => setDomain(e.target.value)}
            >
              <option value="">Select Domain</option>
              <option value="Web Development">Web Development</option>
              <option value="Data Science">Data Science</option>
              <option value="AI">Artificial Intelligence</option>
              <option value="Blockchain">Blockchain</option>
              <option value="Cybersecurity">Cybersecurity</option>
              <option value="Mobile Development">Mobile Development</option>
              <option value="Cloud Computing">Cloud Computing</option>
            </select>
            {errors.domain && (
              <span className="text-red-500 text-sm">{errors.domain}</span>
            )}
          </div>

          {/* Price & Discount */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex flex-col gap-1">
              <p className="font-semibold">Project Price (USD)</p>
              <input
                type="number"
                placeholder="0"
                min={0}
                step="0.01"
                className={`outline-none py-2 px-3 rounded border ${
                  errors.coursePrice ? "border-red-500" : "border-gray-300"
                }`}
                value={coursePrice}
                onChange={(e) => setCoursePrice(e.target.value)}
              />
            </div>

            <div className="flex flex-col gap-1">
              <p className="font-semibold">Discount %</p>
              <input
                type="number"
                placeholder="0"
                min={0}
                max={100}
                className={`outline-none py-2 px-3 rounded border ${
                  errors.discount ? "border-red-500" : "border-gray-300"
                }`}
                value={discount}
                onChange={(e) => setDiscount(e.target.value)}
              />
            </div>
          </div>

          {/* PDF / Drive Link */}
          <div className="flex flex-col gap-1">
            <p className="font-semibold">
              View More Details (Google Drive Link)
            </p>
            <input
              type="url"
              placeholder="Paste your Google Drive link here"
              className={`outline-none py-2 px-3 rounded border ${
                errors.pdfLink ? "border-red-500" : "border-gray-300"
              }`}
              value={pdfLink}
              onChange={(e) => setPdfLink(e.target.value)}
            />
            {errors.pdfLink && (
              <span className="text-red-500 text-sm">{errors.pdfLink}</span>
            )}
          </div>

          <ThumbnailUpload
            ref={inputRef}
            preview={preview}
            openPicker={openPicker}
            onSelect={handleChange}
          />

          

          {/* Submit */}
          <button
            type="submit"
            className="mt-4 bg-gradient-to-r from-cyan-600 to-blue-600 text-white py-3 px-6 rounded-2xl shadow-md hover:scale-105 transition-all font-semibold"
          >
            Add Project
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddCourse;
