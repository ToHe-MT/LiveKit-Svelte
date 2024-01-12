<script>
	/** @type {import('./$types').LayoutData} */
	export let data;
  let user=data.session.user
</script>

<svelte:head>
	<title>User Dashboard</title>
</svelte:head>

<h1>User DashBoard</h1>
<h1>Welcome, {user.name}</h1>
<p>Email: {user.email}</p>

<a href='/logout'>Logout</a>
<a href='/protected/videoCall'>VideoCall </a>