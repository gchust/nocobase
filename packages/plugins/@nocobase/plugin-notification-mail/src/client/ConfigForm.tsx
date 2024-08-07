/**
 * This file is part of the NocoBase (R) project.
 * Copyright (c) 2020-2024 NocoBase Co., Ltd.
 * Authors: NocoBase Team.
 *
 * This project is dual-licensed under AGPL-3.0 and NocoBase Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */

import React from 'react';
import { SchemaComponent } from '@nocobase/client';
import { useNotifyMailTranslation } from './hooks/useTranslation';
export const ChannelConfigForm = () => {
  const { t } = useNotifyMailTranslation();
  return (
    <SchemaComponent
      scope={{ t }}
      schema={{
        type: 'object',

        properties: {
          host: {
            'x-decorator': 'FormItem',
            type: 'boolean',
            title: '{{t("host")}}',
            'x-component': 'Input',
          },
          port: {
            'x-decorator': 'FormItem',
            type: 'boolean',
            title: '{{t("port")}}',
            'x-component': 'Input',
          },
          secure: {
            'x-decorator': 'FormItem',
            type: 'boolean',
            title: '{{t("secure")}}',
            'x-component': 'Checkbox',
          },
          account: {
            'x-decorator': 'FormItem',
            type: 'boolean',
            title: '{{t("account")}}',
            'x-component': 'Input',
          },
          password: {
            'x-decorator': 'FormItem',
            type: 'boolean',
            title: '{{t("password")}}',
            'x-component': 'Input',
          },
        },
      }}
    />
  );
};