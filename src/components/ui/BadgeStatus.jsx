import * as React from "react";
import { cn } from "../../utils/cn";

// designSystem.json:
// "BadgeStatus": {
//   "shape": "pill",
//   "typography": { "size": "micro", "uppercase": true, "weight": 900, "tracking": "wide" },
//   "content": { "allowDot": true }
// }
// "status": {
//   "TODO": { "intent": "neutral_or_success", "style": "chip_with_dot" },
//   "IN_PROGRESS": { "intent": "warning", "style": "chip_with_pulse_dot" },
//   "SUBMITTED": { "intent": "info", "style": "chip" },
//   "REJECTED": { "intent": "danger", "style": "chip_with_icon_or_left_border" },
//   "APPROVED": { "intent": "success", "style": "chip_with_dot" }
// }

const statusConfig = {
    TODO: { color: "text-gray-400 bg-gray-400/10 border-gray-400/20", dot: "bg-gray-400" },
    IN_PROGRESS: { color: "text-amber-400 bg-amber-400/10 border-amber-400/20", dot: "bg-amber-400 animate-pulse" },
    SUBMITTED: { color: "text-blue-400 bg-blue-400/10 border-blue-400/20", dot: "bg-blue-400" }, // "chip" usually implies no dot, but dot is consistent
    REJECTED: { color: "text-red-400 bg-red-400/10 border-red-400/20", icon: "error" },
    APPROVED: { color: "text-green-400 bg-green-400/10 border-green-400/20", dot: "bg-green-400" },
};

export function BadgeStatus({ status }) {
    const config = statusConfig[status] || statusConfig.TODO;

    return (
        <span className={cn(
            "inline-flex items-center px-2 py-0.5 rounded-full border text-[10px] font-black uppercase tracking-wide",
            config.color
        )}>
            {config.dot && (
                <span className={cn("w-1.5 h-1.5 rounded-full mr-1.5", config.dot)} />
            )}
            {config.icon && (
                <span className="material-symbols-outlined text-[12px] mr-1">error</span>
            )}
            {status.replace("_", " ")}
        </span>
    );
}
