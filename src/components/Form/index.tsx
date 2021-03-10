// import React, { FunctionComponent, useEffect } from 'react';
// import { Card, CardTitle, CardBody } from '@patternfly/react-core';
// import { ChartType } from '../Chart/types';
// import { apiOptionsToFormOptions } from './helpers'
// import { useDispatch } from 'react-redux';
// import { set as setForm } from '../../store/form/actions';
// import WrapperEditor from './WrapperEditor';

// interface PropType {
//     wrapperId: number
// }

// const options = {
//     apis: [
//         {
//             key: 'https://prod.foo.redhat.com:1337/api/tower-analytics/v1/job_explorer/',
//             value: 'Job Explorer'
//         }
//     ],
//     groupByTime: [
//         {
//             key: 'true',
//             value: 'Group By Time'
//         },
//         {
//             key: 'false',
//             value: 'Don\'t Group By Time'
//         }
//     ],
//     chartTypes: [
//         {
//             key: ChartType.bar,
//             value: 'Bar Chart'
//         },
//         {
//             key: ChartType.line,
//             value: 'Line Chart'
//         },
//         {
//             key: ChartType.pie,
//             value: 'Pie Chart'
//         }
//     ],
//     attributes: [
//         {
//             key: 'host_count',
//             value: 'Host count'
//         },
//         {
//             key: 'failed_host_count',
//             value: 'Failed host count'
//         },
//         {
//             key: 'unreachable_host_count',
//             value: 'Unreachable host count'
//         },
//         {
//             key: 'average_elapsed_per_host',
//             value: 'Average elapsed time per host'
//         },
//         {
//             key: 'average_host_task_count_per_host',
//             value: 'Average tasks count per host'
//         }
//     ]
// }

// const Form: FunctionComponent<PropType> = ({ wrapperId }) => {
//     const dispatch = useDispatch();

//     useEffect(() => {
//         dispatch(
//             setForm(apiOptionsToFormOptions(options, dispatch))
//         );
//     }, [])

//     return (
//         <Card>
//             <CardTitle>Options</CardTitle>
//             <CardBody>
//                 <WrapperEditor wrapperId={wrapperId} />
//             </CardBody>
//         </Card>
//     );
// };

// export default Form;
