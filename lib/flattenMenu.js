const flattenMenu = (menuItems, setFlattedMenu) => {
  let flattenedArray = [];
  let i = 0;

  const flatten = (items, parentTitle = "") => {
    items.forEach(async (item) => {
      const title =
        parentTitle + (parentTitle !== "" ? "|" : "") + item.title;

      flattenedArray.push({
        title,
        url: item.url || null,
        type: item.type || null,
        icon: item.icon || null,
        cmd: item.cmd || null,
      });

      if(item.items instanceof Function) {
        item.items = await item.items()
      }
      console.log("items", item.items);

      if (item.items && item.items.length > 0) {
        flatten(item.items, title);
      }
    });
  };

  flatten(menuItems);

  return flattenedArray.map((item) => ({...item, title: item.title.split("|")}));
};

export default flattenMenu;