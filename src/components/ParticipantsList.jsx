import React from "react";

function ParticipantsList({ participants }) {
  return (
    <>
      <aside className="w-1/4 bg-gray-800 text-white p-4">
        <h2 className="text-lg font-bold mb-4">
          Participants <span>{participants.length}</span>
        </h2>
        <ul>
          {participants.map((participant) => {
            return (
              <li className="flex items-center mb-2">
                <span className="bg-green-500 h-3 w-3 rounded-full mr-2"></span>
                {participant}
              </li>
            );
          })}
        </ul>
      </aside>
    </>
  );
}

export default ParticipantsList;
