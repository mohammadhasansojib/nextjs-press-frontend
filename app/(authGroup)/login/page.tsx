import LoginForm from "../_components/LoginForm";
import { Card } from "@/components/ui/card";
import Link from "next/link";


const LoginPage = () => {


    return (
        <div className="min-h-screen flex justify-center items-center">
            <div className="">

                <Card className="m-5 p-5 shadow-xl text-center">
                    {/* Text Here */}
                    <h1 className="text-2xl font-bold">Welcome Back</h1>
                    <p className="text-sm text-gray-500">Input your credentials to login</p>
                    {/* Form Here */}
                    <LoginForm />

                    {/* register route text */}
                    <p>
                    Do not have account?
                    <Link href="/register" className="underline">Register</Link>
                    </p>
                </Card>

            </div>
        </div>
    )
}

export default LoginPage;