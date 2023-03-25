import { apiSlice } from "../app/apiSlice";

export const temApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        // endponts here 
        getsTeams: builder.query({
           
            query: () => "/team"
        }),
        getTeamMember: builder.query({
            query: memberName => `/team?name_like=${memberName}`,
        }),
    })
})
export const {useGetsTeamsQuery,useGetTeamMemberQuery} = temApi;
