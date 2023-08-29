export type SelectItem = {
    id: number,
    name: string
}

export interface SelectProps {
    currentLabel: string,
    itemsList: SelectItem[],
    onChoose: (value: SelectItem) => void,
    className: string,
    value: SelectItem
}

export interface SelectOptionProps {
    onClick: (value: SelectItem)=>void,
    children: string,
    value: SelectItem,
}
