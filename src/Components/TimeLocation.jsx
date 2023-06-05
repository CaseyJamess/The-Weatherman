

const TimeLocation = ({ formattedData, localTimeAndDay }) => {
  const location = formattedData.name + " " + formattedData.country + ", ";
  return (
    <div className="flex flex-col sm:flex-row items-center justify-center text-center text-sm sm:text-2xl text-white font-light my-2 sm:my-5">
      <p className=" mr-2">{location}</p>
      <p>{localTimeAndDay}</p>
    </div>
  );
};

export default TimeLocation;
