import React from "react";
import { MacbookScroll } from "./acernityComponents/computerAnimation";
import { MdComputer } from "react-icons/md";
import imageDash from "../../public/assets/fakeDashboard.png";
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
            <Badge className="h-10 w-10 transform -rotate-12" />
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
  return <h1 className="text-[1rem]">Shorse</h1>;
};
