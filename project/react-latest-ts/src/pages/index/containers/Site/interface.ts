import { RouteComponentProps } from 'react-router';

export const initialState = {
    listData: [],
    loadingShow: false
}
export type State = Readonly<typeof initialState>

export interface ISite extends RouteComponentProps<{id: string}> {}

export interface IList {
    listData: {
        id: string,
        title: string
    }[]
}

export interface IDetail extends RouteComponentProps<{id: string}> {}
