import { Point } from "framer-motion"
import { distance } from "./distance"
import { getPointFromRef } from "./get-point-from-ref"
import { Field, Row } from "../pages/verbs"
import { createRef } from "react"

/**
 * 
 * @param box mozgatott komponenes
 * @param targets  referenci a tömb
 * @returns a referencia tömbből visszadja a legközelebbi Field típus elemet 
 */

export const getNextField = (box: Point, targets: Row[] ): Field   => {
    let field:Field={free:true, ref:createRef()}
    if (targets) {
        targets.forEach(target => {
            if (target.I_field.free && (distance(box, getPointFromRef(field.ref)) >= distance(box, getPointFromRef(target.I_field.ref)))) {
        
                field=target.I_field
            }

            if (target.II_field.free &&(distance(box, getPointFromRef(field.ref)) >= distance(box, getPointFromRef(target.II_field.ref)))) {
   
                field=target.II_field
            }

            if( target.III_field.free &&(distance(box, getPointFromRef(field.ref)) >= distance(box, getPointFromRef(target.III_field.ref)))) {
           
               field=target.III_field
            }
        }
        )
    }

    return (field)
}