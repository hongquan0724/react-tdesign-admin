import classNames from "classnames";
import { useCallback, useState } from 'react'
import BoardItem from "@/view/componentsPage/DragBoardPage/components/BoardItem.jsx";
import {Draggable, Droppable} from "react-beautiful-dnd";
const BoardCard = (props) => {
   const {headerText, boardclass, list, ind} = props;
    const renderCard = useCallback((item, index) => {
        return (
            <Draggable
                key={item.id}
                draggableId={item.id}
                index={index}>
                {(provided) => (
                    <div className="board-item"
                         ref={provided.innerRef}
                         {...provided.draggableProps}
                         {...provided.dragHandleProps}>
                        {item.name} {item.id}
                    </div>
                )}

            </Draggable>
        )
    }, [])
    return (
        <Droppable key={headerText} droppableId={`${headerText}_${ind}`} >
            {(provided) => (
                <div   ref={provided.innerRef}
                       className={classNames('board-column', 'kanban', boardclass)}
                       {...provided.droppableProps}
                       >
                    <div className="board-column-header">
                        {headerText}
                    </div>
                    <div className="board-column-content">
                        {list.map((card, i) => renderCard(card, i))}
                    </div>
                </div>
            )}

        </Droppable>

    )
}


export default BoardCard
