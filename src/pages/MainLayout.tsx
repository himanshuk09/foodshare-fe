import { Outlet, } from "react-router-dom";
import Navbar from "../components/Navbar";

export default function MainLayout() {
    return (
        <div className="min-h-screen bg-gray-50">
            <Navbar />

            {/* Page Content */}
            <main className="max-w-7xl mx-auto p-4">
                <Outlet />
            </main>
        </div>
    );
}