import React from "react";
import { Draggable } from "react-beautiful-dnd";
import { styled } from "../stiches.config";

interface ItemProps {
  item: {
    id: string;
    image: string;
  };
  index: number;
}

const StyledItem = styled("div", {
  margin: "8px",
  padding: "8px",
  backgroundColor: "#fff",
  borderRadius: "4px",
  boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",

  img: {
    maxWidth: "100%",
    height: "auto",
  },
});

const Item: React.FC<ItemProps> = ({ item, index }) => {
  return (
    <Draggable draggableId={item.id} index={index}>
      {(provided) => (
        <StyledItem
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <img src={item.image} alt={`Item ${index + 1}`} />
        </StyledItem>
      )}
    </Draggable>
  );
};

export default Item;
