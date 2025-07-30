import { ReactNode } from "react";

export const LinksTagsSwitch : boolean = false;

export const links: LinksProps[] = [
    {
        name: "Newbe36524",
        description: "Now, everyone will be excellent!",
        avatarUrl: "/img/Links/friends/newbe36524.svg",
        url: "https://newbe.pro",
        tags: ["friends"],
    },
    {
        name:"New Year Countdown",
        description: "A simple countdown to the new year.",
        avatarUrl: "https://images.unsplash.com/photo-1467810563316-b5476525c0f9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1349&q=80",
        url: "https://new.ricpro.link",
        tags: ["toys"],
    },
    {
        name: "Docusaurus",
        description: "一个用于轻松构建、部署和维护开源项目网站的静态站点生成器。",
        avatarUrl: "/img/docusaurus.png",
        url: "https://docusaurus.io/",
        tags: ["tools"],
    }
]

export type LinksProps = {
    name: string;
    description: string;
    avatarUrl: string;
    url: string;
    imageUrl?: string;
    tags?: string[];
};

export type LinksTagProps = {
    tagId: string;
    tagName: string | ReactNode;
    tagDescription: string | ReactNode;
};

export const linkTags: LinksTagProps[] = [
    {
        tagId: "friends",
        tagName: "🪶Friends",
        tagDescription: "Links of Friends"
    },
    {
        tagId: "tools",
        tagName: "🪶Tools",
        tagDescription: "Links of Tools"
    },
    {
        tagId: "toys",
        tagName: "🔫Toys",
        tagDescription: "Links of Toys"
    }
]