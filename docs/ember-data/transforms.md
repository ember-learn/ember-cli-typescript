# Transforms

`DS.attr` defines an attribute on a [DS.Model](https://guides.emberjs.com/release/models/defining-models/).
By default, attributes are passed through as-is, however you can specify an
optional type to have the value automatically transformed.
Ember Data ships with four basic transform types: `string`, `number`, `boolean` and `date`.

You can define your own transforms by subclassing [DS.Transform](https://guides.emberjs.com/release/models/defining-models/#toc_custom-transforms).
Ember Data transforms are normal TypeScript classes.
The return type of `deserialize` method becomes type of the model class property.

You may define your own transforms in TypeScript like so:
```typescript
# app/transforms/coordinate-point.ts
import Transform from '@ember-data/serializer/transform';

declare module 'ember-data/types/registries/transform' {
  export default interface TransformRegistry {
    'coordinate-point': CoordinatePointTransform;
  }
}

export type CoordinatePoint = {
  x: number;
  y: number;
};

export default class CoordinatePointTransform extends Transform {
  deserialize(serialized): CoordinatePoint {
    return { x: value[0], y: value[1] };
  }

  serialize(value): number {
    return [value.x, value.y];
  }
}

# app/models/cursor.ts
import Model, { attr } from '@ember-data/model';
import { CoordinatePoint } from 'agwa-data/transforms/coordinate-point';

declare module 'ember-data/types/registries/transform' {
  export default interface ModelRegistry {
    cursor: Cursor;
  }
}

export default class Cursor extends Model {
  @attr('coordinate-point') declare position: CoordinatePoint;
}
```

Note that you should declare your own transform under `TransformRegistry` to make `attr` to work with your transform.
