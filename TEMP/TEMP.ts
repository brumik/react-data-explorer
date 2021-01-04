/*
{
    1: ChartWrapper
    2: Chart
}
 */
interface ChartElement {
    id: number,
    children: number[],
    wrapper: number,
    [x:string]: any
}

type Store = Record<number, ChartElement>;

const updateChartAction = (chart) => ({
    type: 'UPDATE_CHART',
    chart: chart,
    chartId: chart.id
});

// Use middleware for async
const updateChartAPIAction = (endpoint) => ({
    type: 'UPDATE_CHART_API',
    chart: endpoint,
    chartId: chart.id,
    payload: Promise(endpoint)
});

const reducer = (state, action) => {
    switch(action.type) {
        case 'SAVE_CHARTS':
            return action.payload;
        case 'UPDATE_CHART':
            return {
                ...state,
                [action.chartId]: {
                    ...state[action.chartId],
                    ...action.payload
                }
            };
        case 'UPDATE_CHART_API_PENDING':
            return {
                ...state,
                [action.chartId]: {
                    ...state[action.chartId],
                    endpoint: action.payload,
                    loading: true
                }
            };
        case 'UPDATE_CHART_API_FULFILLED':
            return {
                ...state,
                [action.chartId]: {
                    ...state[action.chartId],
                    data: action.payload,
                    loading: false
                }
            }
        case 'ADD_WRAPPER':
            return {
                ...state,
                [lastId+1]: action.payload
            }
        case 'ADD_CHART':
            // Usage: dispatch(ADD_CHART, chartdata)
            // dispatch(UPDATE_CHART_API, endpoints)
            return {
                ...state,
                [lastId+1]: {...action.payload, loading: true},
                [action.payload.parent]: addChild(action.payload.parent, lastId+1)
            }
        default:
            return state;
    }
}
const DataExplorer = () => {

    const initialschema = {};

    const fetchedSchema = forEach(initialschema.chart => resolve promises);
    dispatch({ type: 'SAVE_CHARTS', payload: fetchedSchema });

    <ChartRenderer />
};

const EditorComponent = (chartId) => {
    // Loads 1 chart from store;
    let values = {};

    const callback = () => {
        onChartApiChange: (newEndpoint) {
            dispatch(updateChartAPIAction(newEndpoint))
        }
        createChart: () {
            dispatch(newWrapper)
        }
        addChart: (chartvalues) {
            // Chart values: has wrapperId
            // doesnt have endpoint
            dispatch(addChart(chartValues))
        }
    }

    <FormItems values={ values } onChange={ callback }/>

    <ChartRenderer />
}
