import Image from "next/image";

export default function HeroSection() {
  return (
    <>
    <section className="relative h-[60vh] md:h-[70vh] flex items-center justify-center text-center text-white px-4">
          <Image
            src="https://placehold.co/1200x800/FF5722/FFFFFF?text=Campus+Food+Life"
            alt="Students enjoying food on campus"
            fill
            className="object-cover brightness-50"
            priority
            unoptimized={true}
          />
          <div className="relative z-10">
            <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight drop-shadow-lg">
              Fuel Your Cravings at VIT!
            </h1>
            <p className="mt-4 max-w-2xl mx-auto text-lg md:text-xl font-light drop-shadow-md">
              Your one-stop portal for all things food on campus. Browse,
              review, and order with ease.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="#features"
                className="bg-white text-orange-600 font-bold py-3 px-8 rounded-full text-lg hover:bg-gray-200 transition-transform duration-300 transform hover:scale-105 shadow-lg"
              >
                Start Exploring
              </a>
            </div>
          </div>
        </section>
    </>
  );
}
