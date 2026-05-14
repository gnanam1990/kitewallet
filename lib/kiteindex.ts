const KITEINDEX_URL =
  process.env.NEXT_PUBLIC_KITEINDEX_URL ||
  "http://localhost:42069/graphql/public";

export async function gqlQuery<T>(
  query: string,
  variables?: Record<string, unknown>
): Promise<T> {
  const res = await fetch(KITEINDEX_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ query, variables }),
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error(`KiteIndex HTTP error: ${res.status} ${res.statusText}`);
  }

  const json = await res.json();

  if (json.errors?.length) {
    throw new Error(
      `GraphQL error: ${json.errors.map((e: { message: string }) => e.message).join(", ")}`
    );
  }

  return json.data as T;
}
