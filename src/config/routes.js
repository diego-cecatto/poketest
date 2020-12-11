import index from './../views/Home';
import NotFound from './../views/404';

const routes = [
	{ path: '', component: index },
	{ path: '/*', component: NotFound }
]

export default routes;