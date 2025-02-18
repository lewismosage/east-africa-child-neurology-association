import React from 'react';
import { Calendar } from 'lucide-react';

const trainingEvents = [
  {
    id: 1,
    title: 'Pediatric Neurology Training Program',
    date: 'June 10-14, 2024',
    location: 'Nairobi, Kenya',
    description: 'A comprehensive training program for pediatric neurologists focusing on the latest techniques and research.',
    type: 'Training',
  },
  {
    id: 2,
    title: 'Advanced Workshop on Pediatric Epilepsy',
    date: 'July 20, 2024',
    location: 'Kampala, Uganda',
    description: 'An advanced workshop aimed at enhancing skills in managing pediatric epilepsy cases.',
    type: 'Workshop',
  },
  {
    id: 3,
    title: 'Continuing Medical Education (CME) on Child Neurology',
    date: 'August 15, 2024',
    location: 'Dar es Salaam, Tanzania',
    description: 'CME session covering recent advancements in child neurology and best practices.',
    type: 'CME',
  },
];

const TrainingEventsPage = () => {
  return (
    <div className="bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-primary">Upcoming Training Events</h2>
          <p className="mt-4 text-xl text-gray-500">
            Join us for our upcoming training events, workshops, and CME sessions
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {trainingEvents.map((event) => (
            <div
              key={event.id}
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
            >
              <div className="p-6">
                <div className="flex items-center mb-4">
                  <Calendar className="h-6 w-6 text-primary mr-2" />
                  <span className="text-sm font-semibold text-primary">{event.type}</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{event.title}</h3>
                <div className="text-sm text-gray-500 mb-4">
                  <p>{event.date}</p>
                  <p>{event.location}</p>
                </div>
                <p className="text-gray-600 mb-4">{event.description}</p>
                <button className="bg-primary hover:bg-primary-dark text-white px-4 py-2 rounded-md transition-colors">
                  Learn More
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TrainingEventsPage;