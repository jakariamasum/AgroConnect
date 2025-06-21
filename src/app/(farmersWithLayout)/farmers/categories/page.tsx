/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Button } from "@/components/ui/button";
import Modal from "@/components/ui/modal";
import AgroForm from "@/components/form/agro-form";
import AgroInput from "@/components/form/agro-input";
import AgroSelect from "@/components/form/agro-select";
import AgroImageUploader from "@/components/form/ago-image-upload";
import Label from "@/components/ui/label";
import AgroTextarea from "@/components/form/agro-textarea";
import { Search } from "lucide-react";
import {
  useCreateCategoryMutation,
  useGetCategoriesQuery,
} from "@/redux/features/categories/categoriesApi";
import { toast } from "sonner";
import { addCategory } from "@/redux/features/categories/categoriesSlice";
import { Category } from "@/generated/prisma";
import { useState } from "react";

const CategoryPage = () => {
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [create] = useCreateCategoryMutation();
  const { data: response } = useGetCategoriesQuery({});
  //   console.log(data?.data);
  const categories = response?.data?.data || [];

  const onSubmit = async (data: any) => {
    // setLoading(true);
    const image = data.image?.[0] || "";
    data.image = image;
    console.log("Form data:", data);
    const res = await create(data).unwrap();
    if (res.success) {
      addCategory(res.data);
      toast.success("Category created successfully!");
      setShowModal(false);
    } else {
      toast.error("Failed to create category: " + res.message);
    }
    setLoading(false);
  };

  const categoryOptions = categories?.map((cat: Category) => ({
    label: cat.name,
    value: cat.id,
  }));

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-10">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Category Management</h1>
        <Button onClick={() => setShowModal(true)}>Create Category</Button>
      </div>

      <Modal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        title="Create Category"
        size="lg"
      >
        <div className="p-4">
          <AgroForm onSubmit={onSubmit}>
            <div className="grid grid-cols-2 gap-4 mb-4">
              <AgroInput
                name="name"
                label="Category Name"
                required
                placeholder="e.g, Rice"
              />
              <AgroInput
                name="slug"
                label="Slug"
                type="text"
                placeholder="abc-rice"
              />
            </div>

            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <Label label="Category" />
                <AgroSelect name="parentId" options={categoryOptions} />
              </div>
              <AgroInput
                name="sortOrder"
                label="Sort Order"
                type="number"
                placeholder="e.g, abc"
              />
            </div>
            <div>
              <Label label="Category Image" />
              <AgroImageUploader name="image" />
            </div>
            <div>
              <Label label="Description" />
              <AgroTextarea name="description" />
            </div>
            <div className="flex justify-end pt-4 gap-3">
              <Button variant="outline" onClick={() => setShowModal(false)}>
                Close
              </Button>
              <Button type="submit" disabled={loading}>
                {loading ? "Creating..." : "Create Category"}
              </Button>
            </div>
          </AgroForm>
        </div>
      </Modal>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {categories?.map((cat: Category) => (
          <div
            key={cat.id}
            className="border rounded-lg p-4 bg-white shadow-sm hover:shadow-md transition"
          >
            <div className="flex justify-between items-center mb-2">
              <h2 className="font-semibold text-lg">{cat.name}</h2>
              <span className="text-sm text-gray-500">
                Order: {cat.sortOrder}
              </span>
            </div>
            {cat.parentId && (
              <div className="text-sm text-gray-600 mb-2">
                Parent: <span className="font-medium">{cat.parentId}</span>
              </div>
            )}
            {cat.image && (
              <img
                src={cat.image}
                alt={cat.name}
                className="w-full h-32 object-cover rounded border"
              />
            )}
            <p className="text-sm text-gray-700 mt-2">
              {cat.description || "No description provided."}
            </p>
          </div>
        ))}
      </div>
      {categories?.length === 0 && (
        <div className="text-center py-20">
          <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <Search className="w-12 h-12 text-gray-400" />
          </div>
          <h3 className="text-2xl font-semibold text-gray-900 mb-2">
            No category found
          </h3>
          <p className="text-gray-600 mb-6">
            create a new category to get started.
          </p>
        </div>
      )}
    </div>
  );
};
export default CategoryPage;
