import axios from 'axios';

class TrackService {
    constructor() {
        this.serverUrl = typeof API_URL === 'undefined'
            ? ''
            : API_URL;
    }

    // TODO: Handle fail callbacks everywhere. Validate the response. Add caching.

    getTracksByCondition(condition, successCallback) {
        var tracksRequestBody = {
            page: condition.currentPageNumber,
            tracksPerPage: condition.currentPageSize,
            sortBy: condition.sortBy,
            filterBy: condition.filterBy
        };

        axios.post(`${this.serverUrl}/tracks`, tracksRequestBody)
            .then(res => {
                successCallback(res.data.tracks, res.data.pagesCount);
            });
    }

    getValuesForFilter(successCallback) {
        axios.get(`${this.serverUrl}/filter-values?properties=genre&properties=performer&properties=year`)
            .then(res => {
                successCallback(res.data);
            });
    }
}

export default TrackService;