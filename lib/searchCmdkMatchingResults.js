import fuzzy_match from "./fuzzy";

export function searchCmdkMatchingResults(actionMenu, searchTerm) {
  return actionMenu
    .map((item) => {
      if (item.type === null)
        return {
          ...item,
          matchResult: fuzzy_match(
            item.title[item.title.length - 1],
            searchTerm
          ),
        };
      const titleString = item.title.join(" / ");
      const matchResult = fuzzy_match(titleString, searchTerm);
      if (matchResult.length > 0)
        return {
          ...item,
          matchResult: ((matchResult) => {
            let tmp = matchResult.split(" / ");
            tmp = tmp[tmp.length - 1];
            if (!tmp.includes("<b>")) tmp = fuzzy_match(tmp, searchTerm);
            return tmp;
          })(matchResult),
        };
      return null;
    })
    .filter((item) => item !== null);
}
