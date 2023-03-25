import { createSlice } from '@reduxjs/toolkit';

// initial state
const initialState = {
    filterBy: ['Scoreboard',
        'Flight Booking',
        'Product Cart',
        'Book Store',
        'Blog Application',
        'Job Finder'],
    searchBy: '',
};

// creating the filter feature slice here
const filtersSlice = createSlice({
    name: 'filters',
    initialState,
    reducers: {
        alterFilter: (state, action) => {
            if (action.payload.isChecked && !state.filterBy.includes(action.payload.value)) {
                state.filterBy.push(action.payload.value);
            } else {
                state.filterBy = state.filterBy.filter(filterText => filterText !== action.payload.value);
            }
        },
        alterSearch: (state, action) => {
            state.searchBy = action.payload;
        }
    },
});

export const {
    alterFilter,
    alterSearch,
} = filtersSlice.actions;
export default filtersSlice.reducer;