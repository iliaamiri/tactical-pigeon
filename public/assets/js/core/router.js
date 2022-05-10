const currentPath = () => {
    let path = window.location.pathname;
    path = path.replaceAll("?", "");
    if (path.length > 1 && path[path.length - 1] === "/") {
        path = path.substring(0, path.length - 1);
    }
    return path;
};

function splitCamelCasedString(str) {
    let letters = str.split("");
    let result = letters.reduce((resultArr, letter, index) => {
        if (letter === letter.toUpperCase()) {
            resultArr.push(
                letters
                    .splice(0, index)
                    .join("")
            );
            letters = letters.splice(index)
        }

        return resultArr;
    }, []);

    if (result.length < 1) {
        return [str];
    }

    return result;
}

const router = {
    chosenPath: null,

    assign(path, filePath) {
        let currPath = currentPath()
            .split("/");
        currPath.shift();

        let filePathArr = splitCamelCasedString(filePath);

        if (currPath.length < 1) {
            console.debug("No route matching: " + path, " ; filePath: " + filePath);
            return;
        }

        for (let index in currPath) {
            let pathSegment = currPath[index];
            let filePathSegment = filePathArr[index];
            if (pathSegment !== filePathSegment && !pathSegment.includes(":")) {
                return;
            }
        }

        this.chosenPath = filePath;
    },
};

export default router;