import { SimpleGrid, Box, Text, Flex, Button } from '@chakra-ui/react'
//import { pointerWithin } from '@dnd-kit/core';
import { AnimationControls, motion, Point, useAnimate, useAnimation, useMotionValue } from 'framer-motion'
import React, { useEffect, useRef, useState } from 'react';

import { moveTo } from '../utils/move-to';
import { getNextComp } from '../utils/get-next-comp';
import { getPointFromRef } from '../utils/get-point-from-ref';
import { createWord } from '../utils/create-word';
import { use } from 'framer-motion/m';



export interface Word{
  word:string,
  home?:Point
}

interface Verb { 
  I_alak: Word
  II_alak: Word,
  III_alak: Word,
}


interface Seged { 
  I_alak:string
  II_alak: string,
  III_alak: string,
}

// kivinni fileba
export interface Row {
  I_ref: React.RefObject<HTMLDivElement | null>,
  II_ref: React.RefObject<HTMLDivElement | null>,
  III_ref: React.RefObject<HTMLDivElement | null>
}
/**
 * proba
 */
  interface Controls {
    I_alak: AnimationControls,
    II_alak: AnimationControls,
    III_alak: AnimationControls,
  };
  



export const Verbs = () => {

  //const [verb, setVerb] = useState<Verb[]>([]);
  
  const control:Controls[] = []
  const rows: Row[] | null = []
  const ref =[] 
  const verb: Verb[] = []

  for (let i = 0; i < 5; i++) {
    ref.push(useRef<HTMLDivElement|null>(null))
    control.push({
      I_alak:useAnimation(),
      II_alak:useAnimation(),
      III_alak:useAnimation()
    })



    rows.push({
      I_ref: useRef<HTMLDivElement>(null),
      II_ref: useRef<HTMLDivElement>(null),
      III_ref: useRef<HTMLDivElement>(null)
    })}

  useEffect(()=>{
    //useAnimation()
  },[verb])

  //célok és kezdő pozicíő mentése
  useEffect(() => {
    fetch("/verbs.json")
    .then((response) => response.json())
    .then((data:Seged[]) => {
      data.forEach((data,index)=>{
        verb.push({
          I_alak:{word:data.I_alak, home:getPointFromRef()},
          II_alak:{word:data.II_alak},
          III_alak:{word:data.III_alak}
        })
        }
      )
     })
    .catch((error) => console.error("Hiba a beolvasáskor:", error));
  }, [])


  const handelDragEnd = (event: MouseEvent | TouchEvent | PointerEvent, index: number, info: any) => {
    const target:Point = getNextComp((event.target as HTMLDivElement).getBoundingClientRect(),rows)
    control[index].I_alak.start({x:target.x, y: target.y});
  }

  return (
    <SimpleGrid gap={10}>
      <Flex gap={10} position={"relative"} display={"fixed"} justifyContent={"center"}>
        <SimpleGrid p={4} gap={5} style={{ border: "yellow, 2px, solid " }}>
          <Text>I alak</Text>
          {
            rows.map((row, index, value) => {
              //return
              return (
                <Box
                  key={index}
                  ref={row.I_ref}
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
            rows.map((row, index, value) => {

              return (
                <Box
                  key={index}
                  ref={row.II_ref}
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
          <Text>III alak</Text>
          {
            rows.map((row, index, value) => {
              //return
              return (
                <Box
                  key={index}
                  ref={row.III_ref}
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

      {/* IGE KOMPONENSEK */}
      <SimpleGrid border={"green solid 2px"} columns={6} gap={3} >
        {
          verb.map((ige, index) => {
            return (

              <>
                <motion.div
                  drag
                  key={index}
                  //ref={control[index].I_alak}
                  dragMomentum={false}
                  whileDrag={{ scale: 1 }} // Mozgatás alatt nincs változás
                  onDragEnd={(event, info) => handelDragEnd(event, index, info)}
                  animate={control[index].I_alak}

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
                  <Text>{ige.I_alak}</Text>
                </motion.div>
                {/* 3.alak */}
                {/* <motion.div
                  drag
                  key={index + igek.length + 1}
                 // ref={item.III_alak.ref ?? null}
                  dragMomentum={false}
                  whileDrag={{ scale: 1 }} // Mozgatás alatt nincs változás
                  onDragEnd={(event, info) => handelDragEnd(event, index, info)}
                  onClick={(event) => {
                    control.start({ x: 0, y: 0, transition: { duration: 0.3 } })
                  }}
                 // animate={item.III_alak.control}

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
                  <Text>{ige.II_akak}</Text>
                </motion.div> */}
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
