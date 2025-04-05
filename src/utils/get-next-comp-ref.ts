import { Point } from "framer-motion"
import { distance } from "./distance"
import { getPointFromRef } from "./get-point-from-ref"
import { Row } from "../pages/verbs"
import { useRef } from "react"
/**
 * 
 * @param box mozgatott komponenes
 * @param targets  referenci a tömb
 * @returns a referenica tömbből melyik van hozzá a legközelebb 
 */

export const getNextCompRef = (box: Point, targets: Row[] ): React.RefObject<HTMLDivElement|null>   => {
    let next: Point = { x: 0, y: 0 }
    let ref:React.RefObject<HTMLDivElement|null>=targets[0].I_ref ?? useRef(null)
    if (targets) {
        next = getPointFromRef(targets[0].I_ref) || { x: 0, y: 0 };

        targets.forEach(target => {
            if (distance(box, next) >= distance(box, getPointFromRef(target.I_ref))) {
                next = getPointFromRef(target.I_ref)
                ref=target.I_ref
            }

            if (distance(box, next) >= distance(box, getPointFromRef(target.II_ref))) {
                next = getPointFromRef(target.II_ref)
                ref=target.II_ref
            }

            if (distance(box, next) >= distance(box, getPointFromRef(target.III_ref))) {
                next = getPointFromRef(target.III_ref)
                ref=target.III_ref
            }
        }
        )
    }
    console.log("box", box)
    console.log( "next :", next)
    console.log(distance(box, next))
    return (ref)
}