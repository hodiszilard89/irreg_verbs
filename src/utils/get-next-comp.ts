import { Point } from "framer-motion"
import { distance } from "./distance"
import { getPointFromRef } from "./get-point-from-ref"
import { Row } from "../pages/verbs"
/**
 * 
 * @param box mozgatott komponenes
 * @param targets  referenci a tömb
 * @returns a referenica tömbből melyik van hozzá a legközelebb 
 */

export const getNextComp = (box: Point, targets: Row[] | null): Point => {
    let next: Point = { x: 0, y: 0 }
    if (targets) {
        next = getPointFromRef(targets[0].I_ref) || { x: 0, y: 0 };

        targets.forEach(target => {
            if (distance(box, next) >= distance(box, getPointFromRef(target.I_ref))) {
                next = getPointFromRef(target.I_ref)
            }

            if (distance(box, next) >= distance(box, getPointFromRef(target.II_ref))) {
                next = getPointFromRef(target.II_ref)
            }

            if (distance(box, next) >= distance(box, getPointFromRef(target.III_ref))) {
                next = getPointFromRef(target.III_ref)
            }
        }
        )
    }
    console.log(distance(box, next))
    return (next)
}