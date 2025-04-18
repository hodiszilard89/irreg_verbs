import { SimpleGrid, Text, Flex } from '@chakra-ui/react'
import { AnimationControls, Point } from 'framer-motion'
import React, { createRef, useEffect, useRef, useState } from 'react';
import { Word as WordComp } from '../components/word'
import { moveTo } from '../utils/move-to';
import { getNextField } from '../utils/get-next-field';
import { getPointFromRef } from '../utils/get-point-from-ref';
import { distance } from '../utils/distance';
import { ContainerForWords } from '../components/container-for-words';
import { rowSetter } from '../utils/row-setter';


export interface Word {
  word?: string,
  id?: number,
  home?: Point
  ref: React.RefObject<HTMLDivElement | null>,
  control?: AnimationControls,
  localref?: React.RefObject<HTMLDivElement | null>
}

export interface Field {
  free: boolean,
  ref: React.RefObject<HTMLDivElement | null>;
}

// kivinni fileba
export interface Row {
  I_field: Field,
  II_field: Field,
  III_field: Field
}

export const Verbs = () => {
  const [verb, setVerb] = useState<Word[]>([]);
  const [rows, setRows] = useState<Row[]>([]);

  const segedRow: Row[] | null = []


  // szavak beolvasásása //térháló referenciák mentése 
  useEffect(() => {
    segedRow.length = 0
    for (let i = 0; i < 5; i++) {
      segedRow.push({
        I_field: { free: true, ref: createRef<HTMLDivElement>() },
        II_field: { free: true, ref: createRef<HTMLDivElement>() },
        III_field: { free: true, ref: createRef<HTMLDivElement>() }
      })
    }
    setRows(segedRow)

    //Fileból beolvasás
    fetch("/verbs.json")
      .then((response) => response.json())
      .then((data: Word[]) => {
        setVerb(data.map(item => ({ ...item, localref: createRef(), ref: createRef() })));

      })
      .catch((error) => console.error("Hiba a beolvasáskor:", error));
  }, []);

  //célok és kezdő pozicíő mentése

  const nullRef = useRef<HTMLDivElement | null>(null)

  /**
   * 
   * @param localref a Word-ből konkrétan kapja meg a komponenes localref tulajdonsáágt a row tömb melyik fieldjében van benne
   * @param control 
   */
  const onDoubleClick = (localref: React.RefObject<HTMLDivElement | null>,
    control: AnimationControls,
    ref: React.RefObject<HTMLDivElement | null>,) => {
    setVerb(preVerb => preVerb.map(verb => {
      if (ref == verb.ref)
        return { ...verb, localref: nullRef }
      return verb
    }))

    //row tömb módosítása a hely felszabadítása
    setRows(rowSetter(rows, localref, true))
    control.start({ x: 0, y: 0 })
  }

  // első mozgatás szabadra állítjuk a row azon mezőjét amelyben éppen a komponens van

  // függvény amely vissza ad  egy Row[] tömböt egy localref alapján
  const handelDragStart = (referencia: React.RefObject<HTMLDivElement | null>, localref: React.RefObject<HTMLDivElement | null>) => {
    setRows(rowSetter(rows, localref, true))
  }

  const handelDragEnd = (
    event: MouseEvent | TouchEvent | PointerEvent,
    info: any,
    control: AnimationControls,
    home: Point,
    id: number,
    referencia: React.RefObject<HTMLDivElement | null>,

  ) => {
    //nozgatott elem
    const boxCom: Word | null = verb.find(item => item.ref == referencia) ?? null

    const box: Point = (event.target as HTMLDivElement).getBoundingClientRect()
    //visszaadja a teljes Fieldet
    const celField: Field = getNextField(box, rows)
    const cel: Point = getPointFromRef(celField.ref);

    if (distance(box, cel) < 50) {
      control.start({ x: moveTo(cel, home).x, y: moveTo(cel, home).y })

      //verbs módosítása
      // cél beállítása local refként 
      setVerb(preVerb => preVerb.map(verb => {
        if (boxCom?.ref == verb.ref)

          return { ...verb, localref: celField.ref }
        return verb
      }))


      //Rows state frissítése 
      // lefoglalja a row tömbben a cél nak megfelelő mezőt
      // visza Row tömb, bementet Row tömb, referencia, logikai érték
      setRows(rowSetter(rows, celField.ref, false))

    } else {
      control.start({ x: 0, y: 0 })
      //verbs módosítása
      // localref nullra állítása ha visszakerül
      setVerb(preVerb => preVerb.map(verb => {
        if (boxCom?.ref == verb.ref)
          return { ...verb, localref: nullRef }
        return verb
      }))
    }
    // console.log(verb)
  }

  return (
    <SimpleGrid gap={10}>
      <Flex gap={10} position={"relative"} display={"fixed"} justifyContent={"center"}>
        <SimpleGrid p={4} gap={30} style={{ border: "yellow, 2px, solid " }}>
          <Text>I alak</Text>
          {
            rows.map((row, index) => {
              return (
                <ContainerForWords key={Math.random()} ref={row.I_field.ref} index={index} free={row.I_field.free} />

              )
            })
          }
        </SimpleGrid>
        <SimpleGrid p={4} gap={30} style={{ border: "yellow, 2px, solid " }}>
          <Text>II alak</Text>
          {
            rows.map((row, index) => {
              return (
                <ContainerForWords key={Math.random()} ref={row.II_field.ref} index={index} free={row.II_field.free} />
              )
            })
          }
        </SimpleGrid>
        <SimpleGrid p={4} gap={30} style={{ border: "yellow, 2px, solid " }}>
          <Text>III alak</Text>
          {
            rows.map((row, index) => {
              return (
                <ContainerForWords key={Math.random()} ref={row.III_field.ref} index={index} free={row.III_field.free} />
              )
            })
          }
        </SimpleGrid>
      </Flex>
      {/* IGE KOMPONENSEK */}
      <SimpleGrid columns={5} gap={3} >
        {
          verb.map((ige, index) => {

            return (<WordComp

              word={ige.word ?? ""}
              localref={ige.localref ?? createRef()}// nem túl jó így
              id={ige.id ?? 0}
              key={index}
              onClick={onDoubleClick}
              dragEndHandle={handelDragEnd}
              dragStartHandle={handelDragStart}
              ref={ige.ref} />)
          })
        }
      </SimpleGrid>
    </SimpleGrid>
  );
}
