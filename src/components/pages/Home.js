import React from 'react'
import AddTask from '../AddTask'
import SideBar from '../SideBar'
import TaskList from '../TaskList'

export default function Home() {
  return (
    <>
    <div className='text-[#111827]'>
     

        <div className="container relative">

            <SideBar />
            <div className="lg:pl-[16rem] 2xl:pl-[23rem]">
                <main className="relative z-20 max-w-3xl mx-auto rounded-lg xl:max-w-none">

                    <AddTask />
                    <TaskList />
                </main>
            </div>




        </div>

    </div>
    
    
    
    </>
    
  )
}
