// src/memberportal/forum/Post.js
import React from "react";
import { useParams } from "react-router-dom";

const Post = () => {
  const { id } = useParams();
  // Fetch case details using the `id` from the backend
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Case Discussion</h1>
      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-lg font-medium">Case Details</h2>
        <p>Patient Age: 45</p>
        <p>Symptoms: Headache, dizziness</p>
        <p>Diagnosis: Migraine</p>
        <div className="mt-4">
          <h3 className="font-medium">Comments</h3>
          <div className="mt-2">
            <p>Dr. Smith: Consider MRI for further evaluation.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Post;