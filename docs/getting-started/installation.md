# Installation

You can simply `ember install` the dependency like normal:

```sh
ember install ember-cli-typescript@latest
```

All dependencies will be added to your `package.json`, and you're ready to roll! **If you're upgrading from a previous release, see below!** you should check to merge any tweaks you've made to `tsconfig.json`.

Installing ember-cli-typescript modifies your project in two ways:

- installing a number of other packages to make TypeScript work in your app or addon
- generating a number of files in your project

## Other packages this addon installs

We install all of the following   packages at their current "latest" value, :

- `typescript`
- `ember-cli-typescript-blueprints`
- `@types/ember`
- `@types/ember-data`
- `@types/ember__*`
- `@types/ember-data__*`
- `@types/rsvp`
- `@types/ember__test-helpers`

## Files this addon generates

We add the following files to your project:

- [`tsconfig.json`](https://www.typescriptlang.org/docs/handbook/tsconfig-json.html)
- `types/<app name>/index.d.ts` – the location for any global type declarations you need to write for you own application; see [**Using TS Effectively: Global types for your package**](./docs/ts/using-ts-effectively#global-types-for-your-package) for information on its default contents and how to use it effectively
- `app/config/environment.d.ts` – a basic set of types defined for the contents of the `config/environment.js` file in your app; see [Environment and configuration typings](#environment-and-configuration-typings) for details