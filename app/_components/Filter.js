"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";

function Filter() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const activeFilter = searchParams.get("capacity") ?? "all";

  function handleFilter(filter) {
    const params = new URLSearchParams(searchParams);
    params.set("capacity", filter);
    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  }

  return (
    <div className="flex border border-primary-800">
      <Button
        className="px-5 py-2 hover:bg-primary-700"
        handleFilter={() => handleFilter("all")}
        activeFilter={activeFilter}
        filter={"all"}
      >
        All Cabins
      </Button>
      <Button
        className="px-5 py-2 hover:bg-primary-700"
        handleFilter={() => handleFilter("small")}
        activeFilter={activeFilter}
        filter={"small"}
      >
        1&mdash;3 Guests
      </Button>
      <Button
        className="px-5 py-2 hover:bg-primary-700"
        handleFilter={() => handleFilter("medium")}
        activeFilter={activeFilter}
        filter={"medium"}
      >
        4&mdash;7 Guests
      </Button>
      <Button
        handleFilter={() => handleFilter("large")}
        activeFilter={activeFilter}
        filter={"large"}
      >
        8&mdash;12 Guests
      </Button>
    </div>
  );
}

function Button({ children, filter, handleFilter, activeFilter }) {
  return (
    <button
      className={`px-5 py-2 hover:bg-primary-700 ${filter === activeFilter ? "bg-primary-700 text-primary-50" : ""}`}
      onClick={handleFilter}
    >
      {children}
    </button>
  );
}

export default Filter;
