import { RouteComponentProps } from 'react-router';
import { ReactNode } from 'react';

export interface ScrollToTopProps extends RouteComponentProps<{}> {
    children?: ReactNode;
    location: any;
}