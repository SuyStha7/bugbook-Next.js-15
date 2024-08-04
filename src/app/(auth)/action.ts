"use server";

import { lucia, validateRequest } from "@/auth";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function logout() {
  try {
    // Validate the request and retrieve the session
    const { session } = await validateRequest();

    if (!session) {
      throw new Error("Unauthorized");
    }

    // Invalidate the session
    await lucia.invalidateSession(session.id);

    // Create a blank session cookie to clear the current session cookie
    const sessionCookie = lucia.createBlankSessionCookie();

    // Set the session cookie
    cookies().set(
      sessionCookie.name,
      sessionCookie.value,
      sessionCookie.attributes,
    );

    // Redirect the user to the login page
    return redirect("/login");
  } catch (error) {
    console.error(error)
    throw new Error("error");
  }
}
