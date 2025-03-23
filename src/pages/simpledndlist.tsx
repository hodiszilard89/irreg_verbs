import React, { useState } from "react";
import { DndContext, closestCenter, DragEndEvent } from "@dnd-kit/core";
import { arrayMove, SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { SortableItem } from "./sortableitem"; // Létrehozzuk a SortableItem komponenst

const SimpleDndList: React.FC = () => {
    // Állapot a lista elemek tárolására
    const [items, setItems] = useState<string[]>(["Elem 1", "Elem 2", "Elem 3", "Elem 4"]);

    // Drag esemény kezelése
    const handleDragEnd = (event: DragEndEvent) => {
        const { active, over } = event;

        // Ha az elem egy másik elem fölé került
        if (over && active.id !== over.id) {
            setItems((items) => {
                const oldIndex = items.indexOf(active.id as string);
                const newIndex = items.indexOf(over.id as string);

                // Az elemek újrarendezése
                return arrayMove(items, oldIndex, newIndex);
            });
        }
    };

    return (
        <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
            <SortableContext items={items} strategy={verticalListSortingStrategy}>
                <div style={{ width: 300, margin: "0 auto" }}>
                    {items.map((item) => (
                        <SortableItem key={item} id={item}>
                            {item}
                        </SortableItem>
                    ))}
                </div>
            </SortableContext>
        </DndContext>
    );
};

export default SimpleDndList;