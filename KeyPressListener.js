/**
 * KeyPressListener.js
 * A simple reusable keyboard/mouse listener helper.
 *
 * This file is intentionally minimal and focused so it can be imported
 * anywhere without dragging in DOM-specific code.
 */

export class KeyPressListener {
    constructor(key, callback) {
        this.key = key;
        this.callback = callback;

        this.keydownFn = (e) => {
            if (e.key === this.key) {
                this.callback(e);
            }
        };

        document.addEventListener("keydown", this.keydownFn);
    }

    unbind() {
        document.removeEventListener("keydown", this.keydownFn);
    }
}

/**
 * Mouse hold detector (optional)
 * onHold(element, holdTimeMs, onHoldStart, onClick)
 */
export function onHold(element, holdTime, onHoldStart, onClick) {
    let timer = null;

    element.addEventListener("mousedown", (e) => {
        timer = setTimeout(() => onHoldStart(e), holdTime);
    });

    element.addEventListener("mouseup", (e) => {
        clearTimeout(timer);
        onClick(e);
    });
}
