import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Input from './Input';
import exp from 'constants';

const inputProps = {
    id: 'testId',
    className: 'test classes',
    validations:  {minWidth: 5},
    validationStatus: () =>{},
    value: 'test value',
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => 'test changed',
    resetInput: false,
    type: 'text',
    placeholder: 'test placeholder'
}

describe('Input tests', () => {

    test('conponent renders', () => {

        render(<Input {...inputProps} />)
        const input = screen.getByPlaceholderText(/test placeholder/i)

        expect(input).toBeInTheDocument();
        expect(input).toMatchSnapshot();
    })

    // test('type text', () => {

    //     render(<Input {...inputProps} />)
    //     const input = screen.getByPlaceholderText(/test placeholder/i)

    //     userEvent.type(input, 'testText');

    //     expect(screen.getByPlaceholderText(/test placeholder/i)).toContainHTML('testText');
    // })

});