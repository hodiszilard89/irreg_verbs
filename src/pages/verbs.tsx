import { SimpleGrid, Box, Text, Flex, Button } from '@chakra-ui/react'
//import { pointerWithin } from '@dnd-kit/core';
import { motion, Point, useAnimation, useMotionValue } from 'framer-motion'
import React, { useEffect, useRef, useState } from 'react';
import { Verb, Word } from '../types/verb';
import { createWord } from '../utils/create-word';


export const Verbs = () => {
  //igék
  const igek: Verb[] = [{
    I_alak: "see",
    II_alak: {
      word: "seem",
      ref: useRef<HTMLDivElement>(null),
      targetRef: useRef<HTMLDivElement>(null),
      control: useAnimation()
    },
    III_alak: {
      word: "seen",
      ref: useRef<HTMLDivElement>(null),
      targetRef: useRef<HTMLDivElement>(null),
      control: useAnimation()
    }
  },
  {
    I_alak: "arise",
    II_alak: {
      word: "arose",
      ref: useRef<HTMLDivElement>(null),
      targetRef: useRef<HTMLDivElement>(null),
      control: useAnimation()
    },
    III_alak: {
      word: "arisen",
      ref: useRef<HTMLDivElement>(null),
      targetRef: useRef<HTMLDivElement>(null),
      control: useAnimation()
    }
  },
  {
    I_alak: "awake",
    II_alak: {
      word: "awoke",
      ref: useRef<HTMLDivElement>(null),
      targetRef: useRef<HTMLDivElement>(null),
      control: useAnimation()
    },
    III_alak: {
      word: "awoken",
      ref: useRef<HTMLDivElement>(null),
      targetRef: useRef<HTMLDivElement>(null),
      control: useAnimation()
    }
  },
  {
    I_alak: "be",
    II_alak: {
      word: "was/were",
      ref: useRef<HTMLDivElement>(null),
      targetRef: useRef<HTMLDivElement>(null),
      control: useAnimation()
    },
    III_alak: {
      word: "been",
      ref: useRef<HTMLDivElement>(null),
      targetRef: useRef<HTMLDivElement>(null),
      control: useAnimation()
    }
  },
  {
    I_alak: "bear",
    II_alak: {
      word: "bore",
      ref: useRef<HTMLDivElement>(null),
      targetRef: useRef<HTMLDivElement>(null),
      control: useAnimation()
    },
    III_alak: {
      word: "borne/born",
      ref: useRef<HTMLDivElement>(null),
      targetRef: useRef<HTMLDivElement>(null),
      control: useAnimation()
    }
  }]

  //Point visszadó fv újrahasználható meg kell tartani
  const getPointFromRef = (ref: React.RefObject<HTMLDivElement | null>): Point => {
    if (!ref?.current) {
      return { x: 0, y: 0 }; // Ha nincs érvényes ref, visszaadunk null értékeket
    }
    const rect = ref.current?.getBoundingClientRect();
    return { x: rect?.x ?? 0, y: rect?.y ?? 0 };
  };



  const getItem = (ref: React.RefObject<HTMLElement>): Verb | null => {
    return igek.find((ige) => ige.II_alak.ref === ref) ?? null
  }



  const minX = useMotionValue(0)
  const minY = useMotionValue(0)
  const targX = useMotionValue(0);
  const targY = useMotionValue(0);
  let box: Word = igek[0].II_alak
  const control = useAnimation();
  // let targets: React.RefObject<null>[] = []
  // const boxRef1 = useRef(null);
  // const boxRef2 = useRef(null);
  //const [box, setBox] = useState<Word>(createWord())


  for (let i = 0; i < igek.length; i++) {
    igek[i].II_alak.ref = useRef<HTMLDivElement>(null)

    igek[i].III_alak.ref = useRef<HTMLDivElement>(null)
  }

  //célok és kezdő pozicíő mentése
  useEffect(() => {
    igek.forEach((item) => {
      if (item.II_alak.ref?.current) {
        item.II_alak.home = getPointFromRef(item.II_alak.ref)
        item.III_alak.home = getPointFromRef(item.III_alak.ref)
      }
    })

  }, [])

  const distance = (p1: Point, p2: Point) => {
    const dist = Math.sqrt(Math.pow(p1.x - p2.x, 2) + Math.pow(p1.y - p2.y, 2));
    return dist;
  }




  const handelDragEnd = (event: MouseEvent | TouchEvent | PointerEvent, index: number, info: any) => {
    console.log("index: ",index)
    const target = event.target as HTMLDivElement
    // const verb = igek.find((item) =>
    //   item.II_alak.ref.current === target ||
    //   item.III_alak.ref.current === target)
    let verb = igek[index]
    console.log("verb ", verb)
    console.log("target ", target.getBoundingClientRect() )
    if (verb.II_alak.ref.current === target) {
      console.log("2.alak")
      //setBox(verb?.II_alak)
      box = verb.II_alak
    }
    if (verb.III_alak.ref.current === target) {
      box = verb.III_alak
      console.log("3.alak")
    }
    //setBox(verb?.III_alak)

    // console.log(event)
    // console.log(box.word)
    // console.log(igek.length)
    // if (igek[index].II_alak.ref.current) {
    //   console.log("current 2.alak")
    //   box = igek[index].II_alak
    // }
    // if (igek[index].III_alak.ref.current) {
    //   console.log("current 3.alak")
    //   box = igek[index].III_alak
    // }


    // minX.set(igek[0].II_alak.targetRef?.current?.getBoundingClientRect().x ?? 0)
    // minY.set(igek[0].II_alak.targetRef?.current?.getBoundingClientRect().y ?? 0)

    // //const item = 

    // if (distance({ x: minX.get(), y: minY.get() }, getPointFromRef(box.ref)) >
    //   distance(getPointFromRef(igek[0].III_alak.targetRef), getPointFromRef(box.ref))) {
    //   minX.set(igek[0].III_alak.targetRef.current?.getBoundingClientRect().x ?? 0)
    //   minY.set(igek[0].III_alak.targetRef.current?.getBoundingClientRect().y ?? 0)

    minX.set(getPointFromRef(box.targetRef).x)
    minX.set(getPointFromRef(box.targetRef).y)

    igek.forEach(point => {
      if ((distance(getPointFromRef(point.II_alak.targetRef), getPointFromRef(box.ref)) <
        distance({ x: minX.get(), y: minY.get() }, getPointFromRef(box.ref)))) {
        minX.set(point.II_alak.targetRef.current?.getBoundingClientRect().x ?? 0)
        minY.set(point.II_alak.targetRef.current?.getBoundingClientRect().y ?? 0)
      }
      if ((distance(getPointFromRef(point.III_alak.targetRef), getPointFromRef(box.ref)) <
        distance({ x: minX.get(), y: minY.get() }, getPointFromRef(box.ref)))) {
        minX.set(point.III_alak.targetRef.current?.getBoundingClientRect().x ?? 0)
        minY.set(point.III_alak.targetRef.current?.getBoundingClientRect().y ?? 0)
      }
    })

    if (distance({ x: minX.get(), y: minY.get() }, getPointFromRef(box.ref)) < 50) {
      console.log(box.home)
      //1 negyed
      if (minY.get() <= (box.home?.y ?? 0) && minX.get() <= (box.home?.x ?? 0)) {
        targX.set(-Math.abs(minX.get() - (box.home?.x ?? 0)))
        targY.set(-Math.abs(minY.get() - (box.home?.y ?? 0)))
      }
      //2.negyed
      if (minY.get() <= (box.home?.y ?? 0) && minX.get() >= (box.home?.x ?? 0)) {
        targX.set(Math.abs(minX.get() - (box.home?.x ?? 0)))
        targY.set(-Math.abs(minY.get() - (box.home?.y ?? 0)))
      }
      //3.negyed
      if (minY.get() >= (box.home?.y ?? 0) && minX.get() >= (box.home?.x ?? 0)) {
        targX.set(Math.abs(minX.get() - (box.home?.x ?? 0)))
        targY.set(Math.abs(minY.get() - (box.home?.y ?? 0)))
      }
      //4.negyed
      if (minY.get() >= (box.home?.y ?? 0) && minX.get() <= (box.home?.x ?? 0)) {
        targX.set(-Math.abs(minX.get() - (box.home?.x ?? 0)))
        targY.set(Math.abs(minY.get() - (box.home?.y ?? 0)))
      }
    }
    else {
      targX.set(0)
      targY.set(0)
    }

    box?.control.start({ x: targX.get(), y: targY.get() })
  }

  return (
    <SimpleGrid gap={10}>
      <Flex gap={10} position={"relative"} display={"fixed"} justifyContent={"center"}>
        <SimpleGrid p={4} gap={5} style={{ border: "yellow, 2px, solid " }}>
          <Text>I alak</Text>
          {
            igek.map((ige, index, value) => {
              //return
              return (
                <Box
                  key={index}
                  style={
                    {
                      justifyItems: "initial",
                      zIndex: -1,
                      position: "relative",
                      height: "35px",
                      width: "200px",
                      borderRadius: '10px',
                      border: "white, 2px, solid ",
                    }}
                ><Text> {ige.I_alak}</Text>
                </Box>
              )
            })
          }
        </SimpleGrid>
        <SimpleGrid p={4} gap={30} style={{ border: "yellow, 2px, solid " }}>
          <Text>II alak</Text>
          {
            igek.map((ige, index, value) => {
              //return
              return (
                <Box
                  key={index}
                  ref={ige.II_alak.targetRef}
                  style={
                    {

                      justifyItems: "initial",
                      zIndex: -1,
                      position: "relative",
                      height: "35px",
                      width: "200px",
                      borderRadius: '10px',
                      border: "white, 2px, solid ",
                    }}
                ><Text> </Text>
                </Box>
              )
            })
          }
        </SimpleGrid>
        <SimpleGrid p={4} gap={30} style={{ border: "yellow, 2px, solid " }}>
          <Text>II alak</Text>
          {
            igek.map((ige, index, value) => {
              //return
              return (
                <Box
                  key={index}
                  ref={ige.III_alak.targetRef}
                  style={
                    {

                      justifyItems: "initial",
                      zIndex: -1,
                      position: "relative",
                      height: "35px",
                      width: "200px",
                      borderRadius: '10px',
                      border: "white, 2px, solid ",
                    }}
                ><Text></Text>
                </Box>
              )
            })
          }
        </SimpleGrid>

      </Flex>
      <SimpleGrid border={"green solid 2px"} columns={6} gap={3} >
        {
          igek.map((item, index) => {
            return (

              <>
                <motion.div
                  drag
                  key={index}
                  ref={item.II_alak.ref ?? null}
                  dragMomentum={false}
                  whileDrag={{ scale: 1 }} // Mozgatás alatt nincs változás
                  onDragEnd={(event, info) => handelDragEnd(event, index, info)}
                  onClick={(event) => {
                    control.start({ x: 0, y: 0, transition: { duration: 0.3 } })
                  }}
                  animate={item.II_alak.control}

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
                  <Text>{item.II_alak.word}</Text>
                </motion.div>
                {/* 3.alak */}
                <motion.div
                  drag
                  key={index + igek.length + 1}
                  ref={item.III_alak.ref ?? null}
                  dragMomentum={false}
                  whileDrag={{ scale: 1 }} // Mozgatás alatt nincs változás
                  onDragEnd={(event, info) => handelDragEnd(event, index, info)}
                  onClick={(event) => {
                    control.start({ x: 0, y: 0, transition: { duration: 0.3 } })
                  }}
                  animate={item.III_alak.control}

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
                  <Text>{item.III_alak.word}</Text>
                </motion.div>
              </>
            )
          })
        }


      </SimpleGrid>
      {/* <Box display={"flex"}  justifyContent={"center"}>
        <Button >Ellenőrzés</Button>
      </Box> */}

    </SimpleGrid>

  );
}
