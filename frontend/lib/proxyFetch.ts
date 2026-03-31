import { cookies } from "next/headers";

export async function proxyFetch(url: string, options: RequestInit = {}) {
    const cookieStore = await cookies();
    let accessToken = cookieStore.get("access_token")?.value;
    const refreshToken = cookieStore.get("refresh_token")?.value;

    if (!accessToken && refreshToken) {
        const refreshResponse = await fetch(`${process.env.API_URL}/token/refresh`, {
        method: "POST",
        headers: {
            'Content-Type': "application/json",
            'Authorization': `Bearer ${refreshToken}`
        },
        });

        if (refreshResponse.ok) {
        const data = await refreshResponse.json();
        accessToken = data.accessToken;
        
        
        }
    }

    const headers = {
    ...options.headers,
    'Authorization': `Bearer ${accessToken}`,
    };

    return fetch(url, { ...options, headers });
}