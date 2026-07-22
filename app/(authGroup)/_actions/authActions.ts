'use server'

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

type LoginState = {
    success: boolean,
    message: string,
    statusCode: number,
    data: {
        accessToken: string,
        refreshToken: string,
    }
}

export const loginAction = async (prevState: LoginState,formData: FormData) => {
    const payload = {
        email: formData.get('email'),
        password: formData.get('password'),
    };
    // console.log(`${process.env.BACKEND_API_URL}: ${JSON.stringify(payload)}`)

    const res = await fetch(`${process.env.BACKEND_API_URL}/api/auth/login`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(payload),
    });

    const resData = await res.json();

    if (resData.success) {
        const cookieStore = await cookies();

        cookieStore.set("accessToken", resData.data.accessToken, {
            httpOnly: true,
            maxAge: 60 * 60 * 24,
            sameSite: "lax",
        });
        cookieStore.set("refreshToken", resData.data.refreshToken, {
            httpOnly: true,
            maxAge: 60 * 60 * 24 * 7,
            sameSite: "lax",
        });

        redirect("/dashboard", "replace");
    }

    console.log(resData);
    return resData;
}