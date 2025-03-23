import React, { useState } from "react";
import { DndContext, DragEndEvent, useDraggable, useDroppable } from "@dnd-kit/core";

const DraggableComponent: React.FC<{ id: string; style?: React.CSSProperties }> = ({ id, style }) => {
    const { attributes, listeners, setNodeRef, transform } = useDraggable({ id });

    const combinedStyle = {
        ...style,
        transform: transform ? `translate3d(${transform.x}px, ${transform.y}px, 0)` : undefined,
        padding: "20px",
        backgroundColor: "lightblue",
        border: "1px solid #ccc",
        borderRadius: "5px",
        cursor: "grab",
    };

    return (
        <div ref={setNodeRef} style={combinedStyle} {...listeners} {...attributes}>
            Húzd ide ({id})
        </div>
    );
};

const DroppableArea: React.FC<{ id: string }> = ({ id }) => {
    const { setNodeRef } = useDroppable({ id });

    const style = {
        padding: "50px",
        backgroundColor: "lightgreen",
        border: "2px dashed #ccc",
        borderRadius: "10px",
        margin: "20px",
    };

    return (
        <div ref={setNodeRef} style={style}>
            Ejtsd ide ({id})
        </div>
    );
};

const MagneticDndExample: React.FC = () => {
    const [isDropped, setIsDropped] = useState(false);
    const [draggableStyle, setDraggableStyle] = useState<React.CSSProperties>({});

    const handleDragEnd = (event: DragEndEvent) => {
        const { active, over } = event;

        // Ha a húzott elem a célterület fölé került
        if (over && active.id === "draggable" && over.id === "droppable") {
            const droppableRect = over.rect // A célterület pozíciója
            const activeRect = active.rect.current?.translated; // A húzott elem pozíciója

            if (droppableRect && activeRect) {
                // Számítsuk ki a távolságot a két elem között
                const distance = Math.sqrt(
                    Math.pow(droppableRect.left - activeRect.left, 2) +
                    Math.pow(droppableRect.top - activeRect.top, 2)
                );

                // Ha a távolság kisebb, mint 100 pixel, akkor "oda vonzza"
                if (distance < 100) {
                    setIsDropped(true);

                    // Állítsuk be a húzott elem pozícióját a célterület közepére
                    setDraggableStyle({
                        position: "absolute",
                        left: droppableRect.left + droppableRect.width / 2 - activeRect.width / 2,
                        top: droppableRect.top + droppableRect.height / 2 - activeRect.height / 2,
                    });
                }
            }
        }
    };

    return (
        <DndContext onDragEnd={handleDragEnd}>
            <div style={{ display: "flex", justifyContent: "space-around", marginTop: "50px", position: "relative" }}>
                <DraggableComponent id="draggable" style={draggableStyle} />
                <DroppableArea id="droppable" />
            </div>
            {isDropped && <p style={{ textAlign: "center" }}>Sikeresen belehúztad a célterületbe!</p>}
        </DndContext>
    );
};

export default MagneticDndExample;