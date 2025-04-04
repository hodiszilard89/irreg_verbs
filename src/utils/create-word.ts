import { useRef } from "react";

import {  useAnimation } from "framer-motion";
import { Word } from "../pages/verbs";

export const createWord= (word:string):Word=>{
   const control=useAnimation()
   return (
    {word,control:control}
)
}