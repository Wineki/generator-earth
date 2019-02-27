export const initListData = window.__PRELOADED_STATE__ ?
    window.__PRELOADED_STATE__.store.listData :
    [];
export const initToastData =
    window.__PRELOADED_STATE__ ?
        window.__PRELOADED_STATE__.store.toastData :
        {

            toastType: 'Hint',
            showState: false


        };
