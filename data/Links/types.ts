import { ReactNode } from "react";

export type LinksProps = {
    name: string;
    description: string;
    avatarUrl: string;
    url: string;
    imageUrl?: string;
    tags?: string[];
    category: string;
    addedDate: string;
    status: 'active' | 'inactive' | 'archived';
    rating?: number; // 1-5 stars
    author?: string; // who added this link
};

export type LinksTagProps = {
    tagId: string;
    tagName: string | ReactNode;
    tagDescription: string | ReactNode;
    color?: string;
    icon?: string;
};

export type LinksCategoryProps = {
    id: string;
    name: string;
    description: string;
    icon: string;
    color: string;
};
