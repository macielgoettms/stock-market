import api from '../../../service/axios';
import { APIFunctionType, APIKey} from '../../../configuration/market.config';

export function findCompanyOverview(symbol, onSucess, onError) {
    api.get(`query?function=${APIFunctionType.OVERVIEW}&symbol=${symbol}&apikey=${APIKey}`)
    .then(response => {
        onSucess && onSucess(response.data)
    })
    .catch(error => {
        onError && onError(error)
    })
}

export function findEarnings(symbol, onSucess, onError) {
    api.get(`query?function=${APIFunctionType.EARNINGS}&symbol=${symbol}&apikey=${APIKey}`)
    .then(response => {
        onSucess && onSucess(response.data)
    })
    .catch(error => {
        onError && onError(error)
    })
}