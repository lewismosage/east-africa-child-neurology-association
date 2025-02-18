import React from 'react';
import { Calendar } from 'lucide-react';

const events = [
  {
    id: 1,
    title: 'Annual EACNA Conference 2024',
    date: 'March 15-17, 2024',
    location: 'Nairobi, Kenya',
    description: 'Join us for the largest gathering of child neurologists in East Africa.',
    type: 'Conference',
  },
  {
    id: 2,
    title: 'Pediatric Epilepsy Workshop',
    date: 'April 5, 2024',
    location: 'Dar es Salaam, Tanzania',
    description: 'Intensive workshop on managing pediatric epilepsy cases.',
    type: 'Workshop',
  },
  {
    id: 3,
    title: 'Research Symposium',
    date: 'May 20, 2024',
    location: 'Kampala, Uganda',
    description: 'Presenting latest research in child neurology.',
    type: 'Symposium',
  },
];

const EventsPage = () => {
  return (
    <div className="bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-primary">Upcoming Events</h2>
          <p className="mt-4 text-xl text-gray-500">
            Join us at our upcoming conferences, workshops, and training sessions
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {events.map((event) => (
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

export default EventsPage;