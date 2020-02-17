function createAnalytics() {
    let counter = 0;
    let isDesroyed = false;
    const listener = () => counter++;
    document.addEventListener('click', listener)

    return {
        destroy() {
            document.removeEventListener('click', listener);
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