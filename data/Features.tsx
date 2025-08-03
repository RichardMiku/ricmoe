import clsx from "clsx";
import { ReactNode } from "react";

export type FeatureProps = {
    cheader: string | ReactNode;
    cbody: string | ReactNode;
    cfooter: string | ReactNode;
    };

const features: FeatureProps[] = [
    {
        cheader: (<h2>欢迎来到 RICMOE</h2>),
        cbody: (
        <>
            <h1 style={{ opacity: 0.6 }}>天赋异禀</h1>
        </>
        ),
        cfooter: (<h1>天赋异禀</h1>),
    },
    {
        cheader: (<h2>关于我</h2>),
        cbody: (
            <>
            <div className={clsx("AboutMe", "margin-horiz--none")}>
                <div className={clsx("title-1")}>你好，很高兴认识你👋</div>
                <div className={clsx("title-2","text--bold")} 
                style={{ fontSize: '2rem', marginTop: '-0.4rem', marginBottom: '-0.4rem' }}>
                    我是 Richard Miku
                </div>
                <div className={clsx("title-3")}>学生、设计师、开发者</div>
            </div>
            </>
        ),
        cfooter: (
            <>
                <button className="button button--primary button--outline" 
                onClick={() => window.open('/about', '_self')}>
                    About ➡️
                </button>
            </>
        ),
    },
    {
        cheader: (<h2>联系我</h2>),
        cbody: (<p>如果您对我们的文档或服务有任何疑问，请随时与我们联系。</p>),
        cfooter: (
            <>
                <div className="button-group button-group--block">
                    <button className="button button--primary button--outline" 
                    onClick={() => window.open('mailto:mail@ric.moe')}>
                        Email
                    </button>
                    <button 
                    className="button button--primary button--outline" 
                    onClick={() => window.open('https://github.com/RichardMiku')}>
                        <img className="margin-right--xs" src="/img/svg/github.svg" alt="GitHub" style={{ verticalAlign: '-0.15rem' }} />
                        GitHub
                    </button>
                    <button 
                    className="button button--primary button--outline" 
                    onClick={() => window.open('/feedback')}>
                        Feedback
                    </button>
                </div>
            </>
        ),
    },
];

export default features;