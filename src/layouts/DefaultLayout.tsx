import { Outlet } from "react-router-dom";

export function DefaultLayout() {
    return (
        <main>
            <h1>Header</h1>
            <Outlet/>
        </main>
    )
}