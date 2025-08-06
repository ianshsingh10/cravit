import {Star} from "lucide-react";

const testimonials = [
  {
    quote:
      "craVIT is a lifesaver! I can check menus and decide what to eat before even leaving my room. The reviews are super helpful too.",
    author: "Priya S.",
    class: "B.Tech CSE, 2nd Year",
  },
  {
    quote:
      "Finally, a single place to see all the food options at VIT. The pre-order feature saves me so much time between classes.",
    author: "Rohan M.",
    class: "M.Tech Mech, 1st Year",
  },
  {
    quote:
      "As a faculty member, finding a quick and good meal is crucial. craVIT makes it incredibly easy. Highly recommended!",
    author: "Dr. Anjali Verma",
    class: "Professor, SCOPE",
  },
];


export default function TestimonialsSection() {
  return (
    <>
    <section className="py-16 sm:py-24 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
                What Our Users Say
              </h2>
              <p className="mt-3 text-lg text-gray-600">
                Real stories from students and staff at VIT.
              </p>
            </div>
            <div className="flex overflow-x-auto space-x-8 pb-4 -mx-4 px-4 sm:mx-0 sm:px-0 sm:grid sm:grid-cols-1 lg:grid-cols-3 sm:gap-8 sm:space-x-0">
              {testimonials.map((testimonial, index) => (
                <div
                  key={index}
                  className="flex-shrink-0 w-[85vw] sm:w-auto bg-gray-50 p-8 rounded-xl shadow-sm"
                >
                  <Star className="text-yellow-400 mb-4" fill="currentColor" />
                  <blockquote className="text-gray-600 italic">
                    "{testimonial.quote}"
                  </blockquote>
                  <div className="mt-4">
                    <p className="font-bold text-gray-900">
                      {testimonial.author}
                    </p>
                    <p className="text-sm text-gray-500">{testimonial.class}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
    </>
  );
}
