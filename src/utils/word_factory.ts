import { createRef } from "react";
import { RawWord, Word } from "../pages/verbs";


export const WordFactory = (rawWordArray: RawWord[]): Word[] => {
    const wordArray: Word[] = []
    rawWordArray.map((rawwordline) => {
        wordArray.push({
            ref: createRef(),
            word: rawwordline.I_form,
            form:1,
            id: rawwordline.id
        })
        wordArray.push({
            ref: createRef(),
            word: rawwordline.II_form,
            form:2,
            id: rawwordline.id
            
        })
        wordArray.push({
            ref: createRef(),
            word: rawwordline.III_form,
            form:3,
            id: rawwordline.id
        })
    })
    return wordArray
}