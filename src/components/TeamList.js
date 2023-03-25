import React from 'react';
import { useGetsTeamsQuery } from '../features/team/teamApi';
import Team from './Team';

export default function TeamList() {

  const {data:teams, isLoading, isError, error} = useGetsTeamsQuery();



  // decide what to render 
  let content = null;
  if(isLoading) content = <p>loading</p>;
  if(!isLoading && isError)content = <p> {error}</p>
  if(!isLoading && !isError && teams.length === 0)content = <p>No project found !</p>
  if(!isLoading && !isError && teams.length > 0){
    content = teams.map(team => <Team key={team.id}  team={team} /> )
  }
  return (
    <div>
        <h3 className="text-xl font-bold">Projects</h3>
        <div className="mt-3 space-y-4">
          {content}
          

          
        </div>
      </div>
  )
}
