import * as React from "react";
import { cn } from "../../utils/cn";

export function Workspace3Column({ left, center, right, leftWidth = "w-72", rightWidth = "w-80" }) {
    return (
        <div className="flex h-screen w-full overflow-hidden bg-dark-bg-base text-dark-text-primary">
            {/* Left Column (Navigation/List) */}
            <aside className={cn("border-r border-dark-border-base flex flex-col bg-dark-surface-panel", leftWidth)}>
                {left}
            </aside>

            {/* Center Column (Canvas) - Flexible */}
            <main className="flex-1 flex flex-col relative overflow-hidden bg-dark-bg-canvas relative">
                {/* Dotted pattern background for canvas feel */}
                <div className="absolute inset-0 opacity-[0.03]"
                    style={{ backgroundImage: 'radial-gradient(circle, #ffffff 1px, transparent 1px)', backgroundSize: '24px 24px' }}>
                </div>
                <div className="relative z-10 flex-1 flex flex-col">
                    {center}
                </div>
            </main>

            {/* Right Column (Metadata/Labels) */}
            <aside className={cn("border-l border-dark-border-base flex flex-col bg-dark-surface-panel", rightWidth)}>
                {right}
            </aside>
        </div>
    );
}
