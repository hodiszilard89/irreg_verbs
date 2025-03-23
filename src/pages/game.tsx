import { Box } from "@chakra-ui/react";
import { motion, PanInfo, Point, useAnimation, useMotionValue } from "framer-motion";
import { useState, FC } from "react";
import { Verbs } from "./verbs";
import { MotionValue } from "framer-motion/dom";
import { useTransform } from "framer-motion";



export const Game = () => {
    const distance = (p1: Point, p2: Point) => {
        const dist = Math.sqrt(Math.pow(p1.x - p2.x, 2) + Math.pow(p1.y - p2.y, 2));
        return dist;
    }

    const x = useMotionValue(0);
    const y = useMotionValue(0);
    const start: Point = { x: 0, y: 0 }
    const controls = useAnimation();
    const target: Point = { x: 100, y: 100 };

    const snapToB = (event: MouseEvent) => {
        const element = event.target as HTMLElement
        const rec = element.getBoundingClientRect();
        const point = { x: rec.x, y: rec.y }
        if (distance(point, target) < 50)
            controls.start({ x: target.y, y: target.x })
        else
            controls.start({ x: start.x, y: start.y })
        console.log(point);
    };

    const handleMouseEnter = (event: React.MouseEvent<HTMLDivElement>) => {
        const rect = event.currentTarget.getBoundingClientRect();
        console.log("DOM pozíció:", rect.left, rect.top);
    };

    return (
        <Verbs />
        // <>
        //     <motion.div
        //         drag
        //         dragMomentum={false}
        //         dragConstraints={{ left: -200, right: 200, top: -200, bottom: 200 }}
        //         animate={controls}
        //         style={{

        //             position: "absolute",
        //             left: x,
        //             top: y,
        //             backgroundColor: "red",
        //             width: 100,
        //             height: 100,
        //         }}
        //         onDragEnd={snapToB} // Ha elengeded, odaugrik B ponthoz
        //         onMouseEnter={handleMouseEnter}
        //     />
        //     <div style={{
        //         zIndex: "-1",
        //         position: "absolute",
        //         height: "35px",
        //         width: "230px",
        //         borderRadius: '10px',
        //         top: target.y,
        //         left: target.x,
        //         border: "white, 2px, solid"

        //     }} />
        // </>
    );
}
// const dragX = useMotionValue<number>(0);
// const dragY = useMotionValue<number>(0);

// const [position, setPosition] = useState<Point>({ x: 0, y: 0 });
// const target: Point = { x: 100, y: 100 };
// const distance = (p1: Point, p2: Point) => {
//     const dist = Math.sqrt(Math.pow(p1.x - p2.x, 2) + Math.pow(p1.y - p2.y, 2));
//     return dist;
// }

// const handleDragEnd = (event: MouseEvent) => {
//     const rec = event.target as HTMLElement;
//     const point: Point = { x: rec.getBoundingClientRect().x, y: rec.getBoundingClientRect().y }
//     if (distance({x:dragX.get(),y:dragY.get()}, target) < 50) { dragX.set(target.x), dragY.set(target.y) }
//     else
//     {
//         dragX.set(point.x)
//         dragY.set(point.y)
//     }
//     console.log(dragX.get())

// };
// const handleMouseEnter = (event: React.MouseEvent<HTMLDivElement>) => {
//     const rect = event.currentTarget.getBoundingClientRect();
//     console.log("DOM pozíció:", rect.left, rect.top);
// };
// return (
//     <>
//         <motion.div
//             drag
//             dragMomentum={false}
//             onDragEnd={(event, info) => {
//                 console.log("Drag ended:", info.point.x, info.point.y);
//                 console.log(dragX)
//             }}
//             onDragEnd={handleDragEnd}
//             style={{
//                 border: "2px, white solid",
//                 borderRadius: "10px",
//                 width: "240px",
//                 height: "40px",
//                 position: "absolute",
//                 top: dragY,
//                 left: dragX
//             }
//             }>
//         </motion.div>
//         <div style={{
//             zIndex:"-1",
//             position: "absolute",
//             height: "35px",
//             width: "230px",
//             borderRadius: '10px',
//             top:"100px",
//             left:"100px",
//             border: "white, 2px, solid"

//         }}  ></div>
//         Pozíció: {dragX.get().toFixed(1)}, {dragY.get().toFixed(1)}

//     </>
// );

