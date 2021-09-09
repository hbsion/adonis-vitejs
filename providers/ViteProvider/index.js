/**
 * adonis-vitejs-provider
 *
 * (c) Omar Khatib
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

const vite = require('vite');
const { ServiceProvider } = require('@adonisjs/fold');

class ViteProvider extends ServiceProvider {
	/**
	 * Returns the first argv from the argvs list
	 *
	 * @method _getFirstArg
	 *
	 * @return {String}
	 *
	 * @private
	 * src: https://github.com/adonisjs/adonis-antl/blob/develop/providers/AntlProvider.js
	 */

	getFirstArg() {
		return process.argv.slice(2)[0] || '';
	}

	/**
	 * Register all the required providers
	 *
	 * @method register
	 *
	 * @return {void}
	 */
	async register() {
		const Helpers = this.app.use('Adonis/Src/Helpers');
		const Env = this.app.use('Adonis/Src/Env');

		this.app.singleton('Adonis/Addons/Vite', app => {
			const dev = process.env.NODE_ENV !== 'production';
			const mode = dev ? 'development' : 'production';
			const dirName = Env.get('VITE_FOLDER', 'vite');
			const root = Helpers.appRoot(dirName);
			return vite.createServer({root,mode});
		});

		this.app.alias('Adonis/Addons/Vite', 'Vite');
	}

	async boot() {
		const Helpers = this.app.use('Adonis/Src/Helpers');
		const Vite = this.app.use('Vite');

		if (Helpers.isAceCommand() && !this.getFirstArg().includes('serve')) {
			return;
		}
		
		await Vite.prepare();
	}
}

module.exports = ViteProvider;
