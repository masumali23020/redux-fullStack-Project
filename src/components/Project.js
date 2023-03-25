import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { alterFilter } from '../features/filter/filterSlice';

export default function Project({project }) {
  const { projectName, colorClass } = project || {};

    // integration of react-redux hooks here
    const dispatch = useDispatch();

    // integration or react hooks here
    const [isChecked, setIsChecked] = useState(true);

    // handler function for altering the filter state here
    const alterFilterHandler = e => {
        dispatch(alterFilter({
            value: projectName,
            isChecked: e.target.checked,
        }));
        setIsChecked(e.target.checked);
    }

    // rendering a single project list item component here
    return (
        <div className={`checkbox-container ${colorClass}`}>
            <input type='checkbox' onChange={alterFilterHandler} className={colorClass} checked={isChecked} />
            <p className='label'>{projectName}</p>
        </div>
    );
};


