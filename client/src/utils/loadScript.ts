const loadedFiles = new Set();
const urlLoadPromiseMap = {};

export const tryLoadScript = (url) => {
  if (urlLoadPromiseMap[url]) {
    return urlLoadPromiseMap[url];
  }

  const loadPromise = new Promise((resolve, reject) => {
    if (loadedFiles.has(url)) {
      resolve();

      return;
    }

    const onLoad = () => {
      loadedFiles.add(url);

      delete urlLoadPromiseMap[url];

      resolve();
    };

    const onError = () => {
      delete urlLoadPromiseMap[url];

      reject();
    };

    const script = document.createElement("script");

    script.setAttribute("src", url);
    script.setAttribute("type", "text/javascript");
    script.onload = onLoad;
    script.onerror = onError;

    document.head.appendChild(script);
  });

  urlLoadPromiseMap[url] = loadPromise;

  return loadPromise;
};
