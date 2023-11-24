export function checkIfItemIsChildItem (item, stack) {
    const titleString = item.title.join(" / ").toLowerCase();
    const actionString = stack?.join(" / ").toLowerCase();
    return titleString.includes(actionString);
  };