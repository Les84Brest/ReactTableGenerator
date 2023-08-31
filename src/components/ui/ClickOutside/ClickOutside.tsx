import React, {
    ReactNode,
    useEffect,
    RefObject,
    Children,
    createRef,
    ReactElement,
    cloneElement
} from "react";

interface ClickOutsideProps {
    children: ReactNode;
    onClick: (event?: MouseEvent) => void;
}

function ClickOutside({ children, onClick }: ClickOutsideProps) {

    const refs = Children.toArray(children).map(() => createRef<HTMLElement>())

    const handleClick = (event: MouseEvent): void => {
        const { target } = event;
        if (refs?.every(
            (ref) => {
                const elementRef = (
                    ref.current as HTMLElement & { overlayRef: RefObject<HTMLElement> }
                )?.overlayRef?.current || ref.current;

                return !elementRef?.contains(target as HTMLElement);
            },
        )) {
            onClick();
        }
    };

    const handleEscapeKey = (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
            onClick();
        }
    }

    useEffect(function () {
        document.addEventListener("click", handleClick);
        document.addEventListener("keydown", handleEscapeKey)

        return () => {
            document.removeEventListener("click", handleClick);
            document.addEventListener("keydown", handleEscapeKey)
        };
    });

    return React.Children.map(children as ReactElement, (element, idx) =>
        cloneElement(element, { ref: refs[idx] })
    );
}
export default ClickOutside;
