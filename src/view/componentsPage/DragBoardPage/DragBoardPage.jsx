
import { DragDropContext } from "react-beautiful-dnd";
import './DragBoardPage.less'
import BoardCard from "@/view/componentsPage/DragBoardPage/components/BoardCard.jsx";
import {useState} from 'react'


const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result;
};
const move = (source, destination, droppableSource, droppableDestination) => {
    const sourceClone = Array.from(source);
    const destClone = Array.from(destination);
    const [removed] = sourceClone.splice(droppableSource.index, 1);

    destClone.splice(droppableDestination.index, 0, removed);

    const result = {};
    result[droppableSource.droppableId] = sourceClone;
    result[droppableDestination.droppableId] = destClone;

    return result;
};
const DragBoardPage = ()=> {
    const getItems = (count, offset = 0) =>
        Array.from({ length: count }, (v, k) => k).map(k => ({
            id: `item-${k + offset}-${new Date().getTime()}`,
            content: `item ${k + offset}`
        }));
    const [BoardInfo, setBoardInfo] = useState({
        Todo:getItems(5),
        Working:getItems(5,6),
        Done: getItems(5,11)
    })
    const onDragEnd = (result) => {
        const { source, destination } = result;
        console.log(result,'result');
        // if (!destination) {
        //     return;
        // }
        const sInd = source.droppableId;
        const dInd = destination.droppableId;
        const state = BoardInfo;
        const _key = sInd.split('_')[0];
        const _key2 = dInd.split('_')[0];
        if (sInd === dInd) {
            let newSate = {...state}
            const items = reorder(newSate[_key], source.index, destination.index);
            newSate[_key] = items;
            setBoardInfo(newSate);
        } else {
            let newSate = {...state}
            const result = move(newSate[_key], newSate[_key2], source, destination);
            newSate[_key] = result[sInd];
            newSate[_key2] = result[dInd]
            setBoardInfo(newSate);
        }
    }

    const DragDropFun = ()=>      <DragDropContext onDragEnd={onDragEnd}>
        {Object.keys(BoardInfo).map((el, ind) => (
            // eslint-disable-next-line react/jsx-key
            <BoardCard key={ind} list={BoardInfo[el]} ind={ind} headerText={el} boardclass={el.toLocaleLowerCase()}  />
            //         <Droppable key={ind} droppableId={`${el}_${ind}`} >
            //             {(provided, snapshot) => (
            //                 <div
            //                     ref={provided.innerRef}
            //                     className={classNames('board-column', 'kanban', el.toLocaleLowerCase())}
            //                     {...provided.droppableProps}
            //                 >
            //                     <div className="board-column-header">
            //                         {el}
            //                     </div>
            //                     <div className="board-column-content">
            //                         {BoardInfo[el].map((item, index) => (
            //                             <Draggable
            //                                 key={item.id}
            //                                 draggableId={item.id}
            //                                 index={index}
            //                             >
            //                                 {(provided, snapshot) => (
            //                                     <div
            //                                         ref={provided.innerRef}
            //                                         {...provided.draggableProps}
            //                                         {...provided.dragHandleProps}
            //                                         className="board-item"
            //                                     >
            //                                         {item.content}
            //                                     </div>
            //                                 )}
            //                             </Draggable>
            //                         ))}
            //                     </div>
            //                     {provided.placeholder}
            //                 </div>
            //             )}
            //         </Droppable>
        ))}
    </DragDropContext>
    console.log(BoardInfo, 'BoardInfo');
    return (
        <div className="components-container">
            <div className="dragboard-header">
                DragBoard base on <a href="https://github.com/atlassian/react-beautiful-dnd"
                                     target="_blank" rel="noreferrer">react-beautiful-dnd</a>
            </div>
            <div className="dragboard-content">
                {DragDropFun()}
            </div>
        </div>
    )
}


export default DragBoardPage
