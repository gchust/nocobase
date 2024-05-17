import React from 'react';
import { mockApp } from '@nocobase/client/demo-utils';
import { SchemaComponent, Plugin, ISchema } from '@nocobase/client';

const schema: ISchema = {
  type: 'void',
  name: 'root',
  'x-decorator': 'FormV2',
  'x-component': 'ShowFormData',
  'x-pattern': 'readPretty',
  properties: {
    test: {
      type: 'number',
      default: '1.11',
      title: 'Test',
      'x-decorator': 'FormItem',
      'x-component': 'InputNumber',
      'x-component-props': {
        addonBefore: '¥',
        addonAfter: '万元',
      },
    },
    maxInteger: {
      type: 'number',
      default: '1691195350092210177',
      title: 'MAX_SAFE_INTEGER',
      'x-decorator': 'FormItem',
      'x-component': 'InputNumber',
      'x-pattern': 'readPretty',
    },
    mimInteger: {
      type: 'number',
      default: '-9007199254740991',
      title: 'MIN_SAFE_INTEGER',
      'x-decorator': 'FormItem',
      'x-component': 'InputNumber',
      'x-pattern': 'readPretty',
    },
  },
};
const Demo = () => {
  return <SchemaComponent schema={schema} />;
};

class DemoPlugin extends Plugin {
  async load() {
    this.app.router.add('root', { path: '/', Component: Demo });
  }
}

const app = mockApp({
  plugins: [DemoPlugin],
});

export default app.getRootComponent();
