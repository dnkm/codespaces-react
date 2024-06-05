import ClubList from "../../components/club-list";

export default function UserHome() {
  return (
    <div>
      <h1>My Clubs</h1>
      <ClubList myClubsOnly={true} />
    </div>
  );
}

