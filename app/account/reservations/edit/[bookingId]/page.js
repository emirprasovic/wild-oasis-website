import FormButton from "@/app/_components/FormButton";
import { updateReservationAction } from "@/app/_lib/actions";
import { auth } from "@/app/_lib/auth";
import { getBooking, getCabin } from "@/app/_lib/data-service";

export default async function Page({ params }) {
  const session = await auth();
  const { bookingId } = params;

  const booking = await getBooking(bookingId);
  const cabin = await getCabin(booking.cabinId);

  //   console.log(booking);
  //   console.log(cabin);

  const { maxCapacity } = cabin;

  return (
    <div>
      <h2 className="mb-7 text-2xl font-semibold text-accent-400">
        Edit Reservation #{bookingId}
      </h2>

      <form
        action={updateReservationAction}
        className="flex flex-col gap-6 bg-primary-900 px-12 py-8 text-lg"
      >
        <div className="space-y-2">
          <label htmlFor="numGuests">How many guests?</label>
          <select
            name="numGuests"
            id="numGuests"
            className="w-full rounded-sm bg-primary-200 px-5 py-3 text-primary-800 shadow-sm"
            required
            defaultValue={booking.numGuests}
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
            className="w-full rounded-sm bg-primary-200 px-5 py-3 text-primary-800 shadow-sm"
            defaultValue={booking.observations}
          />
        </div>

        <input type="hidden" name="bookingId" value={bookingId} />
        <input type="hidden" name="guestId" value={session.user.guest.id} />

        <div className="flex items-center justify-end gap-6">
          <FormButton />
        </div>
      </form>
    </div>
  );
}
