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

      const putInStorage = (name, object) => {
        localStorage.setItem(name, JSON.stringify(object));
      }

      const getFromStorage = (name) => {
        return JSON.parse(localStorage.getItem(name));
      }

      return { isAvailable, putInStorage, getFromStorage }
})();

export default storage;