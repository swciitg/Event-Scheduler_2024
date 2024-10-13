import info from './info.js';
// import servers from './servers.js';
import eventPath from './paths/eventPath.js';
import eventsPath from './paths/eventsPath.js';
import categoriesPath from './paths/categoriesPath.js';

const apiDocs = {
    ...info,
    //...servers,
    paths: {
        ...eventsPath,
        ...eventPath,
        ...categoriesPath
    }
};

export default apiDocs;