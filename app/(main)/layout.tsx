import { Footer } from "@/components/footer/footer";
import Header from "@/components/header/header";

const MainLayout = ({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) => {
    return (
        <main>
            <Header />
            {children}
            <Footer />
        </main>
    )
}

export default MainLayout