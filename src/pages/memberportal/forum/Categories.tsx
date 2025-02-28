// src/memberportal/forum/Categories.js
import React from "react";
import { Link } from "react-router-dom";

const Categories = () => {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Forum Categories</h1>
      <div className="space-y-4">
        <Link to="/memberportal/forum/categories/stroke" className="block text-blue-600 hover:text-blue-800">Stroke</Link>
        <Link to="/memberportal/forum/categories/epilepsy" className="block text-blue-600 hover:text-blue-800">Epilepsy</Link>
        <Link to="/memberportal/forum/categories/autism" className="block text-blue-600 hover:text-blue-800">Autism</Link>
        <Link to="/memberportal/forum/categories/migraines" className="block text-blue-600 hover:text-blue-800">Migraines</Link>
      </div>
    </div>
  );
};

export default Categories;