import * as React from "react";
import { createPortal } from "react-dom";
import { cn } from "../../utils/cn";
import { Button } from "./Button";

export function ModalDialog({ isOpen, onClose, title, children, actions, variant = "default" }) {
    if (!isOpen) return null;

    return createPortal(
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
            <div
                className={cn(
                    "w-full max-w-md rounded-lg bg-dark-surface-panel border border-dark-border-base shadow-xl transform transition-all",
                    "animate-in zoom-in-95 duration-200"
                )}
                role="dialog"
                aria-modal="true"
            >
                <div className="flex items-center justify-between px-6 py-4 border-b border-dark-border-base">
                    <h3 className="text-h3 text-dark-text-primary">{title}</h3>
                    <button onClick={onClose} className="text-dark-text-muted hover:text-dark-text-primary">
                        <span className="material-symbols-outlined">close</span>
                    </button>
                </div>

                <div className="px-6 py-4 text-body text-dark-text-secondary">
                    {children}
                </div>

                <div className="px-6 py-4 border-t border-dark-border-base flex justify-end space-x-3 bg-dark-surface-toolbar rounded-b-lg">
                    {actions}
                </div>
            </div>
        </div>,
        document.body
    );
}

// Helper for Confirmation Dialog
export function ConfirmDialog({ isOpen, onClose, onConfirm, title, message, confirmText = "Confirm", cancelText = "Cancel", isDestructive = false }) {
    return (
        <ModalDialog
            isOpen={isOpen}
            onClose={onClose}
            title={title}
            actions={
                <>
                    <Button variant="secondary" onClick={onClose}>{cancelText}</Button>
                    <Button variant={isDestructive ? "destructive" : "primary"} onClick={onConfirm}>{confirmText}</Button>
                </>
            }
        >
            <p>{message}</p>
        </ModalDialog>
    );
}
