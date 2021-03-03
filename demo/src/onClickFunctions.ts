const consoleLogValue = (e: never, params: Record<string, any>): void => {
    // eslint-disable-next-line no-console
    console.log(params);
};

type FunctionTypes = typeof consoleLogValue;

const mapper: Record<string, FunctionTypes> = {
    consoleLog: consoleLogValue
};

export default mapper;
