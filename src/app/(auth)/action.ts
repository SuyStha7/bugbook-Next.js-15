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

    // Set the cookie to effectively log out the user
    cookies().set(sessionCookie.name, sessionCookie.value, {
      ...sessionCookie.attributes,
      maxAge: 0, // Set maxAge to 0 to ensure the cookie is deleted
    });

    // Redirect the user to the login page
    return redirect("/login");
  } catch (error) {
    // Handle any errors that occur during the logout process
    console.error("Logout error:", error);
    throw new Error("Logout failed");
  }
}
