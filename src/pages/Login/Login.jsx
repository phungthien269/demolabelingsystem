import * as React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../../components/ui/Button";
import { Input } from "../../components/ui/Input";
import { useAuth } from "../../context/AuthContext";
import { useToast } from "../../context/ToastContext";

export default function Login() {
    const navigate = useNavigate();
    const { login } = useAuth();
    const { addToast } = useToast();
    const [isLoading, setIsLoading] = React.useState(false);
    const [selectedRole, setSelectedRole] = React.useState("annotator");

    const handleLogin = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            await login(selectedRole);
            addToast(`Welcome back, ${selectedRole}!`, "success");

            // Redirect based on role
            switch (selectedRole) {
                case "annotator":
                    navigate("/annotator/tasks");
                    break;
                case "reviewer":
                    navigate("/reviewer/queue");
                    break;
                case "manager":
                    navigate("/manager/dashboard");
                    break;
                default:
                    navigate("/");
            }
        } catch (error) {
            addToast("Login failed. Please try again.", "error");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen w-full flex items-center justify-center bg-dark-bg-base relative overflow-hidden">
            {/* Soft background blobs */}
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-annotator-primary/10 rounded-full blur-3xl" />
            <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-manager-primary/10 rounded-full blur-3xl opacity-50" />

            <div className="w-full max-w-md p-8 rounded-xl bg-dark-surface-panel border border-dark-border-base shadow-2xl relative z-10 backdrop-blur-sm">
                <div className="mb-8 text-center">
                    <h1 className="text-h1 mb-2 text-dark-text-primary">DataLabel<span className="text-annotator-primary">Core</span></h1>
                    <p className="text-dark-text-secondary">Internal Data Labeling System</p>
                </div>

                <form onSubmit={handleLogin} className="space-y-6">
                    <div className="space-y-2">
                        <label className="text-caption text-dark-text-secondary uppercase font-bold tracking-wide">Select Role</label>
                        <div className="grid grid-cols-3 gap-2">
                            {['annotator', 'reviewer', 'manager'].map((role) => (
                                <button
                                    key={role}
                                    type="button"
                                    onClick={() => setSelectedRole(role)}
                                    className={`
                    px-2 py-2 rounded-md border text-xs font-bold uppercase transition-all duration-200
                    ${selectedRole === role
                                            ? 'bg-dark-surface-toolbar border-annotator-primary text-annotator-primary ring-1 ring-annotator-primary'
                                            : 'border-dark-border-base text-dark-text-muted hover:border-dark-text-secondary hover:text-dark-text-secondary bg-dark-bg-base'}
                  `}
                                >
                                    {role}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="space-y-4">
                        <div className="space-y-1">
                            <label className="text-caption text-dark-text-secondary uppercase font-bold tracking-wide">Username</label>
                            <Input placeholder="demo_user" defaultValue="demo_user" disabled />
                        </div>
                        <div className="space-y-1">
                            <label className="text-caption text-dark-text-secondary uppercase font-bold tracking-wide">Password</label>
                            <Input type="password" placeholder="••••••••" defaultValue="password" disabled />
                        </div>
                    </div>

                    <Button
                        type="submit"
                        className="w-full"
                        isLoading={isLoading}
                        variant="primary"
                    >
                        Login as {selectedRole}
                    </Button>
                </form>

                <div className="mt-6 text-center">
                    <p className="text-micro text-dark-text-muted">
                        Restricted Access • Internal Use Only • v1.0.0
                    </p>
                </div>
            </div>
        </div>
    );
}
