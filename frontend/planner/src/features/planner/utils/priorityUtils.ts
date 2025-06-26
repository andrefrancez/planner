export const PRIORITIES = {
    HIGH: 'HIGH',
    MEDIUM: 'MEDIUM',
    LOW: 'LOW',
} as const;

export type Priority = keyof typeof PRIORITIES;

type PriorityConfig = {
    label: string;
    color: string;
    hoverColor: string;
    dotColor: string;
    taskBorder: string;
    taskBackground: string;
    completedBorder: string;
    completedBackground: string;
};

export const priorityConfig: Record<Priority, PriorityConfig> = {
    HIGH: {
        label: 'Alta',
        color: '#fee2e2',
        hoverColor: '#fecaca',
        dotColor: '#ef4444',
        taskBorder: '#fecaca',
        taskBackground: '#fef2f2',
        completedBorder: '#fca5a5',
        completedBackground: '#fee2e2',
    },
    MEDIUM: {
        label: 'Média',
        color: '#fef3c7',
        hoverColor: '#fde68a',
        dotColor: '#f59e0b',
        taskBorder: '#fcd34d',
        taskBackground: '#fffbeb',
        completedBorder: '#facc15',
        completedBackground: '#fef3c7',
    },
    LOW: {
        label: 'Baixa',
        color: '#f3f4f6',
        hoverColor: '#e5e7eb',
        dotColor: '#9ca3af',
        taskBorder: '#e5e7eb',
        taskBackground: '#f9fafb',
        completedBorder: '#d1d5db',
        completedBackground: '#f3f4f6',
    },
};

export const getPriorityConfig = (priority: Priority): PriorityConfig =>
    priorityConfig[priority];

export const priorityOrder: Priority[] = [
    'HIGH',
    'MEDIUM',
    'LOW'
];