import React from "react";
import { Calendar, Users, BookOpen } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Hero = () => {
  const navigate = useNavigate();

  return (
    <div className="relative bg-primary">
      {/* Hero section */}
      <div className="relative pt-16 pb-32 flex content-center items-center justify-center min-h-[75vh]">
        <div
          className="absolute top-0 w-full h-full bg-center bg-cover"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1576091160550-2173dba999ef?ixlib=rb-1.2.1&auto=format&fit=crop&w=2850&q=80')",
          }}
        >
          <span className="w-full h-full absolute opacity-50 bg-primary"></span>
        </div>
        <div className="container relative mx-auto">
          <div className="items-center flex flex-wrap">
            <div className="w-full lg:w-6/12 px-4 ml-auto mr-auto text-center">
              <div className="text-white">
                <h1 className="text-5xl font-semibold">
                  East African Child Neurology Association
                </h1>
                <p className="mt-4 text-lg">
                  Advancing child neurology care through education, research,
                  and collaboration across East Africa
                </p>
                <button
                  onClick={() => navigate("/membership/become-a-member")}
                  className="bg-secondary hover:bg-secondary-dark text-white font-bold py-2 px-4 rounded-full mt-8"
                >
                  Join EACNA Today
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Feature boxes */}
      <div className="container mx-auto px-4 -mt-24">
        <div className="flex flex-wrap">
          <div
            className="lg:pt-12 pt-6 w-full md:w-4/12 px-4 text-center cursor-pointer"
            onClick={() => navigate("/events/upcoming-events")}
          >
            <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-8 shadow-lg rounded-lg">
              <div className="px-4 py-5 flex-auto">
                <div className="text-white p-3 text-center inline-flex items-center justify-center w-12 h-12 mb-5 shadow-lg rounded-full bg-primary">
                  <Calendar className="w-6 h-6" />
                </div>
                <h6 className="text-xl font-semibold">Upcoming Events</h6>
                <p className="mt-2 mb-4 text-gray-600">
                  Stay updated with our latest conferences, workshops, and
                  training sessions.
                </p>
              </div>
            </div>
          </div>

          <div
            className="w-full md:w-4/12 px-4 text-center cursor-pointer"
            onClick={() => navigate("/find-specialist")}
          >
            <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-8 shadow-lg rounded-lg">
              <div className="px-4 py-5 flex-auto">
                <div className="text-white p-3 text-center inline-flex items-center justify-center w-12 h-12 mb-5 shadow-lg rounded-full bg-primary">
                  <Users className="w-6 h-6" />
                </div>
                <h6 className="text-xl font-semibold">Find a Specialist</h6>
                <p className="mt-2 mb-4 text-gray-600">
                  Connect with leading neurologists and healthcare professionals
                  across East Africa.
                </p>
              </div>
            </div>
          </div>

          <div
            className="lg:pt-12 pt-6 w-full md:w-4/12 px-4 text-center cursor-pointer"
            onClick={() => navigate("publication/research-&-publications")}
          >
            <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-8 shadow-lg rounded-lg">
              <div className="px-4 py-5 flex-auto">
                <div className="text-white p-3 text-center inline-flex items-center justify-center w-12 h-12 mb-5 shadow-lg rounded-full bg-primary">
                  <BookOpen className="w-6 h-6" />
                </div>
                <h6 className="text-xl font-semibold">Research & Publications</h6>
                <p className="mt-2 mb-4 text-gray-600">
                  Access our extensive library of research papers, guidelines,
                  and educational materials.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
