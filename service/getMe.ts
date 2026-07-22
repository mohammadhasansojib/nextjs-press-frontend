'use server'

import { cookies } from "next/headers"

export const getMe = async () => {
    const cookieStore = await cookies();

    const accessToken = cookieStore.get('accessToken')?.value;

    if (!accessToken) {
        // throw new Error("token not found");

        return {
            success: false,
            message: "user not logged in",
        }
    }

    const res = await fetch(`${process.env.BACKEND_API_URL}/api/users/me`, {
        headers: {
            // Authorization: `Bearer ${accessToken}`,
            // Authorization: `${accessToken}`,
            Cookie: `access_token=${accessToken}`,
        },

        cache: 'force-cache',
        next: {
            tags: ['my-profile'],
        }
    });

    const resData = await res.json();

    console.log(resData);
    return resData;
}

