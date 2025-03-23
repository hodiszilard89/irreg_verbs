import { motion, Point, useAnimation } from "framer-motion";
import { useState } from "react";

const DragTransitionExample = () => {
  const [isDragging, setIsDragging] = useState(false);
  const snapPosition = 200; // Y tengelyen a célpozíció
  const threshold = 50; // Küszöbérték a pozíció közelébe ugráshoz
  const controls = useAnimation();
  const target: Point = { x: 100, y: 100 }

  const distance = (p1: Point, p2: Point) => {
    const dist = Math.sqrt(Math.pow(p2.x - p1.x, 2) + Math.pow(p2.y - p1.y, 2))
    return dist
  }

  return (
    <>
      <motion.div
        drag
        //  dragConstraints={{ left: -100, right: 100, top: -100, bottom: 100 }}
        dragElastic={0.2}
        onDragStart={() => setIsDragging(true)}
        onDragEnd={(event, info) => {
          setIsDragging(false);
          // if (Math.abs(info.point.y - snapPosition) < threshold) {
          //   // Ha közel van a célhoz, odaugrik
          //   info.point.y = snapPosition;
          // }
          if (distance({x:info.point.x,y:info.point.y},target)<50){
            console.log("lefut")
            console.log("info",info)
            controls.start({x:100,y:100})
            // info.point.x=target.x
            // info.point.y=target.y
          }
        }}
        animate={{ scale: isDragging ? 1.2 : 1, y: isDragging ? undefined : snapPosition }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        style={{
          width: 100,
          height: 100,
          backgroundColor: "blue",
          borderRadius: 20,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "white",
          fontWeight: "bold",
        }}
      >
        Drag Me
      </motion.div>
      <div style={{
        position:"absolute",
        width:"230px",
        height:"35px",
        borderRadius:"10px",
        border:"solid 2px white",
        top:"100px",
        left:"100px"          
      }}
      ></div>
    </>
  );
};

export default DragTransitionExample;