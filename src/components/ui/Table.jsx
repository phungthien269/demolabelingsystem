import * as React from "react";
import { cn } from "../../utils/cn";

// designSystem.json:
// Table:
// - header: micro, uppercase, tracking-wide, weight 800, bg subtle_surface
// - row: body size, hover enabled (subtle_bg, optional_left_border_accent)
// - dense: true

export function Table({ children, className }) {
    return (
        <div className={cn("w-full overflow-auto rounded-md border border-dark-border-base bg-dark-bg-canvas", className)}>
            <table className="w-full caption-bottom text-sm text-left">
                {children}
            </table>
        </div>
    );
}

export function TableHeader({ children }) {
    return (
        <thead className="bg-dark-surface-panel border-b border-dark-border-base">
            {children}
        </thead>
    );
}

export function TableBody({ children }) {
    return (
        <tbody className="divide-y divide-dark-border-base/50">
            {children}
        </tbody>
    );
}

export function TableRow({ children, className, onClick }) {
    return (
        <tr
            className={cn(
                "transition-colors hover:bg-dark-surface-panel/50 group", // subtle hover
                onClick && "cursor-pointer",
                className
            )}
            onClick={onClick}
        >
            {children}
        </tr>
    );
}

export function TableHead({ children, className }) {
    return (
        <th className={cn(
            "h-10 px-4 text-left align-middle font-extrabold text-micro uppercase tracking-wide text-dark-text-secondary select-none",
            className
        )}>
            {children}
        </th>
    );
}

export function TableCell({ children, className }) {
    return (
        <td className={cn(
            "p-4 align-middle text-body text-dark-text-primary", // Padding might need adjustment for "dense"
            // design system says "dense: true". Let's reduce padding.
            "px-4 py-2", // Overriding to denser padding
            className
        )}>
            {children}
        </td>
    );
}
