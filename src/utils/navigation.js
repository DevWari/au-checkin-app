/**
 * Navigation
 * Permits navigation from outside of components.
 * For use in utilities, services and sagas
 */

import { NavigationActions } from 'react-navigation';

let navigator = null
export function setTopLevelNavigator(navigatorRef) {	
	navigator = navigatorRef;
}

export function navigate(routeName, params = {}) {
	navigator.dispatch(
		NavigationActions.navigate({
			routeName,
			params,
		}),
	);
}
export function navigateBack() {
	navigator.dispatch(NavigationActions.back());
}

