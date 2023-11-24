import { checkIfItemIsChildItem } from "./checkIfItemIsChildItem";

 // getting all child items of action menu
export function getCmdkMenuListByActionStack (actionStack, menu) {
    return menu
      .map((item) => {
        if (checkIfItemIsChildItem(item, actionStack))
          return { ...item, stack: item.title };
        return null;
      })
      .filter((item) => item !== null);
  };