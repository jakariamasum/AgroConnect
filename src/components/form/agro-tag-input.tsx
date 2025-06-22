"use client";

import { useState, useEffect, KeyboardEvent } from "react";
import { useFormContext } from "react-hook-form";
import { X } from "lucide-react";

interface TagInputProps {
  name: string;
  placeholder?: string;
}

const AgroTagInput = ({ name, placeholder }: TagInputProps) => {
  const { register, setValue, getValues } = useFormContext();
  const [inputValue, setInputValue] = useState("");
  const [tags, setTags] = useState<string[]>([]);

  useEffect(() => {
    const initial = getValues(name);
    if (Array.isArray(initial)) {
      setTags(initial);
    }
  }, [getValues, name]);

  const addTags = (value: string) => {
    const newValues = value
      .split(",")
      .map((tag) => tag.trim())
      .filter((tag) => tag && !tags.includes(tag));

    if (newValues.length > 0) {
      const newTags = [...tags, ...newValues];
      setTags(newTags);
      setValue(name, newTags, { shouldValidate: true, shouldDirty: true });
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if ((e.key === "Enter" || e.key === ",") && inputValue.trim()) {
      e.preventDefault();
      addTags(inputValue);
      setInputValue("");
    }
  };

  const removeTag = (index: number) => {
    const newTags = tags.filter((_, i) => i !== index);
    setTags(newTags);
    setValue(name, newTags, { shouldValidate: true, shouldDirty: true });
  };

  return (
    <div>
      <div className="flex flex-wrap items-center gap-2 p-2 border rounded-md">
        {tags.map((tag, idx) => (
          <span
            key={idx}
            className="flex items-center bg-blue-100 text-blue-800 text-sm px-2 py-1 rounded-full"
          >
            {tag}
            <button
              type="button"
              onClick={() => removeTag(idx)}
              className="ml-1 hover:text-red-600"
            >
              <X size={14} />
            </button>
          </span>
        ))}

        <input
          type="text"
          className="flex-1 outline-none border-none min-w-[120px]"
          placeholder={placeholder}
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
        />
      </div>

      {/* Hidden input registered for form submission */}
      <input type="hidden" {...register(name)} />
    </div>
  );
};

export default AgroTagInput;
