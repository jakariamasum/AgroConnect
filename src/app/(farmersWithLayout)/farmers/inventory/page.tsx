/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Badge from "@/components/ui/badge";
import Modal from "@/components/ui/modal";
import {
  Package,
  Plus,
  Search,
  Edit,
  Trash2,
  AlertTriangle,
  TrendingUp,
  TrendingDown,
  Eye,
  Download,
} from "lucide-react";
import { toast } from "sonner";
import AgroForm from "@/components/form/agro-form";
import AgroInput from "@/components/form/agro-input";
import AgroSelect from "@/components/form/agro-select";
import Label from "@/components/ui/label";
import { useGetCategoriesQuery } from "@/redux/features/categories/categoriesApi";
import AgroTextarea from "@/components/form/agro-textarea";
import { Category } from "@/generated/prisma";
import AgroTagInput from "@/components/form/agro-tag-input";
import AgroImageUploader from "@/components/form/ago-image-upload";
import AgroCheckbox from "@/components/form/agro-checkbox";
import { useCreateProductMutation } from "@/redux/features/products/productApi";
import { addProduct } from "@/redux/features/products/productsSlice";

interface InventoryItem {
  id: number;
  name: string;
  category: string;
  currentStock: number;
  unit: string;
  minThreshold: number;
  maxCapacity: number;
  pricePerUnit: number;
  lastUpdated: string;
  status: "in_stock" | "low_stock" | "out_of_stock" | "overstocked";
  image: string;
  location: string;
  expiryDate?: string;
  supplier?: string;
  notes?: string;
}

const FarmerInventory = () => {
  const [create] = useCreateProductMutation();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState<InventoryItem | null>(null);
  const [viewMode, setViewMode] = useState<"grid" | "table">("table");
  const { data: response } = useGetCategoriesQuery({});
  const categories = response?.data?.data || [];

  const [inventory, setInventory] = useState<InventoryItem[]>([
    {
      id: 1,
      name: "Fresh Tomatoes",
      category: "vegetables",
      currentStock: 150,
      unit: "kg",
      minThreshold: 50,
      maxCapacity: 500,
      pricePerUnit: 45,
      lastUpdated: "2024-01-15",
      status: "in_stock",
      image: "",
      location: "Greenhouse A",
      expiryDate: "2024-01-25",
      supplier: "Own Production",
    },
  ]);

  const statusOptions = [
    { value: "all", label: "All Status" },
    { value: "in_stock", label: "In Stock" },
    { value: "low_stock", label: "Low Stock" },
    { value: "out_of_stock", label: "Out of Stock" },
    { value: "overstocked", label: "Overstocked" },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "in_stock":
        return "success";
      case "low_stock":
        return "warning";
      case "out_of_stock":
        return "danger";
      case "overstocked":
        return "info";
      default:
        return "default";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "low_stock":
      case "out_of_stock":
        return <AlertTriangle className="w-4 h-4" />;
      case "overstocked":
        return <TrendingUp className="w-4 h-4" />;
      default:
        return null;
    }
  };

  const categoryOptions = categories?.map((cat: Category) => ({
    label: cat.name,
    value: cat.id,
  }));

  const filteredInventory = inventory.filter((item) => {
    const matchesSearch =
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.category.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory =
      selectedCategory === "all" || item.category === selectedCategory;
    const matchesStatus =
      selectedStatus === "all" || item.status === selectedStatus;

    return matchesSearch && matchesCategory && matchesStatus;
  });

  const inventoryStats = {
    totalItems: inventory.length,
    lowStockItems: inventory.filter((item) => item.status === "low_stock")
      .length,
    outOfStockItems: inventory.filter((item) => item.status === "out_of_stock")
      .length,
    totalValue: inventory.reduce(
      (sum, item) => sum + item.currentStock * item.pricePerUnit,
      0
    ),
  };

  const handleAddItem = () => {
    setShowAddModal(true);
  };

  const handleEditItem = (item: InventoryItem) => {
    setSelectedItem(item);
    setShowEditModal(true);
  };

  const handleDeleteItem = (id: number) => {
    setInventory((prev) => prev.filter((item) => item.id !== id));
    toast.success("Item deleted successfully");
  };
  const onSubmitAddItem = async (data: any) => {
    data.farmerId = "cmc52ichm00019wactecxtb4k"; // Replace with actual farmer ID
    console.log("Add Item Data:", data);

    const res = await create(data).unwrap();
    console.log("Create Product Response:", res);
    if (res.success) {
      toast.success("Product added successfully");
      addProduct(res.data);
    } else {
      toast.error("Failed to add product");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex">
        <main className="flex-1 p-6">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center justify-between mb-8"
          >
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                Inventory Management
              </h1>
              <p className="text-gray-600">
                Track and manage your farm inventory
              </p>
            </div>
            <div className="flex items-center space-x-3">
              <Button variant="outline">
                <Download className="w-4 h-4 mr-2" />
                Export
              </Button>
              <Button onClick={handleAddItem}>
                <Plus className="w-4 h-4 mr-2" />
                Add Item
              </Button>
            </div>
          </motion.div>

          {/* Stats Cards */}
          <div className="grid md:grid-cols-4 gap-6 mb-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">Total Items</p>
                      <p className="text-2xl font-bold">
                        {inventoryStats.totalItems}
                      </p>
                    </div>
                    <Package className="w-8 h-8 text-blue-600" />
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">Low Stock</p>
                      <p className="text-2xl font-bold text-yellow-600">
                        {inventoryStats.lowStockItems}
                      </p>
                    </div>
                    <AlertTriangle className="w-8 h-8 text-yellow-600" />
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">Out of Stock</p>
                      <p className="text-2xl font-bold text-red-600">
                        {inventoryStats.outOfStockItems}
                      </p>
                    </div>
                    <TrendingDown className="w-8 h-8 text-red-600" />
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">Total Value</p>
                      <p className="text-2xl font-bold text-green-600">
                        ৳{inventoryStats.totalValue.toLocaleString()}
                      </p>
                    </div>
                    <TrendingUp className="w-8 h-8 text-green-600" />
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          {/* Filters */}
          <Card className="mb-6">
            <CardContent className="p-6">
              <AgroForm onSubmit={() => {}}>
                <div className="flex flex-col lg:flex-row gap-4">
                  <div className="flex-1">
                    <AgroInput
                      name="search"
                      placeholder="Search inventory items..."
                      icon={<Search />}
                    />
                  </div>

                  <div className="flex gap-3">
                    <AgroSelect name="category" options={categoryOptions} />
                    <AgroSelect name="status" options={statusOptions} />

                    <div className="flex border border-gray-300 rounded-lg overflow-hidden">
                      <button
                        onClick={() => setViewMode("table")}
                        className={`p-2 ${
                          viewMode === "table"
                            ? "bg-green-600 text-white"
                            : "bg-white text-gray-600"
                        }`}
                      >
                        <div className="w-4 h-4 flex flex-col gap-1">
                          <div className="bg-current h-0.5 rounded"></div>
                          <div className="bg-current h-0.5 rounded"></div>
                          <div className="bg-current h-0.5 rounded"></div>
                        </div>
                      </button>
                      <button
                        onClick={() => setViewMode("grid")}
                        className={`p-2 ${
                          viewMode === "grid"
                            ? "bg-green-600 text-white"
                            : "bg-white text-gray-600"
                        }`}
                      >
                        <div className="w-4 h-4 grid grid-cols-2 gap-0.5">
                          <div className="bg-current rounded-sm"></div>
                          <div className="bg-current rounded-sm"></div>
                          <div className="bg-current rounded-sm"></div>
                          <div className="bg-current rounded-sm"></div>
                        </div>
                      </button>
                    </div>
                  </div>
                </div>
              </AgroForm>
            </CardContent>
          </Card>

          {/* Inventory Table/Grid */}
          {viewMode === "table" ? (
            <Card>
              <CardContent className="p-0">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50 border-b">
                      <tr>
                        <th className="text-left p-4 font-medium text-gray-900">
                          Item
                        </th>
                        <th className="text-left p-4 font-medium text-gray-900">
                          Category
                        </th>
                        <th className="text-left p-4 font-medium text-gray-900">
                          Stock
                        </th>
                        <th className="text-left p-4 font-medium text-gray-900">
                          Status
                        </th>
                        <th className="text-left p-4 font-medium text-gray-900">
                          Price/Unit
                        </th>
                        <th className="text-left p-4 font-medium text-gray-900">
                          Location
                        </th>
                        <th className="text-left p-4 font-medium text-gray-900">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredInventory.map((item, index) => (
                        <motion.tr
                          key={item.id}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.05 }}
                          className="border-b hover:bg-gray-50 transition-colors"
                        >
                          <td className="p-4">
                            <div className="flex items-center space-x-3">
                              <img
                                src={item.image || ""}
                                alt={item.name}
                                className="w-10 h-10 rounded-lg object-cover"
                              />
                              <div>
                                <p className="font-medium text-gray-900">
                                  {item.name}
                                </p>
                                <p className="text-sm text-gray-500">
                                  Updated {item.lastUpdated}
                                </p>
                              </div>
                            </div>
                          </td>
                          <td className="p-4">
                            <Badge variant="default" className="capitalize">
                              {item.category}
                            </Badge>
                          </td>
                          <td className="p-4">
                            <div>
                              <p className="font-medium">
                                {item.currentStock} {item.unit}
                              </p>
                              <p className="text-sm text-gray-500">
                                Min: {item.minThreshold} {item.unit}
                              </p>
                            </div>
                          </td>
                          <td className="p-4">
                            <div className="flex items-center space-x-2">
                              {getStatusIcon(item.status)}
                              <Badge
                                variant={getStatusColor(item.status) as any}
                                className="capitalize"
                              >
                                {item.status.replace("_", " ")}
                              </Badge>
                            </div>
                          </td>
                          <td className="p-4">
                            <p className="font-medium">৳{item.pricePerUnit}</p>
                          </td>
                          <td className="p-4">
                            <p className="text-sm text-gray-600">
                              {item.location}
                            </p>
                          </td>
                          <td className="p-4">
                            <div className="flex items-center space-x-2">
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => handleEditItem(item)}
                              >
                                <Edit className="w-3 h-3" />
                              </Button>
                              <Button variant="outline" size="sm">
                                <Eye className="w-3 h-3" />
                              </Button>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => handleDeleteItem(item.id)}
                              >
                                <Trash2 className="w-3 h-3" />
                              </Button>
                            </div>
                          </td>
                        </motion.tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredInventory.map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card hover>
                    <CardContent className="p-4">
                      <div className="flex items-center space-x-3 mb-4">
                        <img
                          src={item.image || ""}
                          alt={item.name}
                          className="w-12 h-12 rounded-lg object-cover"
                        />
                        <div className="flex-1">
                          <h3 className="font-medium text-gray-900">
                            {item.name}
                          </h3>
                          <Badge
                            variant="default"
                            className="capitalize text-xs"
                          >
                            {item.category}
                          </Badge>
                        </div>
                      </div>

                      <div className="space-y-2 mb-4">
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">Stock:</span>
                          <span className="font-medium">
                            {item.currentStock} {item.unit}
                          </span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">Price:</span>
                          <span className="font-medium">
                            ৳{item.pricePerUnit}
                          </span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">Location:</span>
                          <span className="font-medium">{item.location}</span>
                        </div>
                      </div>

                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center space-x-2">
                          {getStatusIcon(item.status)}
                          <Badge
                            variant={getStatusColor(item.status) as any}
                            className="capitalize text-xs"
                          >
                            {item.status.replace("_", " ")}
                          </Badge>
                        </div>
                      </div>

                      <div className="flex items-center space-x-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleEditItem(item)}
                          className="flex-1"
                        >
                          <Edit className="w-3 h-3 mr-1" />
                          Edit
                        </Button>
                        <Button variant="outline" size="sm">
                          <Eye className="w-3 h-3" />
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleDeleteItem(item.id)}
                        >
                          <Trash2 className="w-3 h-3" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          )}

          {/* No Results */}
          {filteredInventory.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-16"
            >
              <Package className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                No inventory items found
              </h3>
              <p className="text-gray-600 mb-6">
                Try adjusting your search criteria or add new items
              </p>
              <Button onClick={handleAddItem}>
                <Plus className="w-4 h-4 mr-2" />
                Add First Item
              </Button>
            </motion.div>
          )}
        </main>
      </div>

      {/* Add Item Modal */}
      <Modal
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        title="Add New Inventory Item"
        size="lg"
      >
        <AgroForm onSubmit={onSubmitAddItem}>
          <div className="p-6 space-y-6">
            {/* Basic Info */}
            <div className="grid grid-cols-2 gap-4">
              <AgroInput
                name="name"
                label="Product Name"
                placeholder="Enter product name"
              />
              <AgroInput name="slug" label="Slug" placeholder="Enter slug" />
              <div>
                <Label label="Category" />
                <AgroSelect
                  name="categoryId"
                  options={categoryOptions}
                  placeholder="Select category"
                />
              </div>
              <AgroInput
                name="unit"
                label="Unit"
                placeholder="kg, pieces, etc."
                required={false}
              />
            </div>

            {/* Inventory */}
            <div className="grid grid-cols-3 gap-4">
              <AgroInput
                name="price"
                label="Price"
                type="number"
                placeholder="0"
              />
              <AgroInput
                name="stock"
                label="Current Stock"
                type="number"
                placeholder="0"
              />
              <AgroInput
                name="minStock"
                label="Minimum Threshold"
                type="number"
                placeholder="0"
              />
            </div>

            {/* Tags and Media */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label label="Tags" />
                <AgroTagInput
                  name="tags"
                  placeholder="Hit enter or comma to add tags"
                />
              </div>
              <div>
                <Label label="Certifications" />
                <AgroTagInput
                  name="certifications"
                  placeholder="Hit enter or comma to add certifications"
                />
              </div>
            </div>

            {/* Certifications */}
            <div className="">
              <div>
                <Label label="Images" />
                <AgroImageUploader name="images" />
              </div>
            </div>
            {/* Descriptions */}
            <div className="grid grid-cols-1 gap-4">
              <div>
                <Label label="Short Description" required={false} />
                <AgroTextarea name="shortDescription" />
              </div>
              <div>
                <Label label="Full Description" required={false} />
                <AgroTextarea name="description" />
              </div>
            </div>

            {/* SEO (Optional) */}
            <div className="grid grid-cols-2 gap-4">
              <AgroInput
                name="metaTitle"
                label="Meta Title"
                placeholder="SEO title"
                required={false}
              />
              <div>
                <Label label="Meta Description" required={false} />
                <AgroTextarea name="metaDescription" />
              </div>
            </div>

            {/* Status & Feature */}
            <div className="flex flex-col space-y-2">
              <AgroSelect
                name="status"
                options={[
                  { label: "ACTIVE", value: "ACTIVE" },
                  { label: "INACTIVE", value: "INACTIVE" },
                ]}
                placeholder="Select status"
              />

              <AgroCheckbox name="isFeatured" required={false}>
                Featured Product
              </AgroCheckbox>
              <AgroCheckbox name="isOrganic" required={false}>
                Organic Product
              </AgroCheckbox>
            </div>

            {/* Actions */}
            <div className="flex justify-end space-x-3 pt-4">
              <Button variant="outline" onClick={() => setShowAddModal(false)}>
                Cancel
              </Button>
              <Button type="submit">Add Product</Button>
            </div>
          </div>
        </AgroForm>
      </Modal>

      {/* Edit Item Modal */}
      <Modal
        isOpen={showEditModal}
        onClose={() => setShowEditModal(false)}
        title="Edit Inventory Item"
        size="lg"
      >
        <AgroForm onSubmit={() => {}}>
          <div className="p-6">
            {selectedItem && (
              <>
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <AgroInput name="itemName" label="Item Name" />
                  <div>
                    <Label label="Category" />
                    <AgroSelect name="category" options={categoryOptions} />
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-4 mb-4">
                  <AgroInput
                    name="currentStock"
                    label="Current Stock"
                    type="number"
                  />
                  <AgroInput label="Unit" name="unit" />
                  <AgroInput
                    name="pricePerUnit"
                    label="Price per Unit"
                    type="number"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <AgroInput
                    name="minThreshold"
                    label="Minimum Threshold"
                    type="number"
                  />
                  <AgroInput
                    name="maxCapacity"
                    label="Maximum Capacity"
                    type="number"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <AgroInput label="Supplier" name="supplier" />
                  <AgroInput label="location" name="location" />
                  <AgroInput
                    label="Expiry Date"
                    name="expiryDate"
                    type="date"
                  />
                </div>
                <div className="flex justify-end space-x-3">
                  <Button
                    variant="outline"
                    onClick={() => setShowEditModal(false)}
                  >
                    Cancel
                  </Button>
                  <Button onClick={() => setShowEditModal(false)}>
                    Save Changes
                  </Button>
                </div>
              </>
            )}
          </div>
        </AgroForm>
      </Modal>
    </div>
  );
};
export default FarmerInventory;
