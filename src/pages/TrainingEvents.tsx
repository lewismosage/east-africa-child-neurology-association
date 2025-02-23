import React, { useState } from "react";
import { Calendar } from "lucide-react";

const trainingEvents = [
  {
    id: 1,
    title: "Pediatric Neurology Training Program",
    date: "June 10-14, 2024",
    location: "Nairobi, Kenya",
    description:
      "A comprehensive training program for pediatric neurologists focusing on the latest techniques and research.",
    fullContent:
      "This training program is designed for pediatric neurologists who want to stay updated on the latest advancements in the field. The program will cover topics such as neuroimaging, genetic disorders, and innovative treatment approaches. Participants will also have the opportunity to engage in hands-on workshops and case discussions with leading experts.",
    type: "Training",
  },
  {
    id: 2,
    title: "Advanced Workshop on Pediatric Epilepsy",
    date: "July 20, 2024",
    location: "Kampala, Uganda",
    description:
      "An advanced workshop aimed at enhancing skills in managing pediatric epilepsy cases.",
    fullContent:
      "This workshop is tailored for healthcare professionals who specialize in pediatric epilepsy. It will focus on advanced diagnostic techniques, treatment protocols, and case management strategies. Participants will engage in interactive sessions and practical exercises to improve their clinical skills.",
    type: "Workshop",
  },
  {
    id: 3,
    title: "Continuing Medical Education (CME) on Child Neurology",
    date: "August 15, 2024",
    location: "Dar es Salaam, Tanzania",
    description:
      "CME session covering recent advancements in child neurology and best practices.",
    fullContent:
      "This CME session is designed to provide healthcare professionals with the latest updates in child neurology. Topics will include advancements in neurodevelopmental disorders, neonatal neurology, and evidence-based treatment approaches. The session will also feature expert-led discussions and Q&A sessions.",
    type: "CME",
  },
];

const TrainingEventsPage = () => {
  // State to track expanded training events
  const [expandedEvent, setExpandedEvent] = useState<{ [key: number]: boolean }>({});

  // Toggle full content for training events
  const toggleEvent = (id: number) => {
    setExpandedEvent((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

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
                <p className="text-gray-600 mb-4">
                  {expandedEvent[event.id] ? event.fullContent : event.description}
                </p>
                <button
                  onClick={() => toggleEvent(event.id)}
                  className="bg-primary hover:bg-primary-dark text-white px-4 py-2 rounded-md transition-colors"
                >
                  {expandedEvent[event.id] ? "Show Less" : "Learn More"}
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