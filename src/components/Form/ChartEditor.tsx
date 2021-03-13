// import React, { FunctionComponent, useEffect } from 'react';
// import { useDispatch } from 'react-redux';
// import {
//     ChartKind,
//     ChartType,
//     Chart
// } from '../Chart/types';
// import {
//     updateChart,
//     updateWrapperHidden
// } from '../../store/charts/actions';
// import { setOptionValue } from '../../store/form/actions';
// import { useTypedSelector } from '../../store/';
// import { fetchApi } from '../helpers';
// import Select from './Select';


// interface Props {
//     chartId: number
// }

// const WrapperEditor: FunctionComponent<Props> = ({ chartId }) => {
//     const dispatch = useDispatch();
//     const state = useTypedSelector(store => store.form);

//     const getField = (n: string) =>
//         state.length > 0
//             ? state.find(({ name }) => name === n)
//             : { value: '' };

//     const chart = useTypedSelector(store => store.charts.find(
//         ({ id, kind }) => id === chartId && kind === ChartKind.simple
//     ) as Chart);

//     useEffect(() => {
//         if (state.length <= 0 || !chart) return;

//         dispatch(updateChart({
//             ...chart,
//             props: {
//                 ...Chartprops,
//                 y: getField('attributes').value
//             }
//         } as Chart));
//     }, [ getField('attributes').value ]);

//     useEffect(() => {
//         if (state.length <= 0 || !chart) return;
//         const newValue = getField('chartTypes').value;

//         dispatch(updateWrapperHidden(
//             Chartparent,
//             newValue === ChartType.pie
//         ));

//         dispatch(updateChart({
//             ...chart,
//             type: newValue
//         } as Chart));

//     }, [ getField('chartTypes').value ]);

//     useEffect(() => {
//         if (state.length <= 0 || !chart) return () => ({});
//         const newValue = getField('groupByTime').value;
//         const newChart = { ...chart };

//         newChartapi.params = {
//             ...newChartapi.params,
//             'group_by_time': newValue,
//             'limit': newValue === 'true' ? '20' : '4'
//         };

//         let didCancel = false;
//         fetchApi(newChartapi)
//             .then(({ items }: Record<string, unknown>) => {
//                 if (didCancel) return;

//                 newChartprops = {
//                     ...newChartprops,
//                     data: items as Record<string, unknown>[],
//                     x: newValue === 'true' ? 'created_date' : ''
//                 }
//                 dispatch(updateChart(newChart));
//                 dispatch(setOptionValue(
//                     'chartTypes',
//                     newValue === 'true' ? 'line' : 'pie'
//                 ))
//             })
//             .catch(() => ({}));

//         return () => {
//             didCancel = true
//         };
//     }, [ getField('groupByTime').value ])

//     return (
//         <React.Fragment>
//             <h3>Chart options</h3>
//             { state.map((item, idx) => <Select key={idx} {...item} />) }
//         </React.Fragment>
//     );
// };

// export default WrapperEditor;
