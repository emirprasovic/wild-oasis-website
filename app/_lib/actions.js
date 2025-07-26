"use server";

import { revalidatePath } from "next/cache";
import { auth, signIn, signOut } from "./auth";
import { deleteBooking, updateBooking, updateGuest } from "./data-service";
import { redirect } from "next/dist/server/api-utils";

export async function signInAction() {
  await signIn("google", { redirectTo: "/account" });
}

export async function signOutAction() {
  await signOut({ redirectTo: "/" });
}

export async function updateGuestAction(formData) {
  const session = await auth();

  if (!session) throw new Error("You must be logged in");

  const nationalID = formData.get("nationalID");
  const [nationality, countryFlag] = formData.get("nationality").split("%");

  const nationalIdRegex = /^[a-zA-Z0-9]{6,26}$/;
  if (!nationalIdRegex.test(nationalID)) throw new Error("Invalid National ID");

  const updateData = { nationality, countryFlag, nationalID };
  console.log(updateData);

  await updateGuest(session.user.guest.id, updateData);
  revalidatePath("/account/profile");
}

export async function deleteReservationAction(bookingId) {
  const session = await auth();

  if (!session) throw new Error("You must be logged in");

  await deleteBooking(bookingId, session.user.guest.id);
  revalidatePath("/account/reservations");
}

export async function updateReservationAction(formData) {
  const session = await auth();

  if (!session) throw new Error("You must be logged in");

  console.log("FD", formData);

  await updateBooking(
    Number(formData.get("bookingId")),
    Number(formData.get("guestId")),
    {
      numGuests: formData.get("numGuests"),
      observations: formData.get("observations").slice(0, 1000),
    },
  );

  revalidatePath("/account/reservations");
}
