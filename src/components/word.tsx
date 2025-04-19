import { Text } from '@chakra-ui/react'
import { AnimationControls, motion, Point, useAnimation, useMotionValue } from 'framer-motion'
import { useEffect } from 'react';


interface WordProps {
    word: string,
    id: number,
    //mezo?:Point | null
    ref: React.RefObject<HTMLDivElement | null>
    localref:React.RefObject<HTMLDivElement | null>
    dragEndHandle: (
        event: MouseEvent | TouchEvent | PointerEvent,
        info: any,
        control: AnimationControls,
        home: Point,
        id: number,
        referencia: React.RefObject<HTMLDivElement | null>,
      
        ) => void;
   onClick:(localref:React.RefObject<HTMLDivElement | null>, control: AnimationControls,ref:React.RefObject<HTMLDivElement | null>) =>void,
   dragStartHandle:(referencia:React.RefObject<HTMLDivElement | null>,
                    localref:React.RefObject<HTMLDivElement | null>) =>void
}

export const Word = ({ word, id, dragEndHandle, ref, localref, dragStartHandle, onClick }: WordProps) => {
    const control = useAnimation()
    const homex = useMotionValue(0)
    const homey = useMotionValue(0)
    //const mezo : Point | null = null
    //const ref: React.RefObject<HTMLDivElement | null> = useRef(null)
    useEffect(() => {
        if (ref) {
            homex.set(ref.current?.getBoundingClientRect().x ?? 0)
            homey.set(ref.current?.getBoundingClientRect().y ?? 0)
        }
    }, [])

    return (
        <motion.div
            drag
            onDragEnd={(event, info) => dragEndHandle(event, info, control, { x: homex.get(), y: homey.get() }, id, ref)}
            onDragStart={()=>dragStartHandle(ref, localref)}
            ref={ref}
            dragMomentum={false}
            whileDrag={{ scale: 1 }} // Mozgatás alatt nincs változás
            onDoubleClick={() =>onClick(localref, control, ref)}
            animate={control}
            style={
                {

                    gap: "10",
                    //display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    //alignItems: "center",
                    position: "relative",
                    height: "35px",
                    width: "200px",
                    borderRadius: '10px',
                    border: "blue, 2px, dashed ",

                }}
        >
            <Text>{word}</Text>

        </motion.div>
    )
}