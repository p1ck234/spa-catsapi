export async function fetchImages() {
  const response = await fetch(
    "https://api.thecatapi.com/v1/images/search?limit=8",
    {}
  );
  const data = await response.json();
  return data;
}
