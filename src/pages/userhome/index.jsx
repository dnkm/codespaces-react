import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AppContext } from "../../App";
import useClubs from "../../hooks/useClubs";

export default function UserHome() {
  let { user } = useContext(AppContext);
  let [reveal, setReveal] = useState(false);

  let { clubs: items, page, setPage, numPages } = useClubs({ myClubs: true });

  let nitems = [];

  console.log(111, items);
  console.log(222, nitems);

  return (
    <div>
      <div className="mb-2">
        Welcome <strong>{user.full_name}!</strong>
      </div>
      <div>
        {items.map((v) => (
          <div
            className="flex flex-col border-2 p-2 border-secondary w-1/3 mb-4"
            key={v.club_id}
          >
            <Link to={`/club/${v.club_id}`} className="text-xl mb-2">
              {v.name}
            </Link>
            {/* <div className="text-sm text-gray-500">Created at {v.created_at}</div> */}

            <div className="flex">
              <button
                disabled={v.club_memberships?.length > 0}
                className="btn btn-xs btn-success mr-4"
                onClick={() => handleJoinClub(v.club_id)}
              >
                Join
              </button>
              {user.roles.is_admin && (
                <div>
                  <button
                    className="btn btn-xs btn-warning mr-4"
                    onClick={() => handleUpdateClub(v.club_id)}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-xs bg-red-400"
                    onClick={() => handleDeleteClub(v.club_id)}
                  >
                    {" "}
                    Delete
                  </button>
                </div>
              )}
            </div>
          </div>
        ))}

        <div className="flex justify-center gap-x-5">
          {new Array(numPages).fill(0).map((v, i) => (
            <div
              key={i}
              className="border-r px-5 cursor-pointer hover:bg-purple-500"
              onClick={() => setPage(i + 1)}
            >
              {i + 1}
            </div>
          ))}
        </div>
        <hr className="my-5" />

        {reveal && (
          <div>
            <div className="divider divider-primary"></div>
            {nitems.map((v) => (
              <div
                className="flex flex-col border-2 p-2 border-secondary w-1/3 mb-4"
                key={v.club_id}
              >
                <div className="text-xl mb-2">{v.name}</div>
                {/* <div className="text-sm text-gray-500">Created at {v.created_at}</div> */}

                <div className="flex">
                  <button
                    className="btn btn-xs btn-success mr-4"
                    onClick={() => handleJoinClub(v.club_id)}
                  >
                    Join
                  </button>
                  {user.roles.is_admin && (
                    <div>
                      <button
                        className="btn btn-xs btn-warning mr-4"
                        onClick={() => handleUpdateClub(v.club_id)}
                      >
                        Edit
                      </button>
                      <button
                        className="btn btn-xs bg-red-400"
                        onClick={() => handleDeleteClub(v.club_id)}
                      >
                        {" "}
                        Delete
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      {!user.roles.is_admin && (
        <button className="btn" onClick={() => setReveal(!reveal)}>
          {!reveal ? "Join New Club" : "Cancel"}
        </button>
      )}
      {user.roles.is_admin && (
        <button className="btn btn-primary" onClick={handleCreateClub}>
          Create Club
        </button>
      )}
    </div>
  );
}
