
import { useRef } from 'react'
import { Draggable } from "react-beautiful-dnd";

const BoardItem = ({name, id, index}) => {
    const ref = useRef(null)
    console.log(id,'id');
    return (
        <Draggable
            key={id}
            draggableId={id}
            index={index}>
            {(provided) => (
                <div className="board-item"    ref={provided.innerRef}
                     {...provided.draggableProps}
                     {...provided.dragHandleProps}>
                    {name} {id}
                </div>
            )}

        </Draggable>
    )
}

export default BoardItem
