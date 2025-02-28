// src/memberportal/forum/Categories.js
import React from "react";
import { Link } from "react-router-dom";

const Categories = () => {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Forum Categories</h1>
      <div className="space-y-4">
        <Link to="/memberportal/forum/categories/stroke" className="block text-blue-600 hover:text-blue-800">
          <h2 className="text-lg font-medium">Stroke</h2>
          <p className="text-gray-600">Discuss stroke prevention, treatment, rehabilitation, and recovery strategies.</p>
        </Link>
        <Link to="/memberportal/forum/categories/epilepsy" className="block text-blue-600 hover:text-blue-800">
          <h2 className="text-lg font-medium">Epilepsy</h2>
          <p className="text-gray-600">Share insights on seizure management, new therapies, and patient care.</p>
        </Link>
        <Link to="/memberportal/forum/categories/autism" className="block text-blue-600 hover:text-blue-800">
          <h2 className="text-lg font-medium">Autism</h2>
          <p className="text-gray-600">Discuss early diagnosis, behavioral therapy, and support for autistic individuals.</p>
        </Link>
        <Link to="/memberportal/forum/categories/migraines" className="block text-blue-600 hover:text-blue-800">
          <h2 className="text-lg font-medium">Migraines</h2>
          <p className="text-gray-600">Exchange knowledge on triggers, treatments, and lifestyle adjustments for migraines.</p>
        </Link>
        <Link to="/memberportal/forum/categories/neurogenetics" className="block text-blue-600 hover:text-blue-800">
          <h2 className="text-lg font-medium">Neurogenetics</h2>
          <p className="text-gray-600">Explore discussions on genetic factors influencing neurological disorders.</p>
        </Link>
        <Link to="/memberportal/forum/categories/neonatal-neurology" className="block text-blue-600 hover:text-blue-800">
          <h2 className="text-lg font-medium">Neonatal Neurology</h2>
          <p className="text-gray-600">Talk about neurological conditions in newborns and advancements in neonatal care.</p>
        </Link>
        <Link to="/memberportal/forum/categories/neurorehabilitation" className="block text-blue-600 hover:text-blue-800">
          <h2 className="text-lg font-medium">Neurorehabilitation</h2>
          <p className="text-gray-600">Share best practices in recovery, therapy, and rehabilitation strategies for neurological disorders.</p>
        </Link>
      </div>
    </div>
  );
};

export default Categories;
