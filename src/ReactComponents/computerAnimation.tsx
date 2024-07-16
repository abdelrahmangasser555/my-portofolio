import React from "react";
import { MacbookScroll } from "./acernityComponents/computerAnimation";
import { MdComputer } from "react-icons/md";
import imageDash from "../../public/assets/hackingImage.png";
import shorse from "../../public/assets/shorse.png";
import { motion } from "framer-motion";
export function MacbookScrollDemo() {
  return (
    <div className="overflow-hidden ">
      <MacbookScroll
        title={
          <span>
            I <span className="text-red-500">Love</span> Web Development
            <MdComputer className="inline-block ml-2" />
          </span>
        }
        badge={
          <a href="https://peerlist.io/manuarora">
            <Badge className=" w-[5vw] transform -rotate-12 " />
          </a>
        }
        src={imageDash.src}
        showGradient={false}
      />
    </div>
  );
}
// Peerlist logo
const Badge = ({ className }: { className?: string }) => {
  return (
    <motion.img
      src={shorse.src}
      alt="Peerlist"
      className={className}
      initial={{ scale: 0, rotate: 40 }}
      whileInView={{ scale: 1, rotate: -20 }}
      transition={{ duration: 1.5, type: "spring" }}
      style={{ borderRadius: "10px", padding: "0px" }}
    />
  );
};
