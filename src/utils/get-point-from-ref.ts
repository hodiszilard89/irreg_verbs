 import { Point } from "framer-motion";
 /**
  * 
  * @param ref komponeens referencia
  * @returns a komponenes aktuális pozíciója Point
  */
 export const getPointFromRef = (ref: React.RefObject<HTMLDivElement | null>): Point => {
    if (!ref?.current) {
      return { x: 0, y: 0 }; // Ha nincs érvényes ref, visszaadunk null értékeket
    }
    const rect = ref.current?.getBoundingClientRect();
    return { x: rect?.x ?? 0, y: rect?.y ?? 0 };
  };