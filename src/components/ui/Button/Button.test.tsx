import { render, screen, fireEvent } from '@testing-library/react';
import Button from './Button';

const buttonProps = {
    children: 'Press me',
    onClick: () => { },
    className: 'test-class',
    disabled: false,
    active: false,
}

describe('Button tests', () => {

    test('conponent renders', () => {

        render(<Button {...buttonProps} />)
        const btn = screen.getByRole('button');

        expect(btn).toBeInTheDocument();
        expect(btn).toMatchSnapshot();
    })

    test('click works', () => {
        const clickFn = jest.fn();

        const clickButtonProps = { ...buttonProps, onClick: clickFn }
        render(<Button {...clickButtonProps} />);

        const btn = screen.getByRole('button');
        fireEvent.click(btn);
        expect(clickFn).toBeCalledTimes(1);
    })

    test('apply styling', () => {
        const styleButtonProps = { ...buttonProps, className: 'btn-copy' }
        render(<Button {...styleButtonProps} />);
        const btn = screen.getByRole('button');
        expect(btn).toHaveClass('btn-copy');
    });
})

