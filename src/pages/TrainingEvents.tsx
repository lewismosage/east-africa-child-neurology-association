import React, { useState, useEffect } from "react";
import { Calendar, ExternalLink } from "lucide-react";
import { supabase } from "../../supabaseClient"; 

interface Event {
  id: string;
  title: string;
  date: string;
  location: string;
  description: string;
  type: string; // e.g., "Training", "Workshop", "CME"
  registration_url?: string; // Optional field for registration URL
}

const TrainingEventsPage = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [expandedEvent, setExpandedEvent] = useState<{ [key: string]: boolean }>({});

  // Fetch training events from Supabase
  useEffect(() => {
    const fetchEvents = async () => {
      const { data, error } = await supabase
        .from("events")
        .select("*")
        .eq("type", "training") // Only fetch training events
        .order("date", { ascending: true });

      if (error) {
        console.error("Error fetching events:", error);
      } else {
        setEvents(data || []);
      }
    };

    fetchEvents();

    // Set up real-time subscription for changes to the events table
    const eventsSubscription = supabase
      .channel("public:events")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "events" },
        (payload) => {
          console.log("Real-time update:", payload);
          if (payload.eventType === "INSERT") {
            // Add new event to the list if it's a training event
            const newEvent = payload.new as Event;
            if (newEvent.type === "training") {
              setEvents((prevEvents) => [newEvent, ...prevEvents]);
            }
          } else if (payload.eventType === "UPDATE") {
            // Update existing event in the list if it's a training event
            const updatedEvent = payload.new as Event;
            if (updatedEvent.type === "training") {
              setEvents((prevEvents) =>
                prevEvents.map((event) =>
                  event.id === updatedEvent.id ? updatedEvent : event
                )
              );
            } else {
              // Remove the event if it's no longer a training event
              setEvents((prevEvents) =>
                prevEvents.filter((event) => event.id !== updatedEvent.id)
              );
            }
          } else if (payload.eventType === "DELETE") {
            // Remove deleted event from the list
            setEvents((prevEvents) =>
              prevEvents.filter((event) => event.id !== payload.old.id)
            );
          }
        }
      )
      .subscribe();

    // Cleanup subscription on component unmount
    return () => {
      supabase.removeChannel(eventsSubscription);
    };
  }, []);

  // Toggle full content for events
  const toggleEvent = (id: string) => {
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
                  <p>{new Date(event.date).toLocaleDateString()}</p>
                  <p>{event.location}</p>
                </div>
                <p
                  className={`text-gray-600 mb-4 ${
                    expandedEvent[event.id] ? "" : "line-clamp-3"
                  }`}
                >
                  {event.description}
                </p>
                <div className="flex items-center space-x-4">
                  <button
                    onClick={() => toggleEvent(event.id)}
                    className="bg-primary hover:bg-primary-dark text-white px-4 py-2 rounded-md transition-colors"
                  >
                    {expandedEvent[event.id] ? "Show Less" : "Learn More"}
                  </button>
                  {event.registration_url && (
                    <a
                      href={event.registration_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
                    >
                      <ExternalLink className="h-4 w-4 mr-2" />
                      Register
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TrainingEventsPage;