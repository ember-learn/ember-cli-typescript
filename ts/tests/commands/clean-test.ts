'use strict';

import * as fs from 'fs-extra';
import walkSync from 'walk-sync';

import ember from 'ember-cli-blueprint-test-helpers/lib/helpers/ember';
import blueprintHelpers from 'ember-cli-blueprint-test-helpers/helpers';
const setupTestHooks = blueprintHelpers.setupTestHooks;
const emberNew = blueprintHelpers.emberNew;

const chai = require('ember-cli-blueprint-test-helpers/chai');
const expect = chai.expect;

describe('Acceptance: ts:clean command', function() {
  setupTestHooks(this);

  beforeEach(function() {
    return emberNew({ target: 'addon' }).then(() =>
      ember(['generate', 'ember-cli-typescript'])
    );
  });

  it('removes all generated files', function() {
    fs.ensureDirSync('dist');
    fs.ensureDirSync('app');
    fs.ensureDirSync('addon');
    fs.writeFileSync(
      'app/test-file.ts',
      `export const testString: string = 'app';`
    );
    fs.writeFileSync(
      'addon/test-file.ts',
      `export const testString: string = 'addon';`
    );

    let before = walkSync(process.cwd());
    return ember(['ts:precompile'])
      .then(() => ember(['ts:clean']))
      .then(() => {
        let after = walkSync(process.cwd());
        expect(after).to.deep.equal(before);
      });
  });
});
