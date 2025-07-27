"use client";

import { differenceInDays } from "date-fns";
import { useReservation } from "../_contexts/ReservationContext";
import { createReservationAction } from "../_lib/actions";
import { useFormStatus } from "react-dom";

function ReservationForm({ cabin, user }) {
  const { range, resetRange } = useReservation();
  const { maxCapacity, regularPrice, discount } = cabin;

  const startDate = range.from;
  const endDate = range.to;

  const numNights = differenceInDays(endDate, startDate);
  const cabinPrice = numNights * (regularPrice - discount);

  const bookingData = {
    startDate,
    endDate,
    numNights,
    cabinPrice,
    cabinId: cabin.id,
  };

  // const createReservationWithData = createReservationAction.bind(
  //   null,
  //   bookingData,
  // );

  // SIMPLER WAY FOR ABOVE IMPLEMENTATION

  return (
    <div className="scale-[1.01]">
      <div className="flex items-center justify-between bg-primary-800 px-16 py-2 text-primary-300">
        <p>Logged in as</p>

        <div className="flex items-center gap-4">
          <img
            // Important to display google profile images
            referrerPolicy="no-referrer"
            className="h-8 rounded-full"
            src={user.image}
            alt={user.name}
          />
          <p>{user.name}</p>
        </div>
      </div>

      {/* <p>
        Range from {String(range?.from)} to {String(range?.to)}
      </p> */}

      <form
        // action={createReservationWithData}
        action={async (formData) => {
          // await createReservationWithData(formData); A bit complicated using .bind()
          await createReservationAction(bookingData, formData);
          resetRange();
        }}
        className="flex flex-col gap-5 bg-primary-900 px-16 py-10 text-lg"
      >
        <div className="space-y-2">
          <label htmlFor="numGuests">How many guests?</label>
          <select
            name="numGuests"
            id="numGuests"
            className="w-full rounded-sm bg-primary-200 px-5 py-3 text-primary-800 shadow-sm"
            required
          >
            <option value="" key="">
              Select number of guests...
            </option>
            {Array.from({ length: maxCapacity }, (_, i) => i + 1).map((x) => (
              <option value={x} key={x}>
                {x} {x === 1 ? "guest" : "guests"}
              </option>
            ))}
          </select>
        </div>

        <div className="space-y-2">
          <label htmlFor="observations">
            Anything we should know about your stay?
          </label>
          <textarea
            name="observations"
            id="observations"
            className="w-full rounded-sm bg-primary-200 px-5 py-3 text-primary-800 shadow-sm"
            placeholder="Any pets, allergies, special requirements, etc.?"
          />
        </div>
        <div className="flex items-center justify-end gap-6">
          <p className="text-base text-primary-300">Start by selecting dates</p>
          <Button startDate={startDate} endDate={endDate} />
        </div>
      </form>
    </div>
  );
}

function Button({ startDate, endDate }) {
  const { pending } = useFormStatus();

  return (
    <button
      disabled={!startDate || !endDate}
      className="bg-accent-500 px-8 py-4 font-semibold text-primary-800 transition-all hover:bg-accent-600 disabled:cursor-not-allowed disabled:bg-gray-500 disabled:text-gray-300"
    >
      {pending ? "Reserving..." : "Reserve now"}
    </button>
  );
}

export default ReservationForm;
