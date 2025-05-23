import React, { useState } from "react";
import { Facebook, Twitter, Linkedin, Mail } from "lucide-react";
import { supabase } from "../../supabaseClient"; // Adjust the import path

export function Footer() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [notification, setNotification] = useState<{
    type: "success" | "error";
    message: string;
  } | null>(null);

  const navigation = {
    main: [
      { name: "About", href: "about-us/our-organization" },
      { name: "Research & Publications", href: "publication/research-&-publications" },
      { name: "Events", href: "/events/upcoming-events" },
      { name: "Contact", href: "/contact" },
      { name: "Member Portal", href: "memberportal/portaldashboard" },
    ],
    social: [
      { name: "Facebook", href: "#", icon: Facebook },
      { name: "Twitter", href: "#", icon: Twitter },
      { name: "LinkedIn", href: "#", icon: Linkedin },
      { name: "Email", href: "#", icon: Mail },
    ],
  };

  // Handle newsletter subscription
  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Insert the email into the Supabase subscribers table
      const { error } = await supabase
        .from("subscribers")
        .insert([{ email }]);

      if (error) {
        throw error;
      }

      // Clear the input and show success message
      setEmail("");
      setNotification({ type: "success", message: "Thank you for subscribing!" });
    } catch (error) {
      console.error("Error subscribing:", error);
      setNotification({ type: "error", message: "Failed to subscribe. Please try again." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <footer className="bg-gray-900">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white mb-4">About EACNA</h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              The East African Child Neurology Association is dedicated to improving neurological care for children across East Africa through education, research, and advocacy.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {navigation.main.map((item) => (
                <li key={item.name}>
                  <a href={item.href} className="text-gray-400 hover:text-white transition-colors">
                    {item.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Contact</h3>
            <address className="text-gray-400 not-italic space-y-2">
              <p>5 th Ngong Avenue, 5 th Avenue Suites, 6 th Floor, Suite 8, Nairobi</p>
              <p>Nairobi, Kenya</p>
              <p>Phone: +254 123 456 789</p>
              <p>Email: <a href="mailto:info@eacna.org">info@eacna.org</a></p>
            </address>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Newsletter</h3>
            <p className="text-gray-400 mb-4">Stay updated with our latest news and events.</p>
            <form onSubmit={handleSubscribe} className="space-y-4">
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2 rounded-lg bg-gray-800 border border-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
              <button
                type="submit"
                disabled={loading}
                className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                {loading ? "Subscribing..." : "Subscribe"}
              </button>
            </form>
            {notification && (
              <div
                className={`mt-4 p-2 rounded-lg text-sm ${
                  notification.type === "success"
                    ? "bg-green-100 text-green-700"
                    : "bg-red-100 text-red-700"
                }`}
              >
                {notification.message}
              </div>
            )}
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-gray-400 text-sm">
              © {new Date().getFullYear()} EACNA. All rights reserved.
            </p>
            <div className="flex space-x-6">
              {navigation.social.map((item) => {
                const Icon = item.icon;
                return (
                  <a
                    key={item.name}
                    href={item.href}
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    <span className="sr-only">{item.name}</span>
                    <Icon className="h-6 w-6" />
                  </a>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;