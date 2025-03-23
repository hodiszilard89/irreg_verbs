import { SimpleGrid, Box, Text, Flex } from '@chakra-ui/react'
//import { pointerWithin } from '@dnd-kit/core';
import { motion, Point, useAnimation, useMotionValue } from 'framer-motion'
import { useEffect, useRef } from 'react';


export const Verbs = () => {



  //Point visszadó fv újrahasználható meg kell tartani
  const getPointFromRef = (ref: React.RefObject<HTMLElement | null>): Point => {
    if (!ref?.current) {
      return { x: 0, y: 0 }; // Ha nincs érvényes ref, visszaadunk null értékeket
    }
    const rect = ref.current?.getBoundingClientRect();
    return { x: rect?.x ?? 0, y: rect?.y ?? 0 };
  };


  const minX = useMotionValue(0)
  const minY = useMotionValue(0)
  const homeX = useMotionValue(0);
  const homeY = useMotionValue(0);

  const targX = useMotionValue(0);
  const targY = useMotionValue(0);

  const control = useAnimation();
  let targets: React.RefObject<null>[] = []
  const boxRef = useRef(null);

  for (let i = 0; i < 2; i++) {
    targets[i] = useRef(null)
  }

  //célok és kezdő pozicíő mentése
  useEffect(() => {

    if (boxRef.current) {
      homeX.set((boxRef.current as any).getBoundingClientRect().x)
      homeY.set((boxRef.current as any).getBoundingClientRect().y)
    }
    
  }, [])

  const distance = (p1: Point, p2: Point) => {
    const dist = Math.sqrt(Math.pow(p1.x - p2.x, 2) + Math.pow(p1.y - p2.y, 2));
    return dist;
  }

  const handelDragEnd = () => {
    const min = { x: 0, y: 0 };
    // const d=0;

    if ( boxRef.current) {
      minX.set(targets[0].current?.getBoundingClientRect().x ?? 0)
      minY.set(targets[0].current?.getBoundingClientRect().y ?? 0)

      targets.slice(1).forEach(point => {
        if (point.current &&
          (distance(getPointFromRef(point), getPointFromRef(boxRef)) < distance({ x: minX.get(), y: minY.get() }, getPointFromRef(boxRef)))) {
          minX.set(point.current.getBoundingClientRect().x)
          minY.set(point.current.getBoundingClientRect().y)
        }
      })
      

      if (distance({ x: minX.get(), y: minY.get() }, getPointFromRef(boxRef)) < 100) {
        targX.set(Math.abs(minX.get() - homeX.get()))
        targY.set(Math.abs(minY.get() - homeY.get()))
      }
      else {
        targX.set(0)
        targY.set(0)
      }
    }


    control.start({ x: targX.get(), y: targY.get(), scale: [1, 1.2, 1], transition: { duration: 0.3 } });
  }




  return (
    <Flex gap={10}>
          <SimpleGrid columns={2} p={4} gap={30} style={{ border: "yellow, 2px, solid " }}>
      

      {
                targets.map((target,index) => {
                  //return
                  return (
                    <Box
                      key={index}
                      ref={target}
                      style={
                        {
                          
                          justifyItems:"initial",
                          zIndex: -1,
                          position: "relative",
                          height: "35px",
                          width: "230px",
                          borderRadius: '10px',
                          border: "white, 2px, solid ",
                        }}
                    ><Text> {index}. válasz</Text>
                    </Box>
                  )
                })
      }
      

    </SimpleGrid>
    <motion.div
        drag
        ref={boxRef}
        dragMomentum={false}
        whileDrag={{ scale: 1 }} // Mozgatás alatt nincs változás
        onDragEnd={handelDragEnd}
        onClick={(event) => {
         
          control.start({x:0, y:0, transition: { duration: 0.3 }})
        }}
        animate={control}
        style={
          {

            position: "relative",
            height: "35px",
            width: "230px",
            borderRadius: '10px',
            border: "blue, 2px, dashed ",

          }}
      >
      </motion.div>
    </Flex>

  );
}
