import React, { useState, useEffect } from "react";
import { Menu, Search, ChevronDown, X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../../supabaseClient";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<{ item: string; path: string }[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const checkSession = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      setIsAuthenticated(!!session);
    };

    checkSession();
  }, []);

  const handleMemberPortalClick = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    if (!isAuthenticated) {
      e.preventDefault();
      navigate("/membership/login");
    } else {
      navigate("/membership/memberportal/portaldashboard");
    }
  };

  const navigation = {
    "About Us": ["Our Organization", "Join Our Mission", "Our Leadership Team", "Support Our Cause"],
    Events: ["Upcoming Events", "Training Events", "Call for Abstracts"],
    Membership: [
      "Member Portal",
      "Become a Member",
      "EACNA Membership & Policies",
      "Renewal & Upgrade",
    ],
    Publication: ["Healthcare Policies & Guidelines", "Research & Publications"],
    "Media Center": ["News And Newsletters", "FAQs"],
  };

  const allPages = Object.entries(navigation).flatMap(([category, items]) =>
    items.map((item) => ({
      category,
      item,
      path: `/${category.toLowerCase().replace(/\s+/g, "-")}/${item.toLowerCase().replace(/\s+/g, "-")}`,
    }))
  );

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);
    if (query.length > 0) {
      const results = allPages
        .filter(({ item }) => item.toLowerCase().includes(query.toLowerCase()))
        .map(({ item, path }) => ({ item, path }));
      setSearchResults(results);
    } else {
      setSearchResults([]);
    }
  };

  const handleSearchResultClick = (path: string) => {
    setSearchQuery("");
    setSearchResults([]);
    navigate(path);
  };

  return (
    <nav className="bg-primary text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <img
              src="/src/assets/images/eacnalogo.jpg" 
              alt="EACNA Logo"
              className="h-8 w-8 mr-2 rounded-full"
            />
            <span className="text-xl font-bold">EACNA</span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-4">
            <a href="/" className="hover:bg-primary-dark px-3 py-2 rounded-md">
              Home
            </a>

            {Object.entries(navigation).map(([category, items]) => (
              <div key={category} className="relative group">
                <button
                  className="flex items-center hover:bg-primary-dark px-3 py-2 rounded-md"
                  onClick={() =>
                    setActiveDropdown(
                      activeDropdown === category ? null : category
                    )
                  }
                >
                  {category}
                  <ChevronDown className="ml-1 h-4 w-4" />
                </button>
                <div className="absolute z-50 left-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                  <div className="py-1">
                    {items.map((item) => (
                      <a
                        key={item}
                        href={`/${category
                          .toLowerCase()
                          .replace(/\s+/g, "-")}/${item
                          .toLowerCase()
                          .replace(/\s+/g, "-")}`}
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        onClick={item === "Member Portal" ? handleMemberPortalClick : undefined}
                      >
                        {item}
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            ))}

            <a
              href="/contact"
              className="hover:bg-primary-dark px-3 py-2 rounded-md"
            >
              Contact Us
            </a>

            {/* Search Bar */}
            <div className="relative">
              <input
                type="text"
                placeholder="Search..."
                className="w-48 px-4 py-1 text-sm text-gray-900 bg-white rounded-full focus:outline-none focus:ring-2 focus:ring-primary-light"
                value={searchQuery}
                onChange={handleSearchChange}
              />
              <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
              {searchResults.length > 0 && (
                <div className="absolute mt-1 w-full bg-white rounded-md shadow-lg z-10">
                  <ul>
                    {searchResults.map(({ item, path }) => (
                      <li
                        key={path}
                        className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
                        onClick={() => handleSearchResultClick(path)}
                      >
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md hover:bg-primary-dark focus:outline-none"
            >
              {isOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div className={`md:hidden ${isOpen ? "block" : "hidden"}`}>
        <div className="px-2 pt-2 pb-3 space-y-1">
          <a
            href="/"
            className="block px-3 py-2 rounded-md hover:bg-primary-dark"
          >
            Home
          </a>

          {Object.entries(navigation).map(([category, items]) => (
            <div key={category}>
              <button
                className="w-full text-left px-3 py-2 rounded-md hover:bg-primary-dark flex items-center justify-between"
                onClick={() =>
                  setActiveDropdown(
                    activeDropdown === category ? null : category
                  )
                }
              >
                {category}
                <ChevronDown
                  className={`h-4 w-4 transform ${
                    activeDropdown === category ? "rotate-180" : ""
                  }`}
                />
              </button>

              {activeDropdown === category && (
                <div className="pl-4 space-y-1">
                  {items.map((item) => (
                    <a
                      key={item}
                      href={`/${category
                        .toLowerCase()
                        .replace(/\s+/g, "-")}/${item
                        .toLowerCase()
                        .replace(/\s+/g, "-")}`}
                      className="block px-3 py-2 rounded-md text-sm hover:bg-primary-dark"
                      onClick={item === "Member Portal" ? handleMemberPortalClick : undefined}
                    >
                      {item}
                    </a>
                  ))}
                </div>
              )}
            </div>
          ))}

          <a
            href="/contact"
            className="block px-3 py-2 rounded-md hover:bg-primary-dark"
          >
            Contact Us
          </a>

          {/* Mobile Search */}
          <div className="px-3 py-2">
            <div className="relative">
              <input
                type="text"
                placeholder="Search..."
                className="w-full px-4 py-2 text-sm text-gray-900 bg-white rounded-full focus:outline-none focus:ring-2 focus:ring-primary-light"
                value={searchQuery}
                onChange={handleSearchChange}
              />
              <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
              {searchResults.length > 0 && (
                <div className="absolute mt-1 w-full bg-white rounded-md shadow-lg z-10">
                  <ul>
                    {searchResults.map(({ item, path }) => (
                      <li
                        key={path}
                        className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
                        onClick={() => handleSearchResultClick(path)}
                      >
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
