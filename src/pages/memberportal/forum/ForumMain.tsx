import React from "react";
import { Link } from "react-router-dom";

const ForumMain = () => {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-center mb-6 text-primary">
        Case Study & Medical Discussion Forum
      </h1>

      {/* Forum Categories Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Link
          to="/memberportal/forum/categories/stroke"
          className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition-shadow"
        >
          <h2 className="text-lg font-medium">Stroke</h2>
          <p className="text-sm text-gray-600">
            Discuss stroke prevention, treatments, and rehabilitation strategies.
          </p>
        </Link>
        <Link
          to="/memberportal/forum/categories/epilepsy"
          className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition-shadow"
        >
          <h2 className="text-lg font-medium">Epilepsy</h2>
          <p className="text-sm text-gray-600">
            Share seizure management techniques, medication insights, and case studies.
          </p>
        </Link>
        <Link
          to="/memberportal/forum/categories/autism"
          className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition-shadow"
        >
          <h2 className="text-lg font-medium">Autism</h2>
          <p className="text-sm text-gray-600">
            Explore discussions on ASD diagnosis, therapies, and behavioral strategies.
          </p>
        </Link>
        <Link
          to="/memberportal/forum/categories/migraines"
          className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition-shadow"
        >
          <h2 className="text-lg font-medium">Migraines</h2>
          <p className="text-sm text-gray-600">
            Discuss migraine triggers, treatments, and patient case studies.
          </p>
        </Link>
        <Link
          to="/memberportal/forum/categories/neurodevelopmental"
          className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition-shadow"
        >
          <h2 className="text-lg font-medium">Neurodevelopmental Disorders</h2>
          <p className="text-sm text-gray-600">
            Talk about ADHD, learning disabilities, and intellectual disabilities.
          </p>
        </Link>
        <Link
          to="/memberportal/forum/categories/neuromuscular"
          className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition-shadow"
        >
          <h2 className="text-lg font-medium">Neuromuscular Disorders</h2>
          <p className="text-sm text-gray-600">
            Covers muscular dystrophy, myasthenia gravis, and related conditions.
          </p>
        </Link>
        <Link
          to="/memberportal/forum/categories/neurogenetics"
          className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition-shadow"
        >
          <h2 className="text-lg font-medium">Neurogenetics & Rare Disorders</h2>
          <p className="text-sm text-gray-600">
            Focus on genetic conditions like Huntington’s and Wilson’s disease.
          </p>
        </Link>
        <Link
          to="/memberportal/forum/categories/pediatric"
          className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition-shadow"
        >
          <h2 className="text-lg font-medium">Pediatric Neurology</h2>
          <p className="text-sm text-gray-600">
            Discuss child-related neurological conditions and treatment approaches.
          </p>
        </Link>
        <Link
          to="/memberportal/forum/categories/autoimmune"
          className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition-shadow"
        >
          <h2 className="text-lg font-medium">Neuroinfections & Autoimmune Conditions</h2>
          <p className="text-sm text-gray-600">
            Covers meningitis, multiple sclerosis, and encephalitis.
          </p>
        </Link>
        <Link
          to="/memberportal/forum/categories/neurosurgery"
          className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition-shadow"
        >
          <h2 className="text-lg font-medium">Neurosurgery & Brain Injury</h2>
          <p className="text-sm text-gray-600">
            Talk about head trauma, surgical techniques, and recovery processes.
          </p>
        </Link>
        <Link
          to="/memberportal/forum/categories/sleepdisorders"
          className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition-shadow"
        >
          <h2 className="text-lg font-medium">Sleep Disorders & Neurology</h2>
          <p className="text-sm text-gray-600">
            Focuses on insomnia, narcolepsy, and sleep apnea.
          </p>
        </Link>
        <Link
          to="/memberportal/forum/categories/motor"
          className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition-shadow"
        >
          <h2 className="text-lg font-medium">Cerebral Palsy & Motor Disorders</h2>
          <p className="text-sm text-gray-600">
            Includes cerebral palsy, dystonia, and movement disorders.
          </p>
        </Link>
        <Link
          to="/memberportal/forum/categories/chronicpain"
          className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition-shadow"
        >
          <h2 className="text-lg font-medium">Headaches & Chronic Pain</h2>
          <p className="text-sm text-gray-600">
            Discuss cluster headaches, chronic pain, and pain management.
          </p>
        </Link>
        <Link
          to="/memberportal/forum/categories/pharmacology"
          className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition-shadow"
        >
          <h2 className="text-lg font-medium">Neuropharmacology & Treatments</h2>
          <p className="text-sm text-gray-600">
            Discussions on medications, side effects, and alternative therapies.
          </p>
        </Link>
      </div>
    </div>
  );
};

export default ForumMain;