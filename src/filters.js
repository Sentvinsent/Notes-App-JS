const filters = {
    searchTxt: '',
    sortBy: 'byEdited'
}

const getFilters = () => filters

const setFilters = (updates) => {
    if (typeof(updates.searchTxt) === 'string') {
        filters.searchTxt = updates.searchTxt
    }
    if (typeof(updates.sortBy) === 'string') {
        filters.sortBy = updates.sortBy
    }
}

export { getFilters, setFilters }