import * as $ from 'jquery';

function createAnalytics() {
    let counter = 0;
    let isDesroyed = false;
    const listener = () => counter++;
    $(document).on('click', listener)

    return {
        destroy() {
            $(document).off('click', listener);
            isDesroyed = true
        },
        getClicks() {
            if(isDesroyed) {
                return 'Analytics is destroyed'
            }
            return counter
        }
    }
}

window.analytics = createAnalytics();
