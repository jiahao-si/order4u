/**
 * like redux.bindActionCreators but do it recurisivly
 * */
import * as Redux from 'redux'

export function bindActionCreators<T>(actions: T, dispatch: Redux.Dispatch<any>): T {
    if (typeof actions !== 'object' || !actions) {
        throw new RangeError('invalid actions!');
    }

    let result: any = {};

    for (let key in actions) {
        if (!actions.hasOwnProperty(key)) {
            continue;
        }
        const creator = actions[key] as any;
        if (typeof creator === "object" && creator) {
            result[key] = bindActionCreators(creator, dispatch);
        }
        else if (typeof creator === 'function') {
            result[key] = (...args: any[]) => dispatch(creator(...args));
        }
    }

    return result as T;
}