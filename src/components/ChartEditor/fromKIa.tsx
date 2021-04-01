// /* eslint-disable */
// import React, { useState, useEffect, useRef } from 'react';
// import { Chart, ChartAxis, ChartGroup, ChartLine, ChartVoronoiContainer } from '@patternfly/react-charts';
// import {
//     VictoryChart,
//     VictoryLine,
//     VictoryBar,
//     VictoryGroup,
//     VictoryAxis,
//     VictoryTheme,
//     VictoryStack
// } from 'victory';

// import { useQueryParams } from '../../Utilities/useQueryParams';

// import LoadingState from '../../Components/LoadingState';
// import EmptyState from '../../Components/EmptyState';
// import {
//     // preflightRequest,
//     // readClustersOptions,
//     readJobExplorer,
//     readJobExplorerOptions,
//     readEventExplorer
// } from '../../Api';

// import { jobExplorer } from '../../Utilities/constants';
// import useApi from '../../Utilities/useApi';

// import {
//     Main,
//     PageHeader,
//     PageHeaderTitle
// } from '@redhat-cloud-services/frontend-components';

// import {
//     Card,
//     CardBody,
//     Drawer,
//     Checkbox,
//     DrawerPanelContent,
//     DrawerContent,
//     DrawerContentBody,
//     DrawerPanelBody,
//     DrawerHead,
//     DrawerActions,
//     DrawerCloseButton,
//     Button,
//     Select, SelectOption,
//     Switch
// } from '@patternfly/react-core';

// // import BarChart from '../../Charts/BarChart';
// // import LineChart from '../../Charts/LineChart';
// import FilterableToolbar from '../../Components/Toolbar';
// import ApiErrorState from '../../Components/ApiErrorState';

// import { clusters } from '../../Utilities/constants';

// const Explorer = () => {
//     const [isExpanded, setIsExpanded] = useState(true);
//     const [isSourceOpen, setIsSourceOpen] = useState(false);
//     const [isGroupByOpen, setIsGroupByOpen] = useState(false);
//     const [isChartTypeOpen, setIsChartTypeOpen] = useState(false);
//     const [source, setSource] = useState('job_explorer');
//     const [chartType, setChartType] = useState('Line');
//     const [selectedAttrs, setSelectedAttrs] = useState([]);
//     const drawerRef = useRef();
//     const onExpand = () => {
//         drawerRef.current && drawerRef.current.focus();
//     };

//     const optionsMapper = options => {
//         const { groupBy, attributes, ...rest } = options;
//         return rest;
//     };

//     const { queryParams, setFromToolbar } = useQueryParams({
//         ...clusters.defaultParams
//     });

//     const [
//         {
//             isLoading,
//             isSuccess,
//             error,
//             data: { items: chartData = [] }
//         },
//         setData
//     ] = useApi({ items: [] });

//     const [
//         {
//             data: { attributes = [] }
//         },
//         setAttributes
//     ] = useApi({ attributes: [] });

//     const [{ data: options = [] }, setOptions] = useApi({}, optionsMapper);

//     const initialOptionsParams = {
//         attributes: jobExplorer.attributes
//     };

//     const { queryParams: optionsQueryParams } = useQueryParams(
//         initialOptionsParams
//     );

//     const handleAttrsChange = (checked, event) => {
//         const target = event.target;
//         const value = target.value;
//         if (selectedAttrs.includes(value)) {
//             setSelectedAttrs(selectedAttrs.filter(el => el !== value));
//         } else {
//             setSelectedAttrs([...selectedAttrs, value]);
//         }
//     };

//     const groupData = (x = 'created_date') => {
//         let initial = {};
//         selectedAttrs.forEach(key => initial[key] = []); // { failed_count: [], total_count: [] }

//         return chartData.reduce((acc, curr) => {
//             selectedAttrs.forEach(key => {
//                 acc[key].push({
//                     [key]: curr[key],
//                     [x]: curr[x]
//                 });
//             });
//             return acc;
//         }, initial);
//     }

//     useEffect(() => {
//         setData(readJobExplorer({
//             params: {
//                 attributes: selectedAttrs,
//                 group_by_time: true
//             }
//         }));
//         setAttributes(readJobExplorerOptions({
//             params: {
//                 group_by_time: true
//             }
//         }));
//     }, [selectedAttrs])

//     useEffect(() => {
//         console.log(groupData());
//     }, [selectedAttrs, chartData]);

