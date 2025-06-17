import { cookies } from "next/headers";

export async function getAuthToken() {
    const cookiesStore = await cookies();
    const authToken = cookiesStore.get("jwt")?.value;
    return authToken;
}