import { getUserMeLoader } from "@/services/user-me-loader";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const config = {
  maxAge: 60 * 60 * 24 * 7, // 1 week
  path: "/",
  domain: process.env.HOST ?? "ite4108m.com",
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
};

async function logoutAction() {
  "use server";
  const cookieStore = await cookies();
  cookieStore.set("jwt", "", { ...config, maxAge: 0 });
  redirect("https://ite4108m.com");
}

export async function LogoutButton() {
  const user = await getUserMeLoader();
  return (
    <form action={logoutAction}>
      <button
        type="submit"
        className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow"
      >
        Logout {JSON.stringify(user)}
      </button>
    </form>
  );
}