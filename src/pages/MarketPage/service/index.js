import api from '../../../service/axios';
import {APIFunctionType, APIKey} from '../../../configuration/market.config'
import {organizations} from '../../../utilities/constants'

export function findEndpoint(keyword, onSucess, onError){
    api.get(`query?function=${APIFunctionType.SYMBOL_SEARCH}&keywords=${keyword}&apikey=${APIKey}`)
        .then(response => {            
            onSucess && onSucess(organizations)
        })
        .catch(error => {
            onError && onError(error)
        })
}

function modifyData({bestMatches}) {
    return bestMatches.map(object => {
        let newObject = []; 
        Object.entries(object).forEach(item => {
            const name = item[0].split(" ")[1]
            const value = item[1];
            newObject[name] = value;            
        });
        return newObject;
    });
}

/*
1. symbol: "IBM"
2. name: "International Business Machines Corp"
3. type: "Equity"
4. region: "United States"
5. marketOpen: "09:30"
6. marketClose: "16:00"
7. timezone: "UTC-04"
8. currency: "USD"
9. matchScore: "1.0000"
*/