import { Row } from "../pages/verbs"

// interface RowSetterProp  {
//     rowArray:Row[],
//     ref: React.RefObject<HTMLDivElement | null>,
//     bool:boolean
// }

export const rowSetter = (
                        rowArray:Row[], 
                        ref: React.RefObject<HTMLDivElement | null>,
                        bool:boolean):Row[] =>{
    const rows:Row[] = rowArray.map((row) => {
        if (ref== row.I_field.ref)
          return { ...row, I_field: { ...row.I_field, free: bool } }
  
        if (ref == row.II_field.ref)
          return { ...row, II_field: { ...row.II_field, free: bool } }
  
        if (ref == row.III_field.ref)
          return { ...row, III_field: { ...row.III_field, free: bool } }
        return row
      })
    return rows
}

// export const rowSetter = ({rowArray, ref, bool}:RowSetterProp):Row[] =>{
//     const rows:Row[] = rowArray.map((row) => {
//         if (ref== row.I_field.ref)
//           return { ...row, I_field: { ...row.I_field, free: bool } }
  
//         if (ref == row.II_field.ref)
//           return { ...row, II_field: { ...row.II_field, free: bool } }
  
//         if (ref == row.III_field.ref)
//           return { ...row, III_field: { ...row.III_field, free: bool } }
//         return row
//       })
//     return rows
//}