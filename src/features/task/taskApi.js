import { apiSlice } from "../app/apiSlice";

export const taskApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        // endponts here 
        getsTasks: builder.query({
           
            query: () => "/tasks"
        }),
        getTask: builder.query({
            query: taskId => `/tasks/${taskId}`,
        }),

    
        addTask: builder.mutation({
            query: data => ({
                url:`/tasks`,
                method: "POST",
                body: data
            }),
            async onQueryStarted(arg, { queryFulfilled, dispatch }) {
                const task = await queryFulfilled;

                if (task?.data?.id) {
                    dispatch(
                        apiSlice.util.updateQueryData('getsTasks', undefined,
                            draft => {
                                draft.push(task.data);                                  
                            })
                    );
                }
            }




            
        }),

        editTask: builder.mutation({
            query: ({ taskId, data }) => ({
                url: `/tasks/${taskId}`,
                method: 'PATCH',
                body: data,
            }),
            async onQueryStarted({ taskId, data }, { queryFulfilled, dispatch }) {
                const editedTask = await queryFulfilled;

                if (editedTask?.data?.id) {
                    dispatch(apiSlice.util.updateQueryData('getsTasks', undefined,
                        draft => {
                            // eslint-disable-next-line eqeqeq
                            const editedTaskIndex = draft.findIndex(t => t.id == taskId);

                            draft.splice(editedTaskIndex, 1, editedTask.data);
                        }
                    )
                    );
                }
            }
          
        }),

        deletTask: builder.mutation({
            query: (taskId) => ({
                url: `/tasks/${taskId}`,
                method: 'DELETE',
                
            }),
            async onQueryStarted(taskId, { queryFulfilled, dispatch }) {
                let patchResult = dispatch(
                    apiSlice.util.updateQueryData('getsTasks', undefined,
                        draft => {
                            // eslint-disable-next-line eqeqeq
                            const deletedTaskIndex = draft.findIndex(t => t.id == taskId);

                            draft.splice(deletedTaskIndex, 1);
                        })
                );

                await queryFulfilled.catch(() => {
                    patchResult.undo();
                });
            }

        }),

        updateStatus: builder.mutation({
            query: ({ taskId, data }) => ({
                url: `/tasks/${taskId}`,
                method: 'PATCH',
                body: data,
            }),
        }),
       


    
       
    }),
})
export const {useGetsTasksQuery, useAddTaskMutation, useGetTaskQuery, useEditTaskMutation, useDeletTaskMutation, useUpdateStatusMutation} = taskApi;


 // GET Query to get a single team member from the server by name
//  getTeamMember: builder.query({
//     query: memberName => `/team?name_like=${memberName}`,
// }),

// addTask: builder.mutation({
//     query: data => ({
//         url: '/tasks',
//         method: 'POST',
//         body: data,
//     }),