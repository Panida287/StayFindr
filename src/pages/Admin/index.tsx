import { Outlet } from "react-router-dom";

const AdminPage = () => {
    return (
        <div>
            <h1>Admin Dashboard</h1>
            <Outlet />
        </div>
    );
};

export default AdminPage;
