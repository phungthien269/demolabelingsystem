import * as React from "react";
import { cn } from "../../utils/cn";
import { NavLink } from "react-router-dom";

export function Sidebar({ role = "manager" }) {
    const links = [
        { to: "/manager/dashboard", label: "Dashboard", icon: "dashboard" },
        { to: "/manager/projects", label: "Projects", icon: "folder" },
        { to: "/manager/users", label: "Users", icon: "group" },
        { to: "/manager/settings", label: "Settings", icon: "settings" },
    ];

    return (
        <aside className="w-64 border-r border-dark-border-base bg-dark-bg-base flex flex-col h-screen fixed left-0 top-0">
            <div className="h-14 flex items-center px-4 border-b border-dark-border-base">
                <span className="font-bold text-lg tracking-tight">DataLabel<span className="text-manager-primary">Core</span></span>
            </div>

            <nav className="flex-1 py-4 px-2 space-y-1">
                {links.map((link) => (
                    <NavLink
                        key={link.to}
                        to={link.to}
                        className={({ isActive }) => cn(
                            "flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors duration-150",
                            isActive
                                ? "bg-manager-primary/10 text-manager-primary"
                                : "text-dark-text-secondary hover:bg-dark-surface-panel hover:text-dark-text-primary"
                        )}
                    >
                        <span className="material-symbols-outlined mr-3 text-[20px]">{link.icon}</span>
                        {link.label}
                    </NavLink>
                ))}
            </nav>

            <div className="p-4 border-t border-dark-border-base">
                <div className="flex items-center">
                    <div className="w-8 h-8 rounded-full bg-dark-surface-panel flex items-center justify-center text-xs font-bold">
                        MG
                    </div>
                    <div className="ml-3">
                        <p className="text-sm font-medium">Manager</p>
                        <p className="text-xs text-dark-text-muted">Logout</p>
                    </div>
                </div>
            </div>
        </aside>
    );
}
