// src/memberportal/forum/NewPost.js
import React from "react";

const NewPost = () => {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Submit a New Case Study</h1>
      <form className="bg-white p-6 rounded-lg shadow">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium">Patient Age</label>
            <input type="text" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm" />
          </div>
          <div>
            <label className="block text-sm font-medium">Symptoms</label>
            <textarea className="mt-1 block w-full rounded-md border-gray-300 shadow-sm" />
          </div>
          <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded-md">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default NewPost;