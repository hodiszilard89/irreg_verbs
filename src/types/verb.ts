import { AnimationControls, Point } from "framer-motion";

export interface Word{
    word:string,
    ref:React.RefObject<HTMLDivElement | null> 
    targetRef:React.RefObject<HTMLDivElement|null>
    home?:Point
    control:AnimationControls
}

export interface Verb{
   I_alak:string,
   II_alak:Word,
   III_alak:Word,
   
}