import { bannerImage } from "../../../../assets";
import { Button } from "../../../../components/ui";

const HeroSection = () => {
  return (
    <section
      className="relative bg-cover bg-center bg-no-repeat py-36 px-6 lg:px-24 text-white"
      style={{ backgroundImage: `url('${bannerImage}')` }}
    >
      {/* Overlay for better text contrast */}
      <div className="absolute inset-0 bg-black/40 z-0" />

      {/* Content */}
      <div className="relative z-10 max-w-5xl mx-auto text-center space-y-8">
        <h1 className="text-5xl md:text-6xl font-bold leading-tight">
          Discover & Book Your<br />Favorite Restaurant with <span className="text-orange-500">Food Funday</span>
        </h1>
        <p className="text-xl md:text-2xl text-gray-100">
          Food Funday helps you explore top restaurants and book your table instantly — simple, fast, and deliciously easy!
        </p>
        <div className="flex justify-center gap-6 flex-wrap">
          <Button>
            Book Table
          </Button>
          <Button 
            variant="outline" 
          >
            Contact Us
          </Button>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
