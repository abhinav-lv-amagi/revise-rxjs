import { useEffect, useState } from "react";
import { from, mergeMap } from "rxjs";

interface IUser {
  id: number;
  name: string;
  timeToArrive: number;
}

const fetchUser = async (id: number) => {
  console.log(`Call to fetch user ${id}`);
  return new Promise<IUser>((resolve) => {
    const time = Math.random() * 2000;
    setTimeout(() => {
      resolve({ id, name: `User ${id}`, timeToArrive: time });
    }, time);
  });
};

/**
 * This component demonstrates the use of `mergeMap` operator.
 * We fetch the user details for 5 users by making calls in parallel
 * to the `fetchUser` function, which simulates a different network latency
 * for each user. See the console logs and the order in which the user details
 * are populated in the component to get an idea.
 * @returns The UserList component
 */
export default function UserList() {
  const [users, setUsers] = useState<IUser[]>([]);
  useEffect(() => {
    console.group("UserList component");
    const userIds = [1, 2, 3, 4, 5];
    const subscription = from(userIds)
      .pipe(mergeMap((id) => fetchUser(id)))
      .subscribe((user) => setUsers((prev) => [...prev, user]));

    console.groupEnd();
    return () => subscription.unsubscribe();
  }, []);

  return (
    <div>
      <h2>Users</h2>
      <p>(mergeMap)</p>
      <ul style={{ marginLeft: "20px", marginTop: "20px" }}>
        {users.map((user) => (
          <li key={user.id}>{`${user.name} - ${(
            user.timeToArrive / 1000
          ).toFixed(2)}s`}</li>
        ))}
      </ul>
    </div>
  );
}
