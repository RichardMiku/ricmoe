import { ReactNode } from "react";

export type MomentProps = {
    title: string;
    content: string | ReactNode;
    date: string;
    author?: string;
    location?: string;
    style?: 'simple' | 'feed' | 'photo-centric' | 'minimal';
    image?: string;
    actions?: Array<{
        label: string;
        onClick?: () => void;
        href?: string;
        variant?: 'primary' | 'secondary' | 'outline';
    }>;
    avatar?: string;
    tags?: string[];
};

export type MomentCategory = {
    id: string;
    name: string;
    description?: string;
    moments: MomentProps[];
};
