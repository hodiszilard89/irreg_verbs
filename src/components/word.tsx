import { Text } from '@chakra-ui/react'
import { AnimationControls, motion, Point, useAnimation, useMotionValue } from 'framer-motion'
import { useEffect, useRef } from 'react';


interface WordProps {
    word: string,
    // ref: React.RefObject<HTMLDivElement | null>,   

    dragEndHandle: (event: MouseEvent | TouchEvent | PointerEvent, info: any, control: AnimationControls, home: Point) => void;
}

export const Word = ({ word, dragEndHandle }: WordProps) => {
    const control = useAnimation()
    const homex = useMotionValue(0)
    const homey = useMotionValue(0)
    const ref: React.RefObject<HTMLDivElement | null> = useRef(null)
    useEffect(() => {
        homex.set(ref.current?.getBoundingClientRect().x ?? 0)
        homey.set(ref.current?.getBoundingClientRect().y ?? 0)
    }, [])

    return (
        <motion.div
            drag
            onDragEnd={(event, info) => dragEndHandle(event, info, control, {x:homex.get(), y:homey.get()})}
            ref={ref}
            dragMomentum={false}
            whileDrag={{ scale: 1 }} // Mozgatás alatt nincs változás
            animate={control}
            style={
                {
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    position: "relative",
                    height: "35px",
                    width: "190px",
                    borderRadius: '10px',
                    border: "blue, 2px, dashed ",

                }}
        >
            <Text>{word}</Text>

        </motion.div>
    )
}