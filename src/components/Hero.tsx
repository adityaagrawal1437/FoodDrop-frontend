import hero from "../assets/pexels-jonathan-borba-2983101.jpg";
const Hero = () => {
  return (
    <div>
      <img
        src={hero}
        alt="Hero Image"
        className="w-full  max-h-[600px] object-cover"
      />
    </div>
  );
};
export default Hero;
