import { useEffect, useRef, useState } from 'react';

export const useMountEffect = (fun) => useEffect(fun, []);

export const usePrevious = (value) => {
    const ref = useRef();
    useEffect(() => ref.current = value);
    return ref.current;
};

export const useChangeEffect = (effectFunction, values) => {
    const previousValues = usePrevious(values);
    useEffect(() => {
        const changed = values.some((value, index) => previousValues && !Object.is(value, previousValues[index]));
        if (changed) return effectFunction();
    }, values);
};

export const useSetState = (initialState) => {
    const [state, setState] = useState(initialState);
    const callbackRef = useRef(() => undefined);

    const setStateCB = (newState, callback) => {
        callbackRef.current = callback;
        setState(newState);
    };

    useEffect(() => {
        callbackRef.current?.();
    }, [state]);

    return [state, setStateCB];
};