import CabinCard from "./CabinCard";
import { getCabins } from "../_lib/data-service";

async function CabinList({ filter }) {
  const cabins = await getCabins();

  if (!cabins.length) return null;

  let filteredCabins = {};
  if (filter === "small")
    filteredCabins = cabins.filter((cabin) => cabin.maxCapacity <= 3);
  else if (filter === "medium")
    filteredCabins = cabins.filter(
      (cabin) => cabin.maxCapacity > 3 && cabin.maxCapacity < 8,
    );
  else if (filter === "large")
    filteredCabins = cabins.filter((cabin) => cabin.maxCapacity >= 8);
  else filteredCabins = cabins;

  return (
    <div className="grid gap-8 sm:grid-cols-1 md:grid-cols-2 lg:gap-12 xl:gap-14">
      {filteredCabins.map((cabin) => (
        <CabinCard cabin={cabin} key={cabin.id} />
      ))}
    </div>
  );
}

export default CabinList;
