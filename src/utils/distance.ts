import { Point } from "framer-motion"

/**
 * Kiszámítja két pont közötti euklideszi távolságot.
 * @param p1 Az első pont koordinátái.
 * @param p2 A második pont koordinátái.
 * @returns A két pont közötti távolság.
 */

export const distance = (p1: Point, p2: Point) => {
    const dist:number = Math.sqrt(Math.pow(p1.x - p2.x, 2) + Math.pow(p1.y - p2.y, 2));
    return dist;
  }