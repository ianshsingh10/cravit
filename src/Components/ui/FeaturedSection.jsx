import {
  Search,
  UtensilsCrossed,
  Star,
  BookOpen,
} from "lucide-react";

const features = [
  {
    icon: <Search size={32} className="text-orange-500" />,
    title: "Browse Canteens",
    description: "Explore all food outlets and canteens across the VIT campus.",
  },
  {
    icon: <BookOpen size={32} className="text-orange-500" />,
    title: "View Digital Menus",
    description: "Access up-to-date menus from your favorite spots anytime.",
  },
  {
    icon: <Star size={32} className="text-orange-500" />,
    title: "Read & Write Reviews",
    description: "Share your experience and see what others are saying.",
  },
  {
    icon: <UtensilsCrossed size={32} className="text-orange-500" />,
    title: "Pre-order Meals",
    description: "Skip the queue by ordering your food in advance.",
  },
];

export default function FeaturedSection() {
  return (
    <>
    <section id="features" className="py-16 sm:py-24 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
                How craVIT Helps You
              </h2>
              <p className="mt-3 text-lg text-gray-600 max-w-2xl mx-auto">
                Everything you need for a hassle-free food experience.
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className="bg-gray-50 p-6 rounded-xl shadow-sm hover:shadow-lg transition-shadow duration-300 text-center"
                >
                  <div className="flex justify-center items-center h-16 w-16 bg-orange-100 rounded-full mx-auto mb-4">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-semibold mb-2 text-gray-900">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

    </>
  );
}
