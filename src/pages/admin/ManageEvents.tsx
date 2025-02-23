import React, { useState, useEffect } from 'react';
import { Calendar, MapPin, Trash2, Edit, Plus, ExternalLink } from 'lucide-react';
import { supabase } from '../../../supabaseClient'; // Adjust the path as needed

interface Event {
  id: string;
  title: string;
  date: string;
  location: string;
  description: string;
  type: 'conference' | 'workshop' | 'seminar' | 'training' | 'other';
  registration_url?: string;
}

export function ManageEvents() {
  const [events, setEvents] = useState<Event[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingEvent, setEditingEvent] = useState<Event | null>(null);
  const [formData, setFormData] = useState<Omit<Event, 'id'>>({
    title: '',
    date: '',
    location: '',
    description: '',
    type: 'conference',
    registration_url: '',
  });
  const [activeTab, setActiveTab] = useState<'upcoming' | 'training'>('upcoming');

  // Fetch events from Supabase
  useEffect(() => {
    const fetchEvents = async () => {
      const { data, error } = await supabase
        .from('events')
        .select('*')
        .order('date', { ascending: true });

      if (error) {
        console.error('Error fetching events:', error);
      } else {
        setEvents(data || []);
      }
    };

    fetchEvents();
  }, []);

  // Handle form submission (add/edit event)
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (editingEvent) {
      // Update existing event
      const { error } = await supabase
        .from('events')
        .update(formData)
        .eq('id', editingEvent.id);

      if (error) {
        console.error('Error updating event:', error);
      } else {
        setEvents((prevEvents) =>
          prevEvents.map((event) =>
            event.id === editingEvent.id ? { ...formData, id: event.id } : event
          )
        );
      }
    } else {
      // Add new event
      const { data, error } = await supabase
        .from('events')
        .insert([formData])
        .select();

      if (error) {
        console.error('Error adding event:', error);
      } else if (data) {
        setEvents((prevEvents) => [...prevEvents, data[0]]);
      }
    }

    setIsModalOpen(false);
    setEditingEvent(null);
    setFormData({
      title: '',
      date: '',
      location: '',
      description: '',
      type: 'conference',
      registration_url: '',
    });
  };

  // Handle event deletion
  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this event?')) {
      const { error } = await supabase.from('events').delete().eq('id', id);

      if (error) {
        console.error('Error deleting event:', error);
      } else {
        setEvents((prevEvents) => prevEvents.filter((event) => event.id !== id));
      }
    }
  };

  // Filter events based on the active tab
  const filteredEvents = events.filter((event) => {
    if (activeTab === 'upcoming') {
      // Show upcoming events (not in the past) and exclude training events
      return new Date(event.date) >= new Date() && event.type !== 'training';
    } else {
      // Show training events (regardless of date)
      return event.type === 'training';
    }
  });

  // Open modal and set form data based on the active tab
  const openModal = () => {
    setEditingEvent(null);
    setFormData({
      title: '',
      date: '',
      location: '',
      description: '',
      type: activeTab === 'training' ? 'training' : 'conference', // Set type based on active tab
      registration_url: '',
    });
    setIsModalOpen(true);
  };

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Manage Events</h1>
      </div>

      {/* Tabs for Upcoming Events and Training Events */}
      <div className="flex space-x-4 mb-8">
        <button
          onClick={() => setActiveTab('upcoming')}
          className={`px-4 py-2 rounded-lg ${
            activeTab === 'upcoming'
              ? 'bg-blue-600 text-white'
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
        >
          Upcoming Events
        </button>
        <button
          onClick={() => setActiveTab('training')}
          className={`px-4 py-2 rounded-lg ${
            activeTab === 'training'
              ? 'bg-blue-600 text-white'
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
        >
          Training Events
        </button>
      </div>

      {/* Add Event Button */}
      <div className="mb-8">
        <button
          onClick={openModal}
          className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Plus className="h-5 w-5 mr-2" />
          Add Event
        </button>
      </div>

      {/* Event List */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredEvents.map((event) => (
          <div
            key={event.id}
            className="bg-white rounded-lg shadow-md p-6"
          >
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-xl font-semibold text-gray-900">{event.title}</h3>
              {new Date(event.date) < new Date() && (
                <span className="px-2 py-1 text-xs font-medium bg-gray-100 text-gray-600 rounded">
                  Past Event
                </span>
              )}
            </div>
            <div className="space-y-3 mb-4">
              <div className="flex items-center text-gray-600">
                <Calendar className="h-5 w-5 mr-2" />
                <span>{new Date(event.date).toLocaleDateString()}</span>
              </div>
              <div className="flex items-center text-gray-600">
                <MapPin className="h-5 w-5 mr-2" />
                <span>{event.location}</span>
              </div>
            </div>
            <p className="text-gray-600 mb-4">{event.description}</p>
            <div className="flex items-center justify-between">
              {event.registration_url && (
                <a
                  href={event.registration_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:text-blue-700 flex items-center"
                >
                  <ExternalLink className="h-4 w-4 mr-1" />
                  Registration Link
                </a>
              )}
              <div className="flex space-x-2">
                <button
                  onClick={() => {
                    setEditingEvent(event);
                    setFormData(event);
                    setIsModalOpen(true);
                  }}
                  className="p-2 text-gray-600 hover:text-blue-600 transition-colors"
                >
                  <Edit className="h-5 w-5" />
                </button>
                <button
                  onClick={() => handleDelete(event.id)}
                  className="p-2 text-gray-600 hover:text-red-600 transition-colors"
                >
                  <Trash2 className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal for Add/Edit Event */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white rounded-lg p-8 max-w-md w-full">
            <h2 className="text-xl font-bold mb-6">
              {editingEvent ? 'Edit Event' : 'Add New Event'}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Title
                </label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Date
                </label>
                <input
                  type="date"
                  value={formData.date}
                  onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                  className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Location
                </label>
                <input
                  type="text"
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Description
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  rows={3}
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Type
                </label>
                {activeTab === 'training' ? (
                  // Display a non-editable input for training events
                  <input
                    type="text"
                    value="Training"
                    readOnly
                    className="w-full rounded-md border-gray-300 shadow-sm bg-gray-100 cursor-not-allowed"
                  />
                ) : (
                  // Display a dropdown for upcoming events
                  <select
                    value={formData.type}
                    onChange={(e) => setFormData({ ...formData, type: e.target.value as 'conference' | 'workshop' | 'seminar' | 'training' | 'other' })}
                    className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  >
                    <option value="conference">Conference</option>
                    <option value="workshop">Workshop</option>
                    <option value="seminar">Seminar</option>
                    <option value="other">Other</option>
                  </select>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Registration URL
                </label>
                <input
                  type="url"
                  value={formData.registration_url}
                  onChange={(e) => setFormData({ ...formData, registration_url: e.target.value })}
                  className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
              <div className="flex justify-end space-x-4 mt-6">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 text-gray-700 hover:text-gray-900"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  {editingEvent ? 'Save Changes' : 'Add Event'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}