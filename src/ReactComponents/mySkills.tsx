import React from "react";
import { useScroll, motion, AnimatePresence } from "framer-motion";

const containerSkills = {
  hidden: { opacity: 0, y: 100 },
  vissible: (index) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: index * 0.05,
    },
  }),
};

type MySkillsProps = {
  skills?: string[];
  topText?: string;
  viewMoreText?: boolean;
  MyIcon?: any;
  iconList?: any;
};

export default function MySkills({
  skills = ["hello world"],
  topText = "My Skills",
  viewMoreText = false,
}: MySkillsProps) {
  return (
    <div className=" flex flex-col items-center justify-center mb-10">
      <div className="flex flex-wrap items-center justify-center">
        <h1 className="text-center">{topText}</h1>
      </div>
      <AnimatePresence>
        <ul className="flex flex-wrap align-middle justify-center mt-4">
          {skills.map((skill, index) => {
            return (
              <motion.li
                key={index}
                variants={containerSkills}
                initial="hidden"
                whileInView="vissible"
                viewport={{ amount: 0.5, once: true }}
                transition={{
                  type: "spring",
                  staggerChildren: 0.2,
                }}
                custom={index}
                className="m-2 sm:w-[30vw] sm:px-3 lg:w-[15%] text-[black] dark:text-white bg-slate-50 dark:bg-slate-800 hover:shadow-sm hover:shadow-slate-400 dark:hover:shadow-slate-700 rounded-lg p-2 text-center min-w-[fit-content] text-nowrap"
              >
                {skill}
              </motion.li>
            );
          })}

          {viewMoreText && (
            <motion.a
              href="/about#skills"
              className="text-center ml-5 flex justify-center items-center dark:text-white"
              variants={containerSkills}
              initial="hidden"
              whileInView="vissible"
              viewport={{ amount: 0.5, once: true }}
              transition={{
                type: "spring",
                staggerChildren: 0.2,
              }}
              custom={20}
            >
              View More skills
            </motion.a>
          )}
        </ul>
      </AnimatePresence>
    </div>
  );
}
