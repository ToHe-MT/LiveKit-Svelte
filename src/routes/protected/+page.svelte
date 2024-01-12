<script>
  /** @type {import('./$types').LayoutData} */
  export let data;
  let user = data.session.user;
</script>

<svelte:head>
  <title>User Dashboard</title>
</svelte:head>

<style>
  body {
    font-family: 'Arial', sans-serif;
    background-color: #f4f4f4;
    margin: 0;
    padding: 0;
    text-align: center;
  }

  h1 {
    color: #333;
    margin-top: 30px;
  }

  p {
    color: #555;
    font-size: 18px;
    margin-bottom: 20px;
  }

  a {
    display: inline-block;
    padding: 10px 20px;
    margin: 10px;
    text-decoration: none;
    color: #fff;
    border-radius: 5px;
    transition: background-color 0.3s ease;
  }

  a.logout {
    background-color: #dc3545;
  }

  a.videoCall {
    background-color: #007bff;
  }

  a:hover {
    opacity: 0.8;
  }
</style>

<body>
  <h1>User Dashboard</h1>
  <h1>Welcome, {user.name}</h1>
  <p>Email: {user.email}</p>
  <a href='/logout' class="logout">Logout</a>
  <a href='/protected/videoCall' class="videoCall">Video Call</a>
</body>