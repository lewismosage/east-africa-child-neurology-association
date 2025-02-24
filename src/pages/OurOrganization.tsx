import React from 'react';
import { Link } from 'react-router-dom';
import { Users, Stethoscope, GraduationCap, Activity, BookOpen, Heart, Search, Users as UsersIcon, Award, Globe, CheckCircle2 } from 'lucide-react';

const stats = [
  { icon: Users, value: '2,500+', label: 'Children Helped', color: 'from-blue-500 to-blue-600' },
  { icon: Stethoscope, value: '15+', label: 'Partner Hospitals', color: 'from-cyan-500 to-cyan-600' },
  { icon: GraduationCap, value: '200+', label: 'Trained Professionals', color: 'from-indigo-500 to-indigo-600' },
  { icon: Activity, value: '85%', label: 'Success Rate', color: 'from-purple-500 to-purple-600' },
];

const values = [
  { icon: BookOpen, title: 'Education Excellence', description: 'Providing comprehensive training and educational resources for healthcare professionals across East Africa.' },
  { icon: Heart, title: 'Compassionate Care', description: 'Delivering patient-centered care with empathy and understanding for every child and family.' },
  { icon: Search, title: 'Innovation & Research', description: 'Advancing understanding of neurological conditions through groundbreaking collaborative research.' },
  { icon: UsersIcon, title: 'Community Impact', description: 'Building a supportive network of healthcare professionals, families, and advocates.' },
  { icon: Award, title: 'Clinical Excellence', description: 'Maintaining the highest standards of medical practice and patient care.' },
  { icon: Globe, title: 'Global Collaboration', description: 'Partnering with international institutions to bring world-class expertise to East Africa.' },
];

export function Hero() {
  return (
    <div className="relative h-[60vh] flex items-center justify-center">
    <div
      className="absolute inset-0 z-0"
      style={{
        backgroundImage: 'url("https://images.unsplash.com/photo-1631217868264-e5b90bb7e133?auto=format&fit=crop&q=80")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      {/* Gradient overlay */}
      <div
        className="absolute inset-0"
        style={{
          background: 'linear-gradient(to right, #4A154B, #2E1A47, #1E3A8A)',
          opacity: '0.8', 
        }}
      />
    </div>
    <div className="relative z-10 text-center text-white px-4">
      <h1 className="text-5xl font-bold mb-6">About EACNA</h1>
      <p className="text-xl max-w-2xl mx-auto">
        Transforming child neurology care across East Africa through innovation,
        education, and compassionate healthcare delivery.
      </p>
    </div>
  </div>
  );
}

export function Impact() {
  return (
    <section className="py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-primary sm:text-4xl mb-4">Our Impact</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Making a real difference in child neurology care across East Africa
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="relative group"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-blue-100 to-cyan-100 rounded-2xl transform rotate-6 group-hover:rotate-4 transition-transform duration-300" />
              <div className="relative p-8 bg-white rounded-2xl shadow-lg group-hover:translate-y-1 transition-all duration-300">
                <div className={`inline-flex items-center justify-center w-16 h-16 rounded-xl bg-gradient-to-r ${stat.color} mb-6`}>
                  <stat.icon className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-3xl font-bold text-gray-900 mb-2">{stat.value}</h3>
                <p className="text-gray-600">{stat.label}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Mission() {
  return (
    <section className="py-24 bg-gradient-to-b from-gray-50 to-white relative overflow-hidden">
      <div className="absolute inset-0 bg-grid-blue-500/[0.03] -z-10" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="relative">
            <div className="relative rounded-2xl overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&q=80"
                alt="Medical professionals collaborating"
                className="w-full h-[500px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-blue-900/80 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-8">
                <blockquote className="text-white text-lg font-medium">
                  "Together, we're building a brighter future for children with neurological conditions in East Africa."
                </blockquote>
              </div>
            </div>
          </div>

          <div className="space-y-8">
            <div>
              <h2 className="text-3xl font-bold text-primary sm:text-4xl mb-4">Our Mission & Vision</h2>
              <p className="text-lg text-gray-600 mb-8">
                We strive to revolutionize child neurology care in East Africa through excellence in education, research, and clinical practice.
              </p>
            </div>

            <div className="space-y-6">
              {[
                'Provide world-class neurological care to every child',
                'Train the next generation of pediatric neurologists',
                'Advance research in child neurology',
                'Build sustainable healthcare systems'
              ].map((item) => (
                <div key={item} className="flex items-start gap-4">
                  <CheckCircle2 className="h-6 w-6 text-blue-600 flex-shrink-0 mt-1" />
                  <p className="text-gray-700">{item}</p>
                </div>
              ))}
            </div>

            <Link
              to="/approach"
              className="inline-flex items-center px-6 py-3 text-base font-medium rounded-lg text-white bg-blue-600 hover:bg-blue-700 transition-colors"
            >
              Learn About Our Approach
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

export function CoreValues() {
  return (
    <section className="py-24 bg-blue-50">
      <div className="max-w-7xl mx-auto px-6 text-center">
        <h2 className="text-3xl font-bold text-primary mb-4">Our Core Values</h2>
        <p className="text-lg text-gray-600 mb-12">Guiding principles in child neurology care and education</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {values.map((value) => {
            const Icon = value.icon;
            return (
              <div key={value.title} className="p-8 bg-white rounded-2xl shadow-lg">
                <div className="w-14 h-14 flex items-center justify-center rounded-xl bg-blue-100 text-blue-600 mb-4">
                  <Icon className="h-7 w-7" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{value.title}</h3>
                <p className="text-gray-600">{value.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export function OurOrganization() {
  return (
    <div>
      <Hero />
      <Impact />
      <Mission />
      <CoreValues />
    </div>
  );
}