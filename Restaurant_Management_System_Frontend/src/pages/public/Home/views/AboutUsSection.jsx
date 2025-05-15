import { aboutBg1, aboutBg2 } from "../../../../assets";
import { Button } from "../../../../components/ui";

const AboutUsSection = () => {
  return (
    <section id="about-us" className="flex flex-col lg:flex-row bg-gray-100 py-24 px-6 lg:px-20 gap-10 items-center justify-between">
      
      {/* Text Content */}
      <div className="w-full lg:w-1/2 space-y-6 text-center lg:text-left">
        <h2 className="text-4xl md:text-5xl font-bold text-gray-800">
          About <span className="text-orange-500">Food Funday</span>
        </h2>
        <p className="text-gray-600 text-lg md:text-xl">
          At Food Funday, we believe that food is more than just a meal — it's an experience that brings people together. 
          Our mission is to connect food lovers with the best local restaurants, helping them explore new flavors, cultures, 
          and unforgettable dining moments. Whether you're planning a romantic dinner, a family outing, or a casual meet-up 
          with friends, we make it easy to discover top-rated spots and book your table with just a few clicks. Join us on 
          a journey of taste, convenience, and celebration.
        </p>

        <Button size="lg" shape="pill">
          Learn More
        </Button>
      </div>

      {/* Image Content */}
      <div className="w-full lg:w-1/2 relative flex justify-center items-center">
        {/* Main Image */}
        <div className="relative">
          <img
            src={aboutBg1}
            alt="Main"
            className="w-96 h-96 rounded-full border-4 border-white shadow-xl object-cover"
          />
          {/* Second Image Overlapping */}
          <img
            src={aboutBg2}
            alt="Secondary"
            className="w-40 h-40 rounded-full border-4 border-white shadow-lg object-cover absolute -top-8 -right-8"
          />
        </div>
      </div>
    </section>
  );
};

export default AboutUsSection;
