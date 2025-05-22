import {Outlet} from "react-router-dom";
import Header  from "../components/Header";
import Footer from "./Footer";

export default function Layout() {
    return (
        <div className="flex flex-col min-h-screen items-center">
            <Header />
            <main className="w-full">
                <Outlet />
            </main>
            <Footer />
        </div>
    );
}
