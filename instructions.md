## Configure

### Register provider

The provider must be registered as a `provider`.

```javascript
const providers = [...,'adonis-vitejs/providers/ViteProvider'];
```

## Register your routes

```javascript
const Route = use('Route');
const Vite = use('Adonis/Addons/Vite');
const handler = Vite.getRequestHandler();

// API Endpoint for your database
Route.get('/api', ({ request }) => {
	return { greeting: "I'm Api Endpoint" };
});

// * Vite Routes
Route.get('/b', ({ request, response }) => {
	const query = request.get();
	return Vite.render(request.request, response.response, '/b', query);
});

Route.get('/post/:id', ({ request, response, params }) =>
	Vite.render(request.request, response.response, '/b', {
		id: params.id
	})
);

Route.get(
	'*',
	({ request, response }) =>
		new Promise((resolve, reject) => {
			handler(request.request, response.response, promise => {
				promise.then(resolve).catch(reject);
			});
		})
);
```

## Adding vite.js folder

The vite project directory is `vite` by default, but you can change it using environment variables `VITE_FOLDER`.

## Register vite.js Commands

```json
{
	"scripts": {
		"dev": "node server.js",
		"build": "vite build ./vite",
		"export": "vite export ./vite",
		"start": "NODE_ENV=production node server.js"
	}
}
```
