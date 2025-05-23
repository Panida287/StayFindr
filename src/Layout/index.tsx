import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import { JSX } from 'react';

export default function Layout(): JSX.Element {
    return (
        <div className="flex flex-col min-h-screen">
            <Header />
            <main className="flex-1 w-full">
                <Outlet />
            </main>
            <Footer />
        </div>
    );
}
