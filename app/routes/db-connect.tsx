import { Suspense } from "react";

import type { PrismaClient, User } from "@prisma/client";
import type { LoaderFunctionArgs } from "@remix-run/cloudflare";
import { Await, useLoaderData } from "@remix-run/react";

async function getUsers(client: PrismaClient): Promise<User[]> {
  try {
    const users = await client.user.findMany();
    return users
  } catch (error) {
    console.error(error)
    throw new Error('Failed to fetch users')
  }
}

export async function loader({ context }: LoaderFunctionArgs) {
  const users = getUsers(context.db)
  return { users };
}

export default function DbConnectPage() {
  const { users } = useLoaderData<typeof loader>();

  return (
    <div>
      <h1 className="text-2xl">DB（Turso）からデータを取得</h1>

      <Suspense
        fallback={
          <div>
            <p>loading...</p>
          </div>
        }
      >
        <Await resolve={users} errorElement={<p>error</p>}>
          {(users) => {
            console.dir(users);
            if (!users) {
              return <p>no data</p>
            }

            return <ul>
              {users.map((user) => <li key={user.id}>{user.email}</li>)}
            </ul>
          }}
        </Await>
      </Suspense>
    </div>
  );
}
