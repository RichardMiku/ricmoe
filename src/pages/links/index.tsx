import Layout from "@theme/Layout";
import { ReactNode } from "react";
import { Variants, motion } from "framer-motion";
import { links, LinksProps, linkTags, LinksTagsSwitch } from "@site/data/Links";
import styles from "./styles.module.css";
import clsx from "clsx";

function LinksFriendsCard({ name, description, avatarUrl, url, imageUrl }: LinksProps) : ReactNode {
    return (
        <div className="col col--4">
            <div className="card-friend">
                <div className="card shadow--md">
                    <div className="card__header">
                    <div className="avatar">
                        <img
                        className="avatar__photo"
                        src={avatarUrl} />
                        <div className="avatar__intro">
                        <div className="avatar__name">{name}</div>
                        <small className="avatar__subtitle">
                            {description}
                        </small>
                        </div>
                    </div>
                    </div>
                    <div className="card__image">
                    {imageUrl && (
                        <img
                        className="card__image--friend"
                        src={imageUrl}
                        alt={`${name}'s link image`}
                        />
                    )}
                    </div>
                    <div className="card__footer text--right">
                        <button className="button button--outline button--primary">
                            <a href={url} target="_blank" rel="noopener noreferrer">
                                Visit
                            </a>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

function LinksPageFriends() : ReactNode {
    return (
        <div className="container" style={{ marginTop: '2rem', marginBottom: '2rem' }}>
            {LinksTagsSwitch ? (
                linkTags.map((tag, idx) => (
                    <div key={idx} className="margin-bottom--lg">
                        <div className={clsx(styles.LinksTagsContainer, "margin-bottom--md")}>
                            <div className={clsx(styles.LinksTagItem, "text--bold")}
                                style={{ fontSize: "1.5rem" }}>{tag.tagName}</div>
                            <div className={styles.LinksTagItem}>{tag.tagDescription}</div>
                        </div>
                        <div className="row">
                            {links
                                .filter(link => link.tags?.includes(tag.tagId))
                                .map((link, idx) => (
                                    <LinksFriendsCard key={idx} {...link} />
                                ))}
                        </div>
                    </div>
                ))
            ) : (
                <div className="row">
                    {links.map((link, idx) => (
                        <LinksFriendsCard key={idx} {...link} />
                    ))}
                </div>
            )}
        </div>
    );
}

const variants: Variants = {
  visible: i => ({
    opacity: 1,
    y: 0,
    transition: {
      type: 'spring',
      damping: 25,
      stiffness: 100,
      duration: 0.3,
      delay: i * 0.3,
    },
  }),
  hidden: { opacity: 0, y: 30 },
}

function LinksPageHeader() : ReactNode {
    return (
        <header className="hero">
            <motion.div 
            className="container text--center"
            custom={0}
            variants={variants}
            initial="hidden"
            animate="visible">
                <h1 className="hero__title">🔗Links</h1>
                <p className="hero__subtitle">Links to my friends and other useful resources.</p>
            </motion.div>
        </header>
    );
}

export default function LinksPage() : ReactNode {
    return (
        <Layout title="Links" description="Links to my friends and other useful resources.">
            <LinksPageHeader />
            <LinksPageFriends />
        </Layout>
    );
}