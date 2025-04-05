import { SimpleGrid, Box, Text, Flex,  } from '@chakra-ui/react'
import {  AnimationControls, Point } from 'framer-motion'
import React, { useRef, useState } from 'react';
import {Word} from '../components/word'
import { moveTo } from '../utils/move-to';
import { getNextCompRef } from '../utils/get-next-comp-ref';
import { getPointFromRef } from '../utils/get-point-from-ref';

export interface Word {
  word?: string,
  home?: Point
  referencia?: React.RefObject<HTMLDivElement | null>,
  control?:AnimationControls
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
export const Verbs = () => {
  const [verb, setVerb] = useState<Word[]>([]);
  const rows: Row[] | null = []

  fetch("/verbs.json")
    .then((response) => response.json())
    .then((data: Word[]) => {
      setVerb(data)
    }
    )
    .catch((error) => console.error("Hiba a beolvasáskor:", error));


  for (let i = 0; i < 5; i++) {
    rows.push({
      I_ref: useRef<HTMLDivElement>(null),
      II_ref: useRef<HTMLDivElement>(null),
      III_ref: useRef<HTMLDivElement>(null)
    })
  }
  //célok és kezdő pozicíő mentése

  const handelDragEnd = (event: MouseEvent | TouchEvent | PointerEvent, info: any, control:AnimationControls, home:Point) => {
    const target:Point = (event.target as HTMLDivElement).getBoundingClientRect()
    const cel:Point = moveTo(getPointFromRef(getNextCompRef(target,rows)), home)
    control.start({x:cel.x, y: cel.y})
  }

  return (
    <SimpleGrid gap={10}>
      <Flex gap={10} position={"relative"} display={"fixed"} justifyContent={"center"}>
        <SimpleGrid  p={4} gap={5} style={{ border: "yellow, 2px, solid " }}>
          <Text>I alak</Text>
          {
            rows.map((row, index) => {

              return (
                <Box
                onClick={(event)=>{ console.log(event.target)}} 
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
            rows.map((row, index) => {

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
            rows.map((row, index) => {
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
              <Word word={ige.word ?? ""} key={index} dragEndHandle={ handelDragEnd}/>
             
             
                {/* <motion.div
                  drag
                  key={index}
                  ref={ige.referencia}
                  dragMomentum={false}
                  whileDrag={{ scale: 1 }} // Mozgatás alatt nincs változás
                  onDragEnd={(event,  info) => handelDragEnd(event, index, info)}

                   animate={useAnimation()}
                  
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
                  <Text>{ige.word}</Text>
                </motion.div> */}
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
