export function filterCmdkResultByType (actionMenu, selectedTypes) {
    return actionMenu.filter((item) => {
        if (selectedTypes.length === 0)
            return true;
        if (item.type === null)
            return true;
        return selectedTypes.includes(item.type);
    });
}