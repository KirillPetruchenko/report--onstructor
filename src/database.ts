
// Импортируем изображения
import title from "./img/title.png";
import table1 from "./img/table1.png";
import table2 from "./img/table2.png";
import table3 from "./img/table3.png";
import table4 from "./img/table4.png";

export const localDatabase = [
  {
    id: 1,
    blockOrder: 1,
    name: "table",
    description: "description of title",
    image: title,
  },
  {
    id: 2,
    blockOrder: 2,
    name: "table1",
    description: "description of table1",
    image: table1,
  },
  {
    id: 3,
    blockOrder: 3,
    name: "table2",
    description: "description of table2",
    image: table2,
  },
  {
    id: 4,
    blockOrder: 4,
    name: "table3",
    description: "description of table3",
    image: table3,
  },
  {
    id: 5,
    blockOrder: 5,
    name: "table4",
    description: "description of table4",
    image: table4,
  },
];

// Функция для получения полного пути к изображению по его имени
export function getImagePathByName(name: string): string {
  return localDatabase.find((item) => item.name === name)?.image || "";
}
