import { Navbar } from "@/components/shared/navbar";
import { getMe } from "@/service/getMe";


const AuthLayout = async ({
    children
}: {
    children: React.ReactNode
}) => {
    const user = await getMe();

    return (
        <>
            <Navbar userAvatar={{
                initials: 'JS',
                name: user.data?.user.name,
                email: user.data?.user.email,
            }} />
            <div className="mx-auto max-w-7xl">
                {children}
            </div>
        </>
    )
}
export default AuthLayout;