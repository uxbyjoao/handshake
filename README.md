# Handshake

A simple, minimal, one-page "virtual greeting card" generator, built with GitHub Pages in mind. Change a `config.yml`, pick a theme, run a Gulp process, push the repo to GitHub, and you're done.

## Getting Started

1. Clone this repo.
2. **Important:** Rename your repo on GitHub to match [GitHub Pages' rules](https://pages.github.com/), meaning the repo should be named `<yourusername>.github.io` if you want your URL to be something like `http://<yourusername>.github.io/`.
3. Run `npm install` to install dependencies.
4. Run `gulp serve` to build your assets and run your local server with BrowserSync. Your site will be up on `http://localhost:3000`.
5. Change the `config.yml` file on the root folder to suit your needs. Change the text, try themes and add icons.
6. When you're ready to publish, just push the repo to your `master` branch on GitHub, and voilá! Your site should be up and running.

## Project Structure

```
Handshake
|-- /src
|   |-- /scripts
|   |-- /styles
|   |-- /templates
|   `-- index.pug
|-- config.yml
`-- gulpfile.js
```

* `src` folder: Gulp will grab these assets and build your site out of them.
  - `scripts` folder: There's a `scripts.js` file in here, but it's empty. I've included it in case you want to include scripts in your page, like animations or some jQuery.
  - `styles` folder: Sass files and Theme files are in here.
  - `templates` folder: Includes for `index.pug`
  - `index.pug`: Gets rendered into your `index.html`, courtesy of Pug.
* `config.yml`: Your configuration file. This is probably the only thing you'll need to touch. See below.
* `gulpfile.js`: Build process for Gulp.

## Config File

If you're not customizing anything on Handshake, the `config.yml` file on the project's root folder is probably the only file you'll ever have to edit to get going. Here you'll specify everything about your site, from the text to the themes, and even a custom destination folder if you need one. By changing values here, the build process should take care of everything for you. These values are:

* `theme` (optional): Specify a theme. If no value is specified, the build engine will default to `mono`.
* `distFolder` (optional): Specify a custom folder where your site will be built. Generally you don't want to change this if you're hosting your site on GitHub Pages (see the "Getting Started" section), but if you want to host it elsewhere, you can use this feature. If no value is specified, the site will be built at the project's root folder.
* `templateLocals`: This is where you customize your title, text, meta description, add icons to the bottom bar, and everything else. There are several subfields here, so let's go through them one by one:
  - `name`: Your name, or your product's name, or whatever. This is the first half in the `<title>` tag.
  - `title`: A tagline, which goes to the second half in the `<title>` tag.
  - `description`: Gets used in the `<meta>` tag inside the `<head>`.
  - `text`: Your site's texts, which consist of:
    - `heading`: The big heading you see.
    - `body`: The body below the heading. This supports Markdown, so if you need to add `<em>` or `<a>` tags, just use Markdown syntax and it'll parse it for you.
  - `icons`: This is a list of icons which gets rendered on the site's bottom bar. Every icon has these properties:
    - `id`: This must be a FontAwesome `fa-<icon>` icon class, only without the `fa-` prefix. Say you want a GitHub icon. This should read `github`. Note that this is case sensitive. You can use [any icon available in FontAwesome](http://fontawesome.io/icons/).
    - `url`: The destination URL for the icon's link.
    - `title` (optional): You can optionally add this, as it gets thrown in the `<a>` tag as a `title` property.

If you're customizing the templates in the `src/templates` folder, `templateLocals` gets parsed into a JavaScript object and is passed to Pug as template locals, so you can add custom fields to it if you want to use them down in the templates.

## Default Themes

We provide you with 6 default color themes: `cookie`, `fresh`, `ketchup`, `mono`, `orbit` & `salmon`. Try them all! :)

## Writing Custom Themes

If you want to create a custom color theme (please do, and submit a pull request with it! I'll be very happy), you can do so by following these steps:

1. Duplicate one of the folders inside `src/styles/themes`; any one will be fine.
2. Rename the folder to whatever you want your new theme to be called.
3. Edit your `config.yml`'s `theme` property to point to your new theme. This should be the same as your new theme's folder name in Step 2.
4. Edit the variables in your new theme's `theme.scss` file to your liking.

**Important!** Every theme **MUST** have a `theme.scss` file inside its folder. Gulp dynamically injects a theme when compiling your Sass by looking for a file called `theme.scss` inside `src/styles/themes/<theme-name>`, where `<theme-name>` is whatever the `theme` property in your `config.yml` is. If there is no `theme.scss` file, your build process will crash.

## Customizing a Theme

You can access the default themes in your `src/styles/themes` folder. Every theme has its own folder, and inside each one there is a `theme.scss` folder. Change the variables in these to your liking.

## Gulp Tasks

* `gulp`: Equivalent to `gulp serve`: will compile Pug & Sass and minify everything, then will serve these at `http://localhost:3000` for previewing.
* `gulp pug`: Compiles Pug templates.
* `gulp sass`: Compiles and minifies Sass.
* `gulp scripts`: Placeholder task for scripts build, if you need it. By default, Handshake has no JavaScript on the front-end.
* `gulp build`: Builds your site.
* `gulp serve`: See default task, `gulp`.

---
Built with love, for great practice, by [João Gomes](http://www.twitter.com/joaobelve).
