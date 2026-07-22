"use client"

import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { loginAction } from "../_actions/authActions";
import { useActionState, useEffect } from "react";
import { toast } from "sonner";

const LoginForm = () => {
    const [state, action, pending] = useActionState(loginAction, false);

    useEffect(() => {
        if (!state) return;

        if (state.success) {
            toast.success(state.message || "Login Successful");
        }

        if (!state.success) {
            toast.error(state.message || "Login failed");
        }
    }, [state]);

    return (
        <form action={action}>
            <Card className="p-10">
                <Input name="email" type="email" placeholder="enter you email" />
                <Input name="password" type="password" placeholder="enter you password" />

                <Button type="submit" className="cursor-pointer">
                    {pending ? "Login..." : "Login"}
                </Button>
            </Card>
        </form>
    )
}

export default LoginForm;