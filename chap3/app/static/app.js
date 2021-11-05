async function load() {
  const jsonData = await fetch('/posts');
  const posts = await jsonData.json();

  console.log(posts);
}

load();