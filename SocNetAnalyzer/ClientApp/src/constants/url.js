const API_URL = 'http://localhost:64240'

export const getUrl = path => 
    `${API_URL}${path}`;

export const getDatasetsUrl = path => 
    getUrl(`/api/dataset/${path}`);