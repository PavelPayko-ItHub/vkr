import type { SelectProps } from "antd"

export const roomDict = {
    auditorium: 'аудитория',
    coworking: 'коворкинг',
    cinema: 'кинозал'
}

export  const paymentDict = {
    cash: 'наличными',
    transfer: 'переводом по номеру телефона',
}

export const statusDict = {
    new: 'Новая',
    assigned: 'Мероприятие назначено',
    completed: 'Мероприятие завершено'
}

export  const roomOptions: SelectProps['options'] = [
    {value: 'auditorium', label: 'аудитория'},
    {value: 'coworking', label: 'коворкинг'},
    {value: 'cinema', label: 'кинозал'},
]
  
export const paymentOptions: SelectProps['options'] = [
    {value: 'cash', label: 'наличными'},
    {value: 'transfer', label: 'переводом по номеру телефона'},
] 