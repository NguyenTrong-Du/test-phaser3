export const metamaskChecking = async () => {
  const response = await fetch(
    'https://jsonplaceholder.typicode.com/todos?_limit=6'
  );
  return await response.json();
};
