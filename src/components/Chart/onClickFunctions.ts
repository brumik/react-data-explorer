export enum OnClickFunction {
    // redirect = 'redirect',
    consoleLog = 'consoleLog',
    default = ''
}

const doNothing = () => () => {
    // eslint-disable-next-line no-console
    console.log('do nothing event function');
};

// const redirect = (redirectFnc: (params: any) => void) => (params: any) => {
//     redirectFnc(params);
// }

const consoleLogValue = (e: any, params: any) => {
    // eslint-disable-next-line no-console
    console.log(e, params);
};

type FunctionTypes =
    typeof doNothing |
    typeof consoleLogValue;

const mapper: Record<OnClickFunction, FunctionTypes> = {
    [OnClickFunction.default]: doNothing,
    // [OnClickFunction.redirect]: redirect,
    [OnClickFunction.consoleLog]: consoleLogValue
};

export const getOnClickFunction = (name: OnClickFunction): FunctionTypes => mapper[name];
