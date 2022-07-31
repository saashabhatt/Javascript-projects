const choice = (items) => {
    let randidx = Math.floor(Math.random()*items.length)
    return items[randidx];
}

const remove = (items, item) => {
    let res = items.find(element => element == item);
    let idx = items.findIndex(element => element == item);
    items.splice(idx, 1);
    return items;
}

export { choice, remove }