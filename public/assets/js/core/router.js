const currentPath = () => {
    let path = window.location.pathname;
    path = path.replaceAll("?", "");
    if (path.length > 1 && path[path.length - 1] === "/") {
        path = path.substring(0, path.length - 1);
    }
    return path;
};

const router = {
    chosenPath: null,

    assign(path, filePath) {
        let currPath = currentPath()
            .split("/");
        currPath.shift();

        let targetPath = path
            .split("/");
        targetPath.shift();

        if (currPath.length < 1) {
            console.debug("No route matching: " + path, " ; filePath: " + filePath);
            return;
        }

        for (let index in currPath) {
            let pathSegment = currPath[index];
            let targetPathSegment = targetPath[index];
            if (pathSegment !== targetPathSegment && !pathSegment.includes(":")) {
                return;
            }
        }

        this.chosenPath = filePath;
    },
};

export default router;