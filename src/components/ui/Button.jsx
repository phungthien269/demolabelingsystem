import * as React from "react";

import { cn } from "../../utils/cn";

// We need to install class-variance-authority for cleaner component variants
// Running: npm install class-variance-authority
// But for now I will implement manually or assume user allows me to add it. 
// Actually, it's better to stick to the plan. I didn't install CVA. 
// I'll implementation Button without CVA first to minimize deps, or I can add it.
// Given "utilitarian" instructions, I'll stick to simple logical implementation or CVA if I added it.
// I did NOT add CVA in the install command. I will use standard props.

const Button = React.forwardRef(
    ({ className, variant = "primary", size = "base", isLoading, leftIcon, children, ...props }, ref) => {

        const baseStyles = "inline-flex items-center justify-center rounded-md text-body font-bold uppercase tracking-wide transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed";

        const variants = {
            primary: "bg-annotator-primary text-white hover:opacity-90 active:scale-95 focus:ring-annotator-primary",
            // Note: Primary color depends on role, but for now defaulting to annotator primary or we need a prop?
            // Design system says: "primary": { "fill": "solid", "textColor": "on_primary" }
            // And "roleAccents". 
            // I'll default to a generic primary class that maps to the current role context, 
            // OR I need to handle role-based colors. 
            // For now, I'll use annotator-primary as default, and we might need to swap this based on context later.
            // Actually, let's make it configurable or map to a CSS variable if we were advanced. 
            // Simple approach: Use a specific prop or just default to annotator for now.

            secondary: "border border-dark-border-base bg-transparent text-dark-text-primary hover:bg-dark-border-muted active:scale-95",
            ghost: "bg-transparent text-dark-text-primary hover:bg-dark-border-muted active:scale-95",
            destructive: "border border-red-500 text-red-500 hover:bg-red-500/10 active:scale-95",
        };

        // Size isn't explicitly defined in Button specs apart from padding
        // designSystem.json: Button base: radius md (8px), text uppercase bold.
        const sizes = {
            base: "h-10 px-4 py-2",
            sm: "h-8 px-3 text-caption",
            icon: "h-10 w-10 p-0",
        };

        return (
            <button
                ref={ref}
                className={cn(baseStyles, variants[variant], sizes[size], className)}
                disabled={isLoading || props.disabled}
                {...props}
            >
                {isLoading && (
                    <span className="material-symbols-outlined animate-spin mr-2 text-[18px]">progress_activity</span>
                )}
                {!isLoading && leftIcon && (
                    <span className="material-symbols-outlined mr-2 text-[18px]">{leftIcon}</span>
                )}
                {children}
            </button>
        );
    }
);
Button.displayName = "Button";

export { Button };
