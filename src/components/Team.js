import React from 'react';

export default function Team({team}) {
  const {name,avatar} = team || {}
 
  return (
    <div className="checkbox-container">
    <img src={avatar} alt={name} className="team-avater" />
    <p className="label"> {name}</p>
  </div>
  )
}
