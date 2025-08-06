import Image from "next/image";

const outlets = [
  {
    name: "Mayuri (AB1)",
    image: "https://placehold.co/400x300/FFF4E6/333333?text=Mayuri",
  },
  {
    name: "Mayuri (AB2)",
    image: "https://placehold.co/400x300/FFF4E6/333333?text=Mayuri",
  },
  {
    name: "Mayuri (Canteen)",
    image: "https://placehold.co/400x300/FFF4E6/333333?text=Mayuri",
  },
  {
    name: "Bistro by Safal",
    image: "https://placehold.co/400x300/E6F4FF/333333?text=Bistro",
  },
  {
    name: "Safal (Canteen)",
    image: "https://placehold.co/400x300/E6F4FF/333333?text=Safal",
  },
  {
    name: "AB Dakshin",
    image: "https://placehold.co/400x300/FFE6E6/333333?text=Dakshin",
  },
  {
    name: "UB (UnderBelly)",
    image: "https://placehold.co/400x300/F0E6FF/333333?text=UB",
  },
];



export default function OutletSection() {
  return (
    <>
    <section className="py-16 sm:py-24 bg-gray-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
                Our Partner Outlets
              </h2>
              <p className="mt-3 text-lg text-gray-600">
                Your favorite canteens, all in one place.
              </p>
            </div>
            <div className="flex overflow-x-auto space-x-6 pb-4 -mx-4 px-4 sm:mx-0 sm:px-0 sm:grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 sm:gap-8 sm:space-x-0">
              {outlets.map((outlet) => (
                <div
                  key={outlet.name}
                  className="flex-shrink-0 w-64 sm:w-auto bg-white rounded-xl shadow-md overflow-hidden transform hover:-translate-y-2 transition-transform duration-300"
                >
                  <div className="relative h-40 w-full">
                    <Image
                      src={outlet.image}
                      alt={`Image of ${outlet.name}`}
                      fill
                      className="object-cover"
                      unoptimized={true}
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="font-bold text-lg text-gray-900">
                      {outlet.name}
                    </h3>
                  </div>
                </div>
              ))}
            </div>
            <style jsx>{`
              .overflow-x-auto::-webkit-scrollbar {
                height: 8px;
              }
              .overflow-x-auto::-webkit-scrollbar-track {
                background: #f1f1f1;
                border-radius: 10px;
              }
              .overflow-x-auto::-webkit-scrollbar-thumb {
                background: #e0e0e0;
                border-radius: 10px;
              }
              .overflow-x-auto::-webkit-scrollbar-thumb:hover {
                background: #cccccc;
              }
            `}</style>
          </div>
        </section>
    </>
  );
}
