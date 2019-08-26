# Current limitations

While TS already works nicely for many things in Ember, there are a number of corners where it _won't_ help you out. Some of them are just a matter of further work on updating the [existing typings]; others are a matter of further support landing in TypeScript itself, or changes to Ember's object model.

[existing typings]: https://github.com/DefinitelyTyped/DefinitelyTyped/tree/master/types/ember

## Some `import`s don't resolve

You'll frequently see errors for imports which TypeScript doesn't know how to resolve. For example, if you use Ember Concurrency today and try to import its `task` helper:

```typescript
import { task } from 'ember-concurrency';
```

You'll see an error, because there aren't yet type definitions for it. You may see the same with some addons as well. **These won't stop the build from working;** they just mean TypeScript doesn't know where to find those.

Writing these missing type definitions is a great way to pitch in! Jump in `#e-typescript` on the [Ember Community Discord server](https://discord.gg/zT3asNS) and we'll be happy to help you.

## Templates

Templates are currently totally non-type-checked. This means that you lose any safety when moving into a template context, even if using a Glimmer `Component` in Ember Octane.

Addons need to import templates from the associated `.hbs` file to bind to the layout of any components they export. The TypeScript compiler will report that it cannot resolve the module, since it does not know how to resolve files ending in `.hbs`. To resolve this, you can provide this set of definitions to `my-addon/types/global.d.ts`, which will allow the import to succeed:

    {{#docs-snippet name='my-addon.d.ts' title='my-addon/types/global.d.ts' showCopy=true language='ts'}}
    declare module '*/template' {
      import { TemplateFactory } from 'htmlbars-inline-precompile';

      const template: TemplateFactory;
      export default template;
    }

    declare module 'app/templates/*' {
      import { TemplateFactory } from 'htmlbars-inline-precompile';

      const template: TemplateFactory;
      export default template;
    }

    declare module 'addon/templates/*' {
      import { TemplateFactory } from 'htmlbars-inline-precompile';

      const template: TemplateFactory;
      export default template;
    }
    {{/docs-snippet}}

## Invoking actions

TypeScript won't detect a mismatch between this action and the corresponding call in the template:

    {{#docs-snippet name='my-game.ts' title='my-app/components/my-game.ts' showCopy=false language='ts'}}
    import Component from '@ember/component';
    import { action } from '@ember-decorators/object';

    export default class MyGame extends Component {
      @action
      turnWheel(degrees: number) {
        // ...
      }
    }
    {{/docs-snippet}}

    {{#docs-snippet name='my-game.hbs' title='my-app/templates/components/my-game.hbs' showCopy=false language='htmlbars'}}
    <button onclick={{action 'turnWheel' 'NOT-A-NUMBER'}}>Click Me</button>
    {{/docs-snippet}}

    Likewise, it won't notice a problem when you use the `send` method:

    {{#docs-snippet name='nested-component.ts' title='my-app/components/nested-component.ts' showCopy=false language='ts'}}
    // TypeScript compiler won't detect this type mismatch
    this.send('turnWheel', 'ALSO-NOT-A-NUMBER');
    {{/docs-snippet}}
