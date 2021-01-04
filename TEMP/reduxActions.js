/*
Actions for updating the chart store:
*/
/* eslint-disable */

// Global ones
const init = (schema) => {
    // Adds the schema as it is to the store
};
const reset = () => {
    // Empty the store
};

// Rest
const addWrapper = (wrapper) => {
    // Adds a wrapper with options and new ID.
    // Empty children.
}
const addChart = (chart, parentId) => {
    // Adds chart with a new ID
    // Adds as a children to the parentId element
}
const remove = (id) => {
    // Removes the element with id from the store
}
const update = (payload, id) => {
    // Overwrites the element with ID with payload
}
const updateAPI = (payload, id) => {
    // ASYNC:
    // Pending: set the API to payload, loading: true
    // Fulfilled: set the data to the returned value, loading: false
    // Error: loading: false, error: true
}
