import axios from 'axios';
import { takeEvery, call, put as dispatch } from 'redux-saga/effects';

function* apiCall(action) {
    try {
        const search = yield call(
            axios({
                url: "https://search.artsmia.org/random/art?size=10",
                method: 'GET',
            })
        );
        console.log(search.data);
        yield dispatch({
            type: 'ELASTIC_RESULTS',
            payload: search.body,
        })
    } catch (error) { }
}

function* artSaga() {
    yield takeEvery('API_CALL', apiCall);
}

export default artSaga;