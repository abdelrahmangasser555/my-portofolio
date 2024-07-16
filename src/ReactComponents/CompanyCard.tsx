import React from "react";
import { GlareCard } from "./acernityComponents/glareCard";
import { motion } from "framer-motion";

const companyContainerVariants = {
  hidden: { opacity: 0, y: 100 },
  visible: (index) => {
    return {
      opacity: 1,
      y: 0,
      transition: {
        delay: index * 0.2,
      },
    };
  },
};

type CompanyCardProps = {
  companyName?: string;
  image?: string;
  companyDescription?: string;
  companyLink?: string;
  index?: number;
};

export default function CompanyCard({
  companyName,
  image,
  companyDescription,
  companyLink,
  index = 1,
}: CompanyCardProps) {
  return (
    <motion.a
      href={companyLink}
      target="_blank"
      className="cursor-pointer"
      variants={companyContainerVariants}
      initial={"hidden"}
      whileInView={"visible"}
      viewport={{ amount: 0.5 }}
      custom={index}
      transition={{ type: "spring" }}
    >
      <GlareCard className="flex flex-col py-8 px-6">
        <div className="flex h-[50%] w-[100%] justify-center align-middle mb-5 justify-self-start">
          <img src={image} alt={companyName} className="h-[100%]" />
        </div>
        <div className="justify-self-end flex-1">
          <p className="font-bold text-white text-lg">{companyName}</p>
          <p className="font-normal text-base text-neutral-200 mt-1">
            {companyDescription}
          </p>
        </div>
      </GlareCard>
    </motion.a>
  );
}
