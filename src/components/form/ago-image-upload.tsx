"use client";

import { useState, useRef } from "react";
import { useFormContext } from "react-hook-form";
import { UploadCloud, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { RootState } from "@/redux/store";
import { addImage, setImages } from "@/redux/features/upload/uploadSlice";
import { useUploadImageMutation } from "@/redux/features/upload/uploadApi";

interface Props {
  name: string;
  label?: string;
}

const AgroImageUploader = ({ name, label }: Props) => {
  const [upload] = useUploadImageMutation();
  const dispatch = useAppDispatch();
  const images = useAppSelector((state: RootState) => state.upload.urls);

  const { setValue } = useFormContext();
  const [progress, setProgress] = useState<number[]>([]);
  const [dragActive, setDragActive] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFiles = async (files: FileList) => {
    const newProgress = new Array(files.length).fill(0);
    setProgress(newProgress);

    const uploadedUrls: string[] = [...images];

    for (let index = 0; index < files.length; index++) {
      const file = files[index];
      try {
        const formData = new FormData();
        formData.append("file", file);

        const res = await upload(formData).unwrap();

        uploadedUrls.push(res.url);

        dispatch(addImage(res.url));
        setValue(name, uploadedUrls);

        newProgress[index] = 100;
        setProgress([...newProgress]);
      } catch (error) {
        console.error("Upload failed:", error);
        newProgress[index] = 0;
        setProgress([...newProgress]);
      }
    }
  };

  const handleRemove = (index: number) => {
    const updated = images.filter((_, i) => i !== index);
    dispatch(setImages(updated));
    setValue(name, updated);

    setProgress((p) => p.filter((_, i) => i !== index));
  };

  const onDrop = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFiles(e.dataTransfer.files);
    }
  };

  const onDragOver = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    setDragActive(true);
  };

  const onDragLeave = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    setDragActive(false);
  };

  return (
    <div className="space-y-3">
      {label && (
        <label className="text-base font-semibold text-gray-800">{label}</label>
      )}
      <label
        className={`relative flex flex-col items-center justify-center border-2 border-dashed rounded-xl transition-all duration-200 cursor-pointer min-h-[160px] bg-gradient-to-br from-gray-50 to-white shadow-sm hover:border-green-500 ${
          dragActive ? "border-green-600 bg-green-50" : "border-gray-300"
        }`}
        onDrop={onDrop}
        onDragOver={onDragOver}
        onDragLeave={onDragLeave}
        tabIndex={0}
      >
        <div className="flex flex-col items-center gap-2 pointer-events-none select-none">
          <UploadCloud className="text-green-500 w-10 h-10" />
          <span className="text-gray-700 font-medium">
            Drag & drop images here
          </span>
          <span className="text-xs text-gray-400">or click to browse</span>
        </div>
        <input
          ref={inputRef}
          type="file"
          multiple
          accept="image/*"
          onChange={(e) => e.target.files && handleFiles(e.target.files)}
          className="hidden"
        />
        {dragActive && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.2 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-green-200 pointer-events-none rounded-xl"
          />
        )}
      </label>

      <AnimatePresence>
        {images.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mt-2"
          >
            {images.map((url, index) => (
              <motion.div
                key={url}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="relative group rounded-lg overflow-hidden shadow border border-gray-200 bg-white"
              >
                <img
                  src={url}
                  alt={`Uploaded image ${index + 1}`}
                  className="w-full h-32 object-cover transition-transform duration-200 group-hover:scale-105"
                />
                {progress[index] !== 100 && progress[index] > 0 && (
                  <div className="absolute bottom-0 left-0 w-full h-1 bg-green-100">
                    <motion.div
                      className="h-full bg-green-500"
                      style={{ width: `${progress[index]}%` }}
                      initial={{ width: 0 }}
                      animate={{ width: `${progress[index]}%` }}
                    />
                  </div>
                )}
                <button
                  type="button"
                  onClick={() => handleRemove(index)}
                  className="absolute top-2 right-2 bg-white/80 hover:bg-red-500 hover:text-white text-gray-700 p-1 rounded-full shadow transition-all opacity-0 group-hover:opacity-100"
                  aria-label="Remove image"
                >
                  <X size={16} />
                </button>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AgroImageUploader;