//     const sources = [
//         <SelectOption key={'job_explorer'} value="job_explorer" />,
//         <SelectOption key={'event_explorer'} value="event_explorer" />,
//         <SelectOption key={'host_explorer'} value="host_explorer" />,
//     ];
//     const groupBy = [
//         <SelectOption key={1} value="Time" />,
//         <SelectOption key={2} value="Template" />,
//     ];
//     const chartTypes = [
//         <SelectOption key={2} value="Line" />,
//         <SelectOption key={1} value="Bar" />,
//     ];

//     const panelContent = (
//         <DrawerPanelContent>
//             <DrawerHead>
//                 <span tabIndex={isExpanded ? 0 : -1} ref={drawerRef}>
//                     <span>Source: </span>
//                     <Select
//                         variant={'single'}
//                         aria-label="Source"
//                         onToggle={() => setIsSourceOpen(!isSourceOpen)}
//                         onSelect={(_, selection) => {
//                             setSource(selection);
//                             setIsSourceOpen(false);
//                         }}
//                         selections={source}
//                         isOpen={isSourceOpen}
//                         aria-labelledby={'foo'}
//                         isDisabled={false}
//                         direction={'down'}
//                     >
//                         {sources}
//                     </Select>
//                     <span>Chart type: </span>
//                     <Select
//                         variant={'single'}
//                         aria-label="Source"
//                         onToggle={() => setIsChartTypeOpen(!isChartTypeOpen)}
//                         onSelect={(_, selection) => {
//                             setChartType(selection);
//                             setIsChartTypeOpen(false);
//                         }}
//                         selections={chartType}
//                         isOpen={isChartTypeOpen}
//                         aria-labelledby={'foo'}
//                         isDisabled={false}
//                         direction={'down'}
//                     >
//                         {chartTypes}
//                     </Select>
//                     <span>Group by: </span>
//                     <Select
//                         variant={'single'}
//                         aria-label="Group-by"
//                         onToggle={() => setIsGroupByOpen(!isGroupByOpen)}
//                         onSelect={() => { }}
//                         selections={null}
//                         isOpen={isGroupByOpen}
//                         aria-labelledby={'foo'}
//                         isDisabled={false}
//                         direction={'down'}
//                     >
//                         {groupBy}
//                     </Select>
//                     <span>Attributes</span>
//                     <div style={{ maxHeight: '300px' }}>
//                         {attributes.map(a => (
//                             <Checkbox
//                                 label={a.key}
//                                 value={a.key}
//                                 isChecked={selectedAttrs.includes(a.key)}
//                                 onChange={handleAttrsChange}
//                                 aria-label={a.key}
//                                 id={a.key}
//                                 key={a.key}
//                                 name={a.key}
//                             />
//                         ))}
//                     </div>
//                 </span>
//                 <DrawerActions>
//                     <DrawerCloseButton onClick={() => setIsExpanded(false)} />
//                 </DrawerActions>
//             </DrawerHead>
//         </DrawerPanelContent>
//     );

//     return !error && !isLoading && (
//         <Card>
//             <CardBody>
//                 <Button aria-expanded={isExpanded} onClick={() => setIsExpanded(!isExpanded)}>
//                     Toggle Drawer
//                 </Button>
//                 <Drawer isExpanded={isExpanded} onExpand={onExpand}>
//                     <DrawerContent panelContent={panelContent}>
//                         <DrawerContentBody>
//                             <VictoryChart
//                                 height={200}
//                                 width={500}
//                                 theme={VictoryTheme.material}
//                                 showGrid
//                             >
//                                 <VictoryAxis dependentAxis />
//                                 <VictoryGroup>
//                                     {isSuccess && chartType === 'Line' && selectedAttrs.map(a => (
//                                         <VictoryLine
//                                             key={a}
//                                             x={'created_date'}
//                                             data={chartData}
//                                             y={a}
//                                         />
//                                     ))}
//                                     {isSuccess && chartType === 'Bar' && selectedAttrs.map(a => (
//                                         // <VictoryStack>
//                                         <VictoryBar
//                                             key={a}
//                                             x={'created_date'}
//                                             data={chartData}
//                                             y={a}
//                                         />
//                                         // </VictoryStack>
//                                     ))}
//                                 </VictoryGroup>
//                             </VictoryChart>
//                         </DrawerContentBody>
//                     </DrawerContent>
//                 </Drawer>
//             </CardBody>
//         </Card>
//     );
// };

// export default Explorer;