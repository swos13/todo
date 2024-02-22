const storage = (() => {

    let localStorage = window['localStorage'];

    const isAvailable = () => {
        try {
            const x = "__storage_test__";
            localStorage.setItem(x, x);
            localStorage.removeItem(x);
            return true;
        } catch (e) {
            return (
                e instanceof DOMException &&
                (e.code === 22 ||
                e.code === 1014 ||
                e.name === "QuotaExceededError" ||
                e.name === "NS_ERROR_DOM_QUOTA_REACHED") &&
                localStorage &&
                localStorage.length !== 0
            );
        }
    }

    const setItem = (name, object) => {
        localStorage.setItem(name, JSON.stringify(object));
    }

    const getItem = (name) => {
        return JSON.parse(localStorage.getItem(name));
    }

    const setCurrentProject = (currentProject) => {
        setItem('currentProject', currentProject);
    }

    const getCurrentProject = () => {
        return getItem('currentProject');
    }

    const setProjects = (projects) => {
        setItem('projects', Array.from(projects.entries()));
    }

    const getProjects = () => {
       return new Map(getItem('projects'));
    }

    return { isAvailable, setCurrentProject, getCurrentProject, setProjects, getProjects }
})();

export default storage;