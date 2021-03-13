// import {
//     FormOption,
//     JobExplorerOptions
// } from './types';
// import { ActionTypes } from '../../store/';
// import { setOptionValue } from '../../store/form/actions';

// export const apiOptionsToFormOptions = (
//     obj: JobExplorerOptions,
//     dispatch: React.Dispatch<ActionTypes>
// ): FormOption[] =>
//     Object.keys(obj).map(key => {
//         return {
//             value: obj[key][0].key,
//             setValue: (value) => {
//                 dispatch(
//                     setOptionValue(key, value)
//                 );
//             },
//             options: obj[key],
//             placeholder: key,
//             name: key
//         } as FormOption;
//     });
