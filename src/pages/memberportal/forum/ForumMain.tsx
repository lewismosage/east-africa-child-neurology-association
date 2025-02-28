// src/memberportal/forum/ForumMain.js
import React from "react";
import { Link } from "react-router-dom";

const ForumMain = () => {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Case Study & Medical Discussion Forum</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Link to="/memberportal/forum/categories/stroke" className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition-shadow">
          <h2 className="text-lg font-medium">Stroke</h2>
        </Link>
        <Link to="/memberportal/forum/categories/epilepsy" className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition-shadow">
          <h2 className="text-lg font-medium">Epilepsy</h2>
        </Link>
        <Link to="/memberportal/forum/categories/autism" className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition-shadow">
          <h2 className="text-lg font-medium">Autism</h2>
        </Link>
        <Link to="/memberportal/forum/categories/migraines" className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition-shadow">
          <h2 className="text-lg font-medium">Migraines</h2>
        </Link>
      </div>
    </div>
  );
};

export default ForumMain;