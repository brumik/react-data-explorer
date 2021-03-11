// import { ChartElement } from '../..';

// export const passDataToChildren = (
//     charts: ChartElement[],
//     childrenId: number[],
//     data: Record<string, unknown>[]
// ): ChartElement[] => ([
//     ...charts.filter(({ id }) => !childrenId.includes(id)),
//     ...childrenId.map(childId => {
//         const modified = charts.find(({ id }) => id === childId);
//         // This if statement ensures that the chart's own data
//         // prop is not overwritten, in case it has a more specific api
//         if (
//             modified.api &&
//             modified.api.data &&
//             modified.api.data.length > 0) {
//             return modified;
//         } else {
//             if (!modified.api) {
//                 modified.api = {
//                     params: {},
//                     url: '',
//                     optionUrl: '',
//                     data: []
//                 };
//             }
//             modified.api.data = data;
//             return modified;
//         }
//     })
// ]);

export const snakeToSentence = (str: string): string => {
    const sentence = str.toLowerCase().split('_');
    sentence[0] = sentence[0][0].toUpperCase() + sentence[0].slice(1);
    return sentence.join(' ');
}