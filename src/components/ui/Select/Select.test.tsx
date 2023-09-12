import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { SelectItem } from './types';
import Select from './Select';

const selectProps = {
    currentLabel: 'Test label',
    itemsList: [{
        id: 1,
        name: 'City1'
    },
    {
        id: 2,
        name: 'City2'
    }
    ],
    onChoose: (value: SelectItem) => { },
    className: 'select__testclass',
    value: null,
}

describe('Custom select test', () => {
    it('render select', () => {
        render(<Select {...selectProps} />)

        const selectLabel = screen.getByText(/test label/i);
        expect(selectLabel).toBeInTheDocument();

    })

    test('select open', () => {
        render(<Select {...selectProps} />)

        const selectLabel = screen.getByText(/test label/i);
        expect(screen.queryByRole('list')).toBeNull();

        userEvent.click(selectLabel);

        expect(screen.getByRole('list')).toBeInTheDocument();
        expect(screen.getAllByRole('listitem')).toHaveLength(2);
    })

    test('select option selection', () => {
        render(<Select {...selectProps} />)

        const selectLabel = screen.getByText(/test label/i);
        userEvent.click(selectLabel);

        expect(screen.getByRole('list')).toBeInTheDocument();
        const listItem = screen.getByText(/city2/i);

        userEvent.click(listItem);
        expect(screen.queryByRole('list')).toBeNull();
    })
})