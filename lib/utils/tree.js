// 获取树的广度
export function handleGetTreeExtent(node) {
    let extend = 0;
    node.forEach((item) => {
        if (item.children) {
            extend += handleGetTreeExtent(item.children);
        } else {
            extend += 1;
        }
    });
    return extend;
}

// 获取树的深度
export function handleGetTreeDeep(fileHeader) {
    let deep = 0;
    fileHeader.forEach((item) => {
        if (item.children) {
            deep = Math.max(deep, handleGetTreeDeep(item.children) + 1);
        } else {
            deep = Math.max(deep, 1);
        }
    });
    return deep;
}