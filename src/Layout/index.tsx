import {Outlet} from "react-router-dom";
import Index from "../components/Header";
import Footer from "./Footer";

export default function Layout() {
    return (
        <div className="flex flex-col min-h-screen">
            <Index />
            <main className="flex-grow">
                <Outlet />
            </main>
            <Footer />
        </div>
    );
}
