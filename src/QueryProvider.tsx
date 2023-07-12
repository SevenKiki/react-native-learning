import { QueryClient, QueryClientProvider, useQuery } from 'react-query';
import request from '@kds/react-native-request';

export const queryProductsData = () => {
    return request({
        url: 'https://run.mocky.io/v3/d8ad055d-0150-41aa-9820-61ef5d467970',
        method: 'GET',
        responseType: 'string',
    }).then((response) => {
        // @ts-ignore
        let data_ = JSON.stringify(JSON.parse(response.data));
        console.log('Query........');

        return JSON.parse(data_).itemList;
    });
};

export const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            queryFn: queryProductsData,

            staleTime: 5 * 10 * 1000,
            cacheTime: 10 * 10 * 1000,
            retry: 1,
        },
    },
});
