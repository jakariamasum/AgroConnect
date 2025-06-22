"use client";
import AgroForm from "@/components/form/agro-form";
import AgroTagInput from "@/components/form/agro-tag-input";
import { Button } from "@/components/ui/button";
import React from "react";

const Dashboard = () => {
  const onSubmit = (data: any) => {
    console.log("Form submitted with data:", data);
  };
  return (
    <div>
      <AgroForm onSubmit={onSubmit}>
        <AgroTagInput name="tags" placeholder="Add a tag" />
        <Button type="submit" className="mt-4">
          Submit
        </Button>
      </AgroForm>
    </div>
  );
};

export default Dashboard;
