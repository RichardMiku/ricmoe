import features, { FeatureProps } from "@site/data/Features";
import { ReactNode } from "react";
import { motion, Variants } from "framer-motion";

const variants: Variants = {
  visible: i => ({
    opacity: 1,
    y: 0,
    transition: {
      type: 'spring',
      damping: 25,
      stiffness: 100,
      duration: 0.1,
      delay: i * 0.1,
    },
  }),
  hidden: { opacity: 0, y: 30 },
}

export default function HomepageFeatures(): ReactNode {
  return (
    <div className="container">
      <div className='row margin-top--md'>
        {features.map((feature, index) => (
          <FutureCards key={index} {...feature} CustomeIdx={index + 1} />
        ))}
      </div>
    </div>
  );
}

function FutureCards({cheader, cbody, cfooter, CustomeIdx}: FeatureProps & { CustomeIdx: number }) : ReactNode {
  return (
    <motion.div 
      className="col col--4 margin-vert--md" 
      variants={variants}
      custom={CustomeIdx}
      initial="hidden"
      animate="visible">
      <div className="card shadow--md">
        <div className="card__header">
          {cheader}
        </div>
        <div className="card__body">
          {cbody}
        </div>
        { CustomeIdx === 2 ? (
          <div className="card__footer text--right">
          {cfooter}
          </div>) : (
            <div className="card__footer">
              {cfooter}
            </div>)}
      </div>
    </motion.div>
  );
}