import React from 'react'
import SelectMenu from './FormEliments/SelectMenu';

const categories = [
    {
        value: 1,
        name: "Area 1",
        content: "a,a,a,a,a"
    },
    {
        value: 2,
        name: "Area 2",
        content: "a,a,a,a,a"
    },
    {
        value: 3,
        name: "Area 3",
        content: "a,a,a,a,a"
    },
];

function AreaSelect() {
  return (
    <div>
    <SelectMenu Items={categories} Title="Select Area"/>
    </div>
  )
}

export default AreaSelect
