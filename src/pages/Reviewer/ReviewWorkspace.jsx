import * as React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Workspace3Column } from "../../components/layout/WorkspaceLayout";
import { Button } from "../../components/ui/Button";
import { ModalDialog } from "../../components/ui/Modal";
import { Input } from "../../components/ui/Input";
import { TASKS } from "../../services/mockData";
import { useToast } from "../../context/ToastContext";
import { cn } from "../../utils/cn";

export default function ReviewWorkspace() {
    const { taskId } = useParams();
    const navigate = useNavigate();
    const { addToast } = useToast();

    const task = TASKS.find(t => t.id === taskId);
    const [isRejectModalOpen, setIsRejectModalOpen] = React.useState(false);
    const [rejectComment, setRejectComment] = React.useState("");
    const [rejectErrorType, setRejectErrorType] = React.useState("accuracy");

    if (!task) return <div>Task not found</div>;

    const handleApprove = () => {
        addToast(`Task ${task.id} approved successfully`, "success");
        navigate("/reviewer/queue");
    };

    const handleReject = () => {
        if (!rejectComment.trim()) {
            addToast("Reject comment is required.", "error");
            return;
        }
        addToast(`Task ${task.id} rejected. Sent back to annotator.`, "success"); // In a real app we'd update state
        setIsRejectModalOpen(false);
        navigate("/reviewer/queue");
    };

    // Simplified Panels since we are reusing concepts from Annotator Workspace but read-only
    const LeftPanel = (
        <div className="p-4">
            <Button variant="ghost" size="sm" onClick={() => navigate("/reviewer/queue")} leftIcon="arrow_back" className="mb-4">
                Back to Queue
            </Button>
            <div className="bg-dark-bg-canvas p-4 rounded border border-dark-border-base mb-4">
                <p className="text-micro font-bold uppercase text-dark-text-secondary mb-1">Project</p>
                <h3 className="text-h3 mb-4">{task.projectName}</h3>

                <p className="text-micro font-bold uppercase text-dark-text-secondary mb-1">Submitter</p>
                <div className="flex items-center mb-4">
                    <div className="w-6 h-6 rounded-full bg-annotator-primary text-white flex items-center justify-center text-[10px] font-bold mr-2">
                        {task.assignee.charAt(0)}
                    </div>
                    <span className="text-body font-medium">{task.assignee}</span>
                </div>

                <p className="text-micro font-bold uppercase text-dark-text-secondary mb-1">Time Spent</p>
                <p className="font-mono text-sm text-dark-text-muted">45m 12s</p>
            </div>
        </div>
    );

    const CenterPanel = (
        <div className="flex-1 overflow-hidden relative bg-black flex items-center justify-center">
            <div className="text-center text-dark-text-muted">
                <span className="material-symbols-outlined text-6xl opacity-20 mb-4">image</span>
                <p>Review Mode (Read Only)</p>
            </div>
        </div>
    );

    const RightPanel = (
        <div className="flex flex-col h-full bg-dark-surface-panel">
            <div className="flex-1 p-4">
                <h4 className="text-micro font-extrabold uppercase tracking-wide text-dark-text-secondary mb-4">Guidelines</h4>
                <div className="text-sm text-dark-text-secondary space-y-2">
                    <p>1. Check for tight bounding boxes.</p>
                    <p>2. Ensure no occlusion is ignored.</p>
                    <p>3. Verify correct class labels.</p>
                </div>
            </div>

            {/* Approve / Reject Bar */}
            <div className="p-4 border-t border-dark-border-base bg-dark-surface-toolbar space-y-3">
                <Button variant="primary" className="w-full bg-green-600 hover:bg-green-700 focus:ring-green-600" leftIcon="check" onClick={handleApprove}>
                    Approve (A)
                </Button>
                <Button variant="destructive" className="w-full" leftIcon="close" onClick={() => setIsRejectModalOpen(true)}>
                    Reject (R)
                </Button>
            </div>
        </div>
    );

    return (
        <>
            <Workspace3Column left={LeftPanel} center={CenterPanel} right={RightPanel} leftWidth="w-64" rightWidth="w-72" />

            <ModalDialog
                isOpen={isRejectModalOpen}
                onClose={() => setIsRejectModalOpen(false)}
                title="Reject Task"
                actions={
                    <>
                        <Button variant="secondary" onClick={() => setIsRejectModalOpen(false)}>Cancel</Button>
                        <Button variant="destructive" onClick={handleReject}>Confirm Reject</Button>
                    </>
                }
            >
                <div className="space-y-4">
                    <p className="text-sm">Please provide a reason for rejecting this task. This will be sent to the annotator.</p>

                    <div className="space-y-1">
                        <label className="text-caption font-bold">Error Type</label>
                        <div className="flex space-x-2">
                            {['Accuracy', 'Missing', 'Wrong Class'].map(type => (
                                <button
                                    key={type}
                                    onClick={() => setRejectErrorType(type.toLowerCase())}
                                    className={cn(
                                        "px-3 py-1 text-xs rounded border border-dark-border-base",
                                        rejectErrorType === type.toLowerCase() ? "bg-red-500/10 text-red-500 border-red-500" : "text-dark-text-secondary"
                                    )}
                                >
                                    {type}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="space-y-1">
                        <label className="text-caption font-bold">Comment *</label>
                        <textarea
                            className="w-full h-24 rounded-md border border-dark-border-base bg-dark-bg-base p-3 text-sm focus:ring-1 focus:ring-red-500 focus:outline-none"
                            placeholder="Describe what needs to be fixed..."
                            value={rejectComment}
                            onChange={(e) => setRejectComment(e.target.value)}
                        />
                    </div>
                </div>
            </ModalDialog>
        </>
    );
}
