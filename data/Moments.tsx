import React, { ReactNode } from "react";

export type MomentProps = {
    title: string;
    content: string | ReactNode;
    date: string;
    author?: string;
    location?: string;
};

const moments: MomentProps[] = [
    {
        title: "关于博客的更新",
        content: "博客已迁移至 Docusaurus，欢迎访问！",
        date: "2025-07-27",
        author: "RicMoe",
    },
];

export default moments; 