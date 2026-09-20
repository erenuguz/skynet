import {forwardRef} from 'react';
import './IconButton.css';

const IconButton = forwardRef(function IconButton(
    {label, children, className = '', ...buttonProps},
    ref
) {
    const classNames = ['icon-button', className].filter(Boolean).join(' ');

    return (
        <button
            {...buttonProps}
            ref={ref}
            className={classNames}
            type="button"
            aria-label={label}
            title={label}
        >
            {children}
        </button>
    );
});

export default IconButton;
