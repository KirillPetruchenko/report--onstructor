import React, { useState } from "react";
import Column from "./components/Column";
import { DragDropContext, DropResult } from "react-beautiful-dnd";
import { styled } from "./stiches.config";
import { localDatabase, getImagePathByName } from "./database";
// import image1 from "./img/item1.png";
// import image2 from "./img/item2.png";
// import image3 from "./img/item3.png";

const StyledColumns = styled("div", {
  display: "grid",
  gridTemplateColumns: "1fr 1fr",
  margin: "10vh auto",
  width: "80%",
  height: "80vh",
  gap: "8px",
});

function App() {
  // const initialColumns = {
  //   templateData: {
  //     id: "templateData",
  //     list: [
  //       { id: "item1", image: image1 },
  //       { id: "item2", image: image2 },
  //       { id: "item3", image: image3 },
  //     ],
  //   },
  //   reportBuilder: {
  //     id: "reportBuilder",
  //     list: [],
  //   },
  // };
  const initialColumns = {
    templateData: {
      id: "templateData",
      list: localDatabase
        .filter((item) => item.name !== "title")
        .map((item) => ({
          id: item.name,
          image: getImagePathByName(item.name),
        })),
    },
    reportBuilder: {
      id: "reportBuilder",
      list: [],
    },
  };

  const [columns, setColumns] = useState(initialColumns);

  const onDragEnd = ({ source, destination }: DropResult) => {
    if (!destination) {
      return;
    }

    const start = columns[source.droppableId];
    const end = columns[destination.droppableId];

    if (start === end) {
      const newList = start.list.filter(
        (element: { id: string; image: string }, idx: number) =>
          idx !== source.index
      );
      newList.splice(destination.index, 0, start.list[source.index]);

      const newCol = {
        id: start.id,
        list: newList,
      };

      setColumns((state) => ({ ...state, [newCol.id]: newCol }));
      return;
    } else {
      const newStartList = start.list.filter(
        (element: { id: string; image: string }, idx: number) =>
          idx !== source.index
      );
      const newStartCol = {
        id: start.id,
        list: newStartList,
      };

      const newEndList = end.list.slice();
      newEndList.splice(destination.index, 0, start.list[source.index]);

      if (start.id === "templateData" && !isSequential(newEndList)) {
        alert("Ошибка! Проверьте последовательность!");
        return;
      }

      const newEndCol = {
        id: end.id,
        list: newEndList,
      };

      setColumns((state) => ({
        ...state,
        [newStartCol.id]: newStartCol,
        [newEndCol.id]: newEndCol,
      }));
      return;
    }
  };

  const isSequential = (arr: { id: string; image: string }[]): boolean => {
    for (let i = 1; i < arr.length; i++) {
      if (arr[i - 1].id.localeCompare(arr[i].id) !== -1) {
        return false;
      }
    }
    return true;
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <StyledColumns>
        {Object.values(columns).map((col) => (
          <Column col={col} key={col.id} />
        ))}
      </StyledColumns>
    </DragDropContext>
  );
}

export default App;

// Стилизованный контейнер для колонок
// const StyledColumns = styled("div", {
//   display: "grid",
//   gridTemplateColumns: "1fr 1fr",
//   margin: "10vh auto",
//   width: "80%",
//   height: "80vh",
//   gap: "8px",
// });

// function App() {
//   // Изначальное состояние колонок
//   // const initialColumns = {
//   //   templateData: {
//   //     id: "templateData",
//   //     list: ["item 1", "item 2", "item 3"],
//   //   },
//   //   reportBuilder: {
//   //     id: "reportBuilder",
//   //     list: [],
//   //   },
//   // };
//   const initialColumns = {
//     templateData: {
//       id: "templateData",
//       list: [
//         { id: "item1", image: image1 },
//         { id: "item2", image: image2 },
//         { id: "item3", image: image3 },
//       ],
//     },
//     reportBuilder: {
//       id: "reportBuilder",
//       list: [],
//     },
//   };

//   // Состояние и функция для обновления состояния колонок
//   const [columns, setColumns] = useState(initialColumns);

//   // Функция, вызываемая при завершении перетаскивания
//   const onDragEnd = ({ source, destination }: DropResult) => {
//     // Убедимся, что у нас есть действительное место назначения
//     if (!destination) {
//       return;
//     }

//     // Установим переменные начала и конца
//     const start = columns[source.droppableId];
//     const end = columns[destination.droppableId];

//     // Если начало совпадает с концом, мы находимся в той же колонке
//     if (start === end) {
//       // Перемещаем элемент внутри списка
//       const newList = start.list.filter(
//         (element: string, idx: number) => idx !== source.index
//       );
//       newList.splice(destination.index, 0, start.list[source.index]);

//       // Создаем новую копию объекта колонки
//       const newCol = {
//         id: start.id,
//         list: newList,
//       };

//       // Обновляем состояние
//       setColumns((state) => ({ ...state, [newCol.id]: newCol }));
//       return;
//     } else {
//       // Если начало отличается от конца, нам нужно обновить несколько колонок
//       const newStartList = start.list.filter(
//         (element: string, idx: number) => idx !== source.index
//       );
//       const newStartCol = {
//         id: start.id,
//         list: newStartList,
//       };

//       const newEndList = end.list.slice();
//       newEndList.splice(destination.index, 0, start.list[source.index]);

//       // Проверяем последовательность элементов в новомEndList
//       if (start.id === "templateData" && !isSequential(newEndList)) {
//         // Если нарушена последовательность при перетаскивании из templateData в reportBuilder
//         alert("Ошибка! Проверьте последовательность!");
//         return;
//       }

//       const newEndCol = {
//         id: end.id,
//         list: newEndList,
//       };

//       // Обновляем состояние
//       setColumns((state) => ({
//         ...state,
//         [newStartCol.id]: newStartCol,
//         [newEndCol.id]: newEndCol,
//       }));
//       return;
//     }
//   };

//   // Функция для проверки последовательности элементов
//   const isSequential = (arr: string[]): boolean => {
//     for (let i = 1; i < arr.length; i++) {
//       if (arr[i - 1].localeCompare(arr[i]) !== -1) {
//         // Если порядок не соблюден (от меньшего к большему)
//         return false;
//       }
//     }
//     return true;
//   };

//   return (
//     // Обертка для контекста перетаскивания
//     <DragDropContext onDragEnd={onDragEnd}>
//       {/* Стилизованные колонки */}
//       <StyledColumns>
//         {Object.values(columns).map((col) => (
//           // Компонент колонки
//           <Column col={col} key={col.id} />
//         ))}
//       </StyledColumns>
//     </DragDropContext>
//   );
// }

// export default App;
