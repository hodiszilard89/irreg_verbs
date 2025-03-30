import { useRef } from "react";
import { Word } from "../types/verb";
import { useAnimation } from "framer-motion";

export const createWord= ():Word=>({
    word:"",
    ref:useRef<HTMLDivElement>(null), 
    targetRef:useRef<HTMLDivElement>(null),
    
    control:useAnimation()
})