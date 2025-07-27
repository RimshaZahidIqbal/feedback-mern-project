import {
    LuLayoutDashboard,
    LuLogOut,
} from "react-icons/lu";

export const SIDE_MENU_DATA = [
    {
        id: "01",
        label: "Dashboard",
        icon: LuLayoutDashboard,
        path: "/admin/dashboard",
    },
    {
        id: "02",
        label: "Logout",
        icon: LuLogOut,
        path: "logout",
    },
];

export const COURSES = [
    "Web and App Development",
    "Flutter App Development",
    "Python Programming",
    "Artificial Intelligence",
]