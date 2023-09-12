/* eslint-disable testing-library/no-debugging-utils */
import { render, screen, fireEvent } from '@testing-library/react';
import AddDataForm from './AddDataForm';
import { FormMode } from './types';
import { renderWithRedux } from '../../tests/helper/renderWithRedux';
import { MAIN_TABLE_ID } from '../../redux/config';
import userEvent from '@testing-library/user-event';

const addDataFormProps = {
    mode: FormMode.MODE_ADD,
    submitButtonLabel: 'submit',
    className: 'AddDataForm__test-class'
}

const editDataFormProps = {
    mode: FormMode.MODE_EDIT,
    submitButtonLabel: 'Agree',
    className: 'AddDataForm__edit'
}

const tablesInitialState = {
    editTableId: '',
    editRowId: '',
    tables: {
        [MAIN_TABLE_ID]: [
            {
                workerName: 'Joe',
                surname: 'Doe',
                age: '27',
                city: 'New York',
                id: '1'
            }
        ],
        '1': [
            {
                workerName: 'Some',
                surname: 'Else',
                age: '47',
                city: 'Paris',
                id: '1'
            }
        ]
    }
}

const editDataState = {
    ...tablesInitialState,
    editTableId: MAIN_TABLE_ID,
    editRowId: '1',
}


describe('AddDataForm tests', () => {

    test('AddDataForm renders', () => {

        render(renderWithRedux(<AddDataForm {...addDataFormProps} />, {
            table: tablesInitialState
        }))
        const btnSubmit = screen.getByRole('button');
        const inputName = screen.getByPlaceholderText('Name');
        const inputSurname = screen.getByPlaceholderText(/surname/i);
        const inputAge = screen.getByPlaceholderText(/age/i);

        expect(btnSubmit).toBeInTheDocument();
        expect(inputName).toBeInTheDocument();
        expect(inputSurname).toBeInTheDocument();
        expect(inputAge).toBeInTheDocument();
    })

    test('input name', () => {
        render(renderWithRedux(<AddDataForm {...addDataFormProps} />, {
            table: tablesInitialState
        }))

        const inputName = screen.getByPlaceholderText('Name');

        expect(inputName).toHaveDisplayValue('');

        fireEvent.change(inputName, {
            target: { value: 'Test' }
        });

        expect(screen.getByPlaceholderText('Name')).toHaveDisplayValue('Test');

    });

    test('input surname', () => {
        render(renderWithRedux(<AddDataForm {...addDataFormProps} />, {
            table: tablesInitialState
        }))

        const input = screen.getByPlaceholderText(/surname/i);

        expect(screen.getByPlaceholderText(/surname/i)).toHaveDisplayValue('');

        fireEvent.change(input, {
            target: { value: 'Test' }
        });

        expect(screen.getByPlaceholderText(/surname/i)).toHaveDisplayValue('Test');

    });

    test('input age', () => {
        render(renderWithRedux(<AddDataForm {...addDataFormProps} />, {
            table: tablesInitialState
        }))

        const input = screen.getByPlaceholderText(/age/i);

        expect(screen.getByPlaceholderText(/age/i)).toHaveDisplayValue('');

        fireEvent.change(input, {
            target: { value: '30' }
        });

        expect(screen.getByPlaceholderText(/age/i)).toHaveDisplayValue('30');

    });

    test('save data', () => {
        render(renderWithRedux(<AddDataForm {...addDataFormProps} />, {
            table: tablesInitialState
        }))

        const inputName = screen.getByPlaceholderText('Name');
        const inputSurname = screen.getByPlaceholderText(/surname/i);
        const inputAge = screen.getByPlaceholderText(/age/i);

        userEvent.type(inputName, 'TestName');
        userEvent.type(inputSurname, 'TestSurname');
        userEvent.type(inputAge, '19');

        const selectLabel = screen.getByText(/city/i);

        userEvent.click(selectLabel);

        const listItems = screen.getAllByRole('listitem');

        userEvent.click(listItems[0]);
        const btn = screen.getByRole('button');

        expect(btn).not.toBeDisabled();

        userEvent.click(btn);
        expect(btn).toBeDisabled();
    })
})

describe('Edit data tests', () => {
    test('Render edit', () => {
        render(renderWithRedux(<AddDataForm {...editDataFormProps} />, {
            table: editDataState
        }))

        const btnSubmit = screen.getByRole('button');

        const inputName = screen.getByPlaceholderText('Name');
        const inputSurname = screen.getByPlaceholderText(/surname/i);
        const inputAge = screen.getByPlaceholderText(/age/i);

        expect(btnSubmit).toBeInTheDocument();
        expect(btnSubmit).toHaveTextContent('Agree');

        expect(inputName).toBeInTheDocument();
        expect(inputName).toHaveDisplayValue('Joe');

        expect(inputSurname).toBeInTheDocument();
        expect(inputSurname).toHaveDisplayValue('Doe');

        expect(inputAge).toBeInTheDocument();
        expect(inputAge).toHaveDisplayValue('27');
    });

    describe('Validation data tests', () => {

        test('Age less than', () => {
            render(renderWithRedux(<AddDataForm {...addDataFormProps} />, {
                table: tablesInitialState
            }))

            const input = screen.getByPlaceholderText(/age/i);

            userEvent.type(input, '13');
            userEvent.tab();
            expect(screen.getByText(/age[\s1-9<>]*/i)).toBeInTheDocument();
        });

        test('Age 18', () => {
            render(renderWithRedux(<AddDataForm {...addDataFormProps} />, {
                table: tablesInitialState
            }))
            const nameInput = screen.getByPlaceholderText(/surname/i);
            const input = screen.getByPlaceholderText(/age/i);
            fireEvent.change(input, { target: { value: '18' } })
            fireEvent.click(nameInput);
            expect(screen.queryByText(/age[\s1-9<>]*/i)).not.toBeInTheDocument();
        });

        test('Age is correct', () => {
            render(renderWithRedux(<AddDataForm {...addDataFormProps} />, {
                table: tablesInitialState
            }))
            const input = screen.getByPlaceholderText(/age/i);

            userEvent.type(input, '30');
            userEvent.tab();

            expect(screen.queryByText(/age[\s1-9<>]*/i)).not.toBeInTheDocument();
        });

        test('Age 60', () => {
            render(renderWithRedux(<AddDataForm {...addDataFormProps} />, {
                table: tablesInitialState
            }))
            const input = screen.getByPlaceholderText(/age/i);
            userEvent.type(input, '60');
            userEvent.tab();

            expect(screen.queryByText(/age[\s1-9<>]*/i)).not.toBeInTheDocument();
        });

        test('Age more than', () => {
            render(renderWithRedux(<AddDataForm {...addDataFormProps} />, {
                table: tablesInitialState
            }))
            const input = screen.getByPlaceholderText(/age/i);
            userEvent.type(input, '65');
            userEvent.tab();

            expect(screen.getByText(/age[\s1-9<>]*/i)).toBeInTheDocument();
        });

        test('Name empty value', () => {
            render(renderWithRedux(<AddDataForm {...addDataFormProps} />, {
                table: tablesInitialState
            }))
            const input = screen.getByPlaceholderText('Name');
            userEvent.type(input, 'test text');
            userEvent.clear(input);
            userEvent.tab();

            expect(screen.getByText(/Empty value/i)).toBeInTheDocument();
        });

        test('Name short value', () => {
            render(renderWithRedux(<AddDataForm {...addDataFormProps} />, {
                table: tablesInitialState
            }))
            const input = screen.getByPlaceholderText('Name');
            userEvent.type(input, 'foo');
            userEvent.tab();

            expect(screen.getByText(/Length/i)).toBeInTheDocument();
        });

        test('Name correct value', () => {
            render(renderWithRedux(<AddDataForm {...addDataFormProps} />, {
                table: tablesInitialState
            }))
            const input = screen.getByPlaceholderText('Name');
            userEvent.type(input, 'Justin');
            userEvent.tab();

            expect(screen.queryByText(/Length/i)).not.toBeInTheDocument();
        });
    });
})

