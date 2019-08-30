import { RouteComponentProps } from 'react-router';

export const initialState = {
    listData: [],
    loadingShow: false
}
export type State = Readonly<typeof initialState>

export interface SiteProps extends RouteComponentProps<{}> {
}

export interface ListProps {
    listData: {
        id: string,
        title: string
    }[]
}