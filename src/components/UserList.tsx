import { useEffect, useState } from "react";
import { from, mergeMap, tap } from "rxjs";

interface IUser {
  id: number;
  name: string;
}

const fetchUser = async (id: number) => {
  return new Promise<IUser>((resolve) => {
    setTimeout(() => {
      resolve({ id, name: `User ${id}` });
    }, 1000 * Math.random() * 5);
  });
};

export default function UserList() {
  const [users, setUsers] = useState<IUser[]>([]);

  useEffect(() => {
    const userIds = [1, 2, 3, 4, 5];

    const subscription = from(userIds)
      .pipe(
        mergeMap((id) => fetchUser(id)),
        tap((user) => console.log(`Fetched user: ${user.name}`))
      )
      .subscribe((user) => setUsers((prev) => [...prev, user]));

    return () => subscription.unsubscribe();
  }, []);

  return (
    <div>
      <h2>Users</h2>
      <ul>
        {users.map((user) => (
          <li key={user.id}>{user.name}</li>
        ))}
      </ul>
    </div>
  );
}
