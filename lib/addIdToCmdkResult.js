export function addIdToCmdkResult (data, actionStack) {
    let idCounter = 0;
    return data
      .map((item, index) => {
        if (data[index]?.type === null && data[index + 1]?.type === null)
          return null;
        return item.type === null
          ? !data[index + 1]?.title
              .join("/")
              .toLowerCase()
              .includes(item.title.join("/").toLowerCase())
            ? null
            : {
                ...item,
                level: item?.stack?.length - actionStack?.length - 1,
                title: item.title[item.title.length - 1],
              }
          : {
              ...item,
              id: ++idCounter,
              level: item?.stack?.length - actionStack?.length - 1,
              title: item.title[item.title.length - 1],
            };
      })
      .filter((item) => item !== null);
  };