import Resources from '../resources.json';

const consts = {
    pageSizes: [10, 25, 50, 100],
    pageButtonsCount: 5,
    propertyToTitle: {
        "performer": Resources.performer,
        "title": Resources.title,
        "year": Resources.year,
        "genre": Resources.genre
    }
};

export {consts as Constants};