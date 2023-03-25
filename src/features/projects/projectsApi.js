import { apiSlice } from "../app/apiSlice";

export const projectApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        // endponts here 

        getsProjects: builder.query({
           
            query: () => "/projects"
        }),
        getProject: builder.query({
            query: (projectName) => `/projects?projectName_like=${projectName}`
        })

    })
})

export const {useGetsProjectsQuery, useGetProjectQuery} = projectApi