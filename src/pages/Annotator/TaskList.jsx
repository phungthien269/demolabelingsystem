import * as React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../../components/ui/Button";
import { Input } from "../../components/ui/Input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../../components/ui/Table";
import { BadgeStatus } from "../../components/ui/BadgeStatus";
import { TASKS } from "../../services/mockData";
import { useAuth } from "../../context/AuthContext";

const TABS = ["ALL", "TODO", "IN_PROGRESS", "REJECTED", "SUBMITTED", "APPROVED"];

export default function TaskList() {
    const navigate = useNavigate();
    const { user, logout } = useAuth();
    const [activeTab, setActiveTab] = React.useState("ALL");
    const [search, setSearch] = React.useState("");

    const filteredTasks = React.useMemo(() => {
        return TASKS.filter((task) => {
            const matchesTab = activeTab === "ALL" || task.status === activeTab;
            const matchesSearch = task.projectName.toLowerCase().includes(search.toLowerCase()) ||
                task.id.toLowerCase().includes(search.toLowerCase());
            return matchesTab && matchesSearch;
        });
    }, [activeTab, search]);

    const handleAction = (task) => {
        navigate(`/annotator/task/${task.id}`);
    };

    return (
        <div className="min-h-screen bg-dark-bg-base text-dark-text-primary p-6">
            {/* Sticky Header / Page Heading */}
            <div className="flex items-center justify-between mb-8 sticky top-0 z-10 bg-dark-bg-base/95 backdrop-blur py-4 border-b border-dark-border-base">
                <div>
                    <h1 className="text-h1 font-extrabold tracking-tight">My Tasks</h1>
                    <p className="text-dark-text-secondary text-sm mt-1">
                        Welcome back, <span className="text-annotator-primary font-bold">{user?.name}</span>.
                        You have {TASKS.filter(t => t.status === 'TODO' || t.status === 'IN_PROGRESS' || t.status === 'REJECTED').length} active tasks.
                    </p>
                </div>
                <div className="flex items-center space-x-4">
                    <Button variant="ghost" onClick={() => logout()} leftIcon="logout">Logout</Button>
                </div>
            </div>

            {/* Filter Bar */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                {/* Status Tabs */}
                <div className="flex items-center space-x-1 bg-dark-surface-panel p-1 rounded-lg border border-dark-border-base overflow-x-auto">
                    {TABS.map((tab) => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={`
                px-4 py-1.5 rounded-md text-xs font-bold uppercase tracking-wide transition-all whitespace-nowrap
                ${activeTab === tab
                                    ? 'bg-annotator-primary text-white shadow-sm'
                                    : 'text-dark-text-muted hover:text-dark-text-primary hover:bg-dark-surface-toolbar'}
              `}
                        >
                            {tab.replace("_", " ")}
                        </button>
                    ))}
                </div>

                {/* Search */}
                <div className="w-full md:w-64">
                    <Input
                        placeholder="Search tasks..."
                        leftIcon="search"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </div>
            </div>

            {/* Task List Table */}
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>ID</TableHead>
                        <TableHead>Project</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Last Updated</TableHead>
                        <TableHead>Priority</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {filteredTasks.map((task) => (
                        <TableRow key={task.id} onClick={() => handleAction(task)}>
                            <TableCell><span className="font-mono text-xs text-dark-text-secondary">{task.id}</span></TableCell>
                            <TableCell>
                                <div className="flex flex-col">
                                    <span className="font-medium">{task.projectName}</span>
                                    {/* Inline Reject Comment */}
                                    {task.status === 'REJECTED' && task.rejectComment && (
                                        <div className="mt-1 flex items-start text-red-400 text-xs bg-red-400/5 p-1.5 rounded border border-red-400/10">
                                            <span className="material-symbols-outlined text-[14px] mr-1.5 mt-0.5">warning</span>
                                            {task.rejectComment}
                                        </div>
                                    )}
                                </div>
                            </TableCell>
                            <TableCell>
                                <BadgeStatus status={task.status} />
                            </TableCell>
                            <TableCell>
                                <span className="text-dark-text-muted text-xs">
                                    {new Date(task.lastUpdated).toLocaleDateString()}
                                </span>
                            </TableCell>
                            <TableCell>
                                <span className={`text-xs font-bold ${task.priority === 'HIGH' ? 'text-orange-400' : 'text-dark-text-muted'}`}>
                                    {task.priority}
                                </span>
                            </TableCell>
                            <TableCell className="text-right">
                                {['TODO', 'REJECTED'].includes(task.status) && (
                                    <Button size="sm" variant="primary" onClick={(e) => { e.stopPropagation(); handleAction(task); }}>Start</Button>
                                )}
                                {task.status === 'IN_PROGRESS' && (
                                    <Button size="sm" variant="secondary" onClick={(e) => { e.stopPropagation(); handleAction(task); }}>Continue</Button>
                                )}
                                {['SUBMITTED', 'APPROVED'].includes(task.status) && (
                                    <Button size="sm" variant="ghost" onClick={(e) => { e.stopPropagation(); handleAction(task); }}>View</Button>
                                )}
                            </TableCell>
                        </TableRow>
                    ))}
                    {filteredTasks.length === 0 && (
                        <TableRow>
                            <TableCell className="text-center py-8 text-dark-text-muted" colSpan={6}>
                                No tasks found matching your filters.
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </div>
    );
}
