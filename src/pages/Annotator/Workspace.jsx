import * as React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Workspace3Column } from "../../components/layout/WorkspaceLayout";
import { Button } from "../../components/ui/Button";
import { TASKS } from "../../services/mockData";
import { useToast } from "../../context/ToastContext";
import { cn } from "../../utils/cn";

// Mock Object Classes
const CLASSES = [
    { id: 1, name: "Traffic Light", color: "#ef4444" },
    { id: 2, name: "Stop Sign", color: "#f97316" },
    { id: 3, name: "Car", color: "#3b82f6" },
    { id: 4, name: "Pedestrian", color: "#8b5cf6" },
];

export default function Workspace() {
    const { taskId } = useParams();
    const navigate = useNavigate();
    const { addToast } = useToast();

    const task = TASKS.find(t => t.id === taskId);
    const [activeTool, setActiveTool] = React.useState("select");
    const [zoom, setZoom] = React.useState(100);
    const [annotations, setAnnotations] = React.useState([
        // Mock existing annotation
        { id: 1, classId: 1, x: 200, y: 150, w: 100, h: 200 }
    ]);

    if (!task) {
        return <div className="p-10 text-center">Task not found</div>;
    }

    const handleSave = () => {
        addToast("Draft saved successfully", "info");
    };

    const handleSubmit = () => {
        addToast("Task submitted for review", "success");
        navigate("/annotator/tasks");
    };

    // --- Left Column: Context / Task List ---
    const LeftPanel = (
        <div className="flex flex-col h-full">
            <div className="p-4 border-b border-dark-border-base bg-dark-surface-toolbar">
                <Button variant="ghost" size="sm" onClick={() => navigate("/annotator/tasks")} leftIcon="arrow_back" className="mb-2 -ml-2">
                    Back to List
                </Button>
                <h2 className="text-h3 text-dark-text-primary truncate">{task.projectName}</h2>
                <p className="text-caption text-dark-text-secondary font-mono">{task.id}</p>
            </div>

            <div className="flex-1 overflow-y-auto p-2 space-y-2">
                <p className="px-2 text-micro font-bold uppercase text-dark-text-secondary mt-2">Current Batch</p>
                {TASKS.filter(t => t.projectId === task.projectId).map((t) => (
                    <div
                        key={t.id}
                        onClick={() => navigate(`/annotator/task/${t.id}`)}
                        className={cn(
                            "flex items-center p-2 rounded-md cursor-pointer transition-colors",
                            t.id === taskId ? "bg-annotator-primary/10 border border-annotator-primary/50" : "hover:bg-dark-bg-canvas"
                        )}
                    >
                        <div className="w-10 h-10 bg-dark-bg-canvas rounded border border-dark-border-base mr-3 flex items-center justify-center overflow-hidden">
                            <span className="material-symbols-outlined text-dark-text-muted text-lg">image</span>
                        </div>
                        <div className="flex-1 min-w-0">
                            <p className={cn("text-caption font-bold truncate", t.id === taskId ? "text-annotator-primary" : "text-dark-text-primary")}>
                                {t.id}
                            </p>
                            <p className="text-micro text-dark-text-muted">{t.status}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );

    // --- Center Column: Canvas ---
    const CenterPanel = (
        <>
            <div className="absolute top-4 left-1/2 -translate-x-1/2 z-20 bg-dark-surface-panel/90 backdrop-blur border border-dark-border-base rounded-lg p-1 flex items-center shadow-xl">
                {[
                    { id: "select", icon: "arrow_selector_tool" },
                    { id: "pan", icon: "pan_tool" },
                    { id: "box", icon: "crop_free" }, // Using crop_free as simpler representation of box tool
                    { id: "polygon", icon: "pentagon" },
                ].map(tool => (
                    <button
                        key={tool.id}
                        onClick={() => setActiveTool(tool.id)}
                        className={cn(
                            "p-2 rounded hover:bg-dark-bg-base transition-colors",
                            activeTool === tool.id ? "bg-annotator-primary text-white" : "text-dark-text-secondary"
                        )}
                        title={tool.id}
                    >
                        <span className="material-symbols-outlined text-[20px]">{tool.icon}</span>
                    </button>
                ))}
                <div className="w-px h-4 bg-dark-border-base mx-2" />
                <button onClick={() => setZoom(z => Math.max(10, z - 10))} className="p-2 text-dark-text-secondary hover:text-dark-text-primary">
                    <span className="material-symbols-outlined text-[20px]">remove</span>
                </button>
                <span className="text-micro font-mono w-8 text-center">{zoom}%</span>
                <button onClick={() => setZoom(z => Math.min(200, z + 10))} className="p-2 text-dark-text-secondary hover:text-dark-text-primary">
                    <span className="material-symbols-outlined text-[20px]">add</span>
                </button>
            </div>

            <div className="flex-1 flex items-center justify-center p-8 overflow-auto">
                <div
                    className="relative bg-black shadow-2xl transition-transform duration-200 ease-out"
                    style={{ width: 800 * (zoom / 100), height: 600 * (zoom / 100) }}
                >
                    {/* Mock Image Placeholder */}
                    <div className="absolute inset-0 flex items-center justify-center text-dark-text-muted">
                        <div className="text-center">
                            <span className="material-symbols-outlined text-6xl opacity-20">image</span>
                            <p className="mt-2 text-sm opacity-40">Image Placeholder ({task.id})</p>
                        </div>
                    </div>

                    {/* Annotation Overlay (Mock) */}
                    <svg className="absolute inset-0 w-full h-full pointer-events-none">
                        {annotations.map(ann => (
                            <rect
                                key={ann.id}
                                x={`${(ann.x / 800) * 100}%`}
                                y={`${(ann.y / 600) * 100}%`}
                                width={`${(ann.w / 800) * 100}%`}
                                height={`${(ann.h / 600) * 100}%`}
                                fill="none"
                                stroke={CLASSES.find(c => c.id === ann.classId)?.color}
                                strokeWidth="2"
                                vectorEffect="non-scaling-stroke"
                            />
                        ))}
                    </svg>
                </div>
            </div>

            {/* Footer Actions */}
            <div className="h-14 border-t border-dark-border-base bg-dark-surface-panel flex items-center justify-between px-6">
                <div className="flex space-x-4 text-micro text-dark-text-muted">
                    <span><strong className="text-dark-text-primary">V</strong> Select</span>
                    <span><strong className="text-dark-text-primary">R</strong> Box</span>
                    <span><strong className="text-dark-text-primary">Space</strong> Pan</span>
                </div>
                <div className="flex space-x-3">
                    <Button variant="secondary" onClick={handleSave}>Save Draft</Button>
                    <Button variant="primary" onClick={handleSubmit}>Submit</Button>
                </div>
            </div>
        </>
    );

    // --- Right Column: Classes & Annotations ---
    const RightPanel = (
        <div className="flex flex-col h-full">
            <div className="p-4 border-b border-dark-border-base">
                <h4 className="text-micro font-extrabold uppercase tracking-wide text-dark-text-secondary mb-3">Classes</h4>
                <div className="grid grid-cols-2 gap-2">
                    {CLASSES.map(cls => (
                        <button key={cls.id} className="flex items-center space-x-2 px-2 py-1.5 rounded border border-dark-border-base hover:bg-dark-bg-canvas text-left">
                            <span className="w-3 h-3 rounded-full" style={{ background: cls.color }} />
                            <span className="text-xs font-medium truncate">{cls.name}</span>
                            <span className="text-[10px] text-dark-text-muted ml-auto">1</span>
                        </button>
                    ))}
                </div>
            </div>

            <div className="flex-1 overflow-y-auto p-4">
                <h4 className="text-micro font-extrabold uppercase tracking-wide text-dark-text-secondary mb-3">Annotations ({annotations.length})</h4>
                <div className="space-y-2">
                    {annotations.map((ann, i) => {
                        const cls = CLASSES.find(c => c.id === ann.classId);
                        return (
                            <div key={ann.id} className="p-3 rounded bg-dark-bg-canvas border border-dark-border-base flex items-center group hover:border-annotator-primary/50 transition-colors">
                                <span className="text-micro font-mono text-dark-text-muted w-6">#{i + 1}</span>
                                <div className="flex-1">
                                    <p className="text-xs font-bold" style={{ color: cls.color }}>{cls.name}</p>
                                    <p className="text-[10px] text-dark-text-muted">Box</p>
                                </div>
                                <button className="opacity-0 group-hover:opacity-100 text-dark-text-secondary hover:text-red-400">
                                    <span className="material-symbols-outlined text-[16px]">delete</span>
                                </button>
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    );

    return <Workspace3Column left={LeftPanel} center={CenterPanel} right={RightPanel} />;
}
