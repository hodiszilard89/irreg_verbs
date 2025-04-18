import { Box } from "@chakra-ui/react"

export const ContainerForWords = ({ref, free, index}:{ref: React.RefObject<HTMLDivElement | null>,  free: boolean, index:number,}) => {
    return (
        <Box
            onClick={(event) => { console.log(event.target) }}
            key={index}
            ref={ref}
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
        > {free.toString()}
        </Box>
    )
}