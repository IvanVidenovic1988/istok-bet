import { RefObject, useEffect } from 'react';

type UseOnClickOutside = (
    ref: RefObject<HTMLElement>,
    handler: (event?: Event) => void,
) => void;
export const useOnClickOutside: UseOnClickOutside = (ref, handler) => {
    useEffect(() => {
        const listener = (event: Event) => {
            const target = event.target as Node;
            if (!ref.current || ref.current.contains(target)) {
                return;
            }
            handler(event);
        };
        document.addEventListener('mousedown', listener);
        document.addEventListener('touchstart', listener);

        return () => {
            document.removeEventListener('mousedown', listener);
            document.removeEventListener('touchstart', listener);
        };
    }, [ref, handler]);
};