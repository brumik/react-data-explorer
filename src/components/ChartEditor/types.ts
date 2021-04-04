export type ApiParams = Record<string, unknown>;
export interface FormApiProps {
    url: string,
    optionUrl: string,
    params: ApiParams,
    label: string
}