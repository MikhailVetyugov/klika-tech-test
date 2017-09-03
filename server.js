var express = require('express');
var bodyParser = require('body-parser');
var mockData = require('./MOCK_DATA');

var defaultPage = 1;
var tracksPerPageByDefault = 10;

var app = express();

app.use(express.static(__dirname + '/dist'));
app.use(bodyParser.json());

// We use POST because of several retrieval conditions (filter, sort, page and tracksPerPage).
app.post('/tracks', function (req, res) {
    var filterBy = req.body.filterBy;
    var sortBy = req.body.sortBy;
    var page = req.body.page || defaultPage;
    var tracksPerPage = req.body.tracksPerPage || tracksPerPageByDefault;

    try {
        var tracks = retrievePage(page, tracksPerPage, filterBy, sortBy);
    } catch (error) {
        console.log(error); // TODO: Add logs.
        return res.sendStatus(500);
    }

    res.json(tracks);
});

app.get('/filter-values', function (req, res) {
    var properties = req.query.properties;

    if (typeof properties === 'string') { // Single property in GET params.
        properties = [properties];
    }

    if (!(properties instanceof Array)) {
        return res.sendStatus(400);
    }

    var result = getValuesForFilter(properties);

    res.json(result);
});

var PORT = process.env.PORT || 8081;

app.listen(PORT, function () {
    console.log(`Server is up and running. Port: ${PORT}`);
});

// TODO: Add error handling. Move these functions to the separate file. Validate the body.

function retrievePage(page, tracksPerPage, filterBy, sortBy) {
    var tracks = mockData;

    tracks = filterTracks(filterBy, tracks);
    tracks = sortTracks(sortBy, tracks);

    var pagesCount = Math.ceil(tracks.length / tracksPerPage);

    var startIndex = (page - 1) * tracksPerPage;
    var endIndex = startIndex + tracksPerPage;

    tracks = tracks.slice(startIndex, endIndex);

    return {
        pagesCount: pagesCount,
        tracks: tracks
    };
}

function filterTracks(filterBy, result) {
    if (typeof filterBy !== 'object' || filterBy === null) {
        return result;
    }

    for (var property in filterBy) {
        if (!filterBy.hasOwnProperty(property)) {
            return result;
        }

        result = result.filter(function (track) {
            if (typeof track[property] === 'string') {
                return filterBy[property].toLowerCase() === track[property].toLowerCase();
            } else if (typeof track[property] === 'number') {
                return +filterBy[property] === track[property];
            }

            return true;
        });
    }

    return result;
}

function sortTracks(sortBy, result) {
    if (!sortBy) {
        return result;
    }

    result.sort(function (firstTrack, secondTrack) {
        var comparisonResult = typeof firstTrack[sortBy.property] === 'string'
            ? firstTrack[sortBy.property].localeCompare(secondTrack[sortBy.property])
            : firstTrack[sortBy.property] - secondTrack[sortBy.property];

        return sortBy.asc ? comparisonResult : comparisonResult * (-1);
    });

    return result;
}

function getValuesForFilter(properties) {
    var result = [];

    properties.forEach(function (property) {
        var values = mockData
            .map(function (track) {
                return track[property];
            })
            .filter(function (item, position, array) { // Remove duplicates.
                return array.indexOf(item) == position;
            });

        result.push({
            property: property,
            values: values
        });
    });

    return result;
}