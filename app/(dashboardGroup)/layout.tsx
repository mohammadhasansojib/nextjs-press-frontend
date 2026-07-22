import { Navbar } from "@/components/shared/navbar";


const DashboardLayout = ({
    children
}: {
    children: React.ReactNode
}) => {

    return (
        <>
        <Navbar />
        {children}
        </>
    )
}

export default DashboardLayout;