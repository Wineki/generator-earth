import request from 'api/request'
import { changeToastState } from './common_toast'

export const FETACH_LIST_DATA = 'FETACH_LIST_DATA';

export const fetchListData = () => {

	return async (dispatch, getState) => {

		dispatch(changeToastState({

			showState: true,
			toastType: 'Loading'

		}));

		const data = await request.post('/api/test/listDate', {
		    id: 1,
            age: 20
        }).catch((e) => {
            return []
        });


        dispatch ({

            type: FETACH_LIST_DATA,
            data: data || []
        });


        dispatch(changeToastState({

            showState: false

        }))

	}

};
