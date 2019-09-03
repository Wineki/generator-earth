import { RouteComponentProps } from 'react-router';
import { ReactNode } from 'react';

export interface IScrollToTop extends RouteComponentProps<{}> {
    children?: ReactNode;
    location: any;
}