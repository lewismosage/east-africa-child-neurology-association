import React from 'react';
import { Linkedin } from 'lucide-react';

const teamMembers = [
  {
    name: "Dr. Samson Gwer",
    role: "President",
    image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&q=80",
    bio: "Leading pediatric neurologist with 15 years of experience in East Africa",
    linkedin: "https://www.linkedin.com/in/samson-gwer"
  },
  {
    name: "Elizabeth Ombech",
    role: "Director, Programs and Operations",
    image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80",
    bio: "Results-driven leader with extensive experience in program development, operational strategy, and team management. Committed to driving impact through efficient program execution and organizational excellence.",
    linkedin: "https://www.linkedin.com/in/elizabeth-ombech"
  },
  {
    name: "Vanessa Akoth",
    role: "Communications Associate",
    image: "https://images.unsplash.com/photo-1594824476967-48c8b964273f?auto=format&fit=crop&q=80",
    bio: "Dynamic communications professional with expertise in strategic messaging, content creation, and media relations. Passionate about crafting compelling narratives that enhance brand presence and engagement.",
    linkedin: "https://www.linkedin.com/in/vanessa-akoth"
  },
];

export function Leadership() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900">Our Leadership Team</h2>
          <p className="mt-4 text-lg text-gray-600">
            Meet the experts leading our mission
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {teamMembers.map((member) => (
            <div key={member.name} className="bg-white rounded-xl overflow-hidden shadow-lg relative">
              <div className="h-64 overflow-hidden">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-1">{member.name}</h3>
                <p className="text-blue-600 mb-3">{member.role}</p>
                <p className="text-gray-600 mb-4">{member.bio}</p>
                <a
                  href={member.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:text-blue-800 absolute bottom-4 right-4"
                >
                  <Linkedin className="h-6 w-6 inline-block" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
