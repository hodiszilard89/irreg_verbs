
import { Point } from "framer-motion";

/**
 * a komponenes HOME kordinátájából és a TARGET-ből visszaadja a (0,0) hoz viszonyított elmozdulást
 * 
 * @param target - cél koordináta
 * @param home - a komponens eredeti helye
 * @returns Az elmozdulás { x, y } formában
*/
export const moveTo = (target: Point, home: Point): Point => {
    const x = Math.abs(target.x - home.x)
    const y = Math.abs(target.y - home.y)
    //1. negyed
    if (target.y <= home.y && target.x <= home.x) {
        return ({ x: -x, y: -y })
    }
    else
    //2.negyed
    if (target.y <= home.y && target.x >= home.x) {
        return ({ x: x, y: -y })
    }
    else 
    //3.negyed
    if (target.y <= home.y && target.x <= home.x) {
        return ({ x: x, y: y })
    }

    //4.negyed
    else if (target.y <= home.y && target.x <= home.x) {
        return ({ x: -x, y: y })
    }
    return (
        { x, y }
    )
}