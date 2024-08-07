/**
 * This file is part of the NocoBase (R) project.
 * Copyright (c) 2020-2024 NocoBase Co., Ltd.
 * Authors: NocoBase Team.
 *
 * This project is dual-licensed under AGPL-3.0 and NocoBase Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */

import React, { useState, useContext, useEffect } from 'react';
import { SchemaComponent } from '@nocobase/client';
import { ChannelTypeMapContext } from '../../../../hooks';
import { observer, useField } from '@formily/react';
import { useAPIClient } from '@nocobase/client';
import { useChannelTypeMap } from '../../../../hooks';
const ContentConfigForm = () => {
  const { typeMap } = useContext(ChannelTypeMapContext);
};
export const MessageConfigForm = observer<{ variableOptions: any }>(
  ({ variableOptions }) => {
    const field = useField();
    const { channelId } = field.form.values;
    const [providerName, setProviderName] = useState(null);
    const api = useAPIClient();
    useEffect(() => {
      const onChannelChange = async () => {
        if (!channelId) {
          setProviderName(null);
          return;
        }
        const { data } = await api.request({
          url: '/channels:get',
          method: 'get',
          params: {
            filterByTk: channelId,
          },
        });
        setProviderName(data.data.notificationType);
      };
      onChannelChange();
    }, [channelId, api]);
    const providerMap = useChannelTypeMap();
    const { ContentConfigForm = () => null } = (providerMap[providerName] ?? {}).components || {};

    const createMessageFormSchema = {
      type: 'object',
      properties: {
        title: {
          type: 'string',
          title: 'title',
          'x-decorator': 'FormItem',
          'x-component': 'Input',
          required: true,
        },
        channelId: {
          type: 'number',
          title: 'channel',
          'x-decorator': 'FormItem',
          'x-component': 'RemoteSelect',
          'x-component-props': {
            multiple: false,
            fieldNames: {
              label: 'title',
              value: 'id',
            },
            service: {
              resource: 'channels',
              action: 'list',
            },
            style: {
              width: '100%',
            },
          },
        },
        receivers: {
          type: 'array',
          name: 'receivers',
          title: 'Receivers',
          'x-decorator': 'FormItem',
          'x-component': 'ArrayItems',
          items: {
            type: 'void',
            'x-component': 'Space',
            properties: {
              input: {
                type: 'string',
                'x-decorator': 'FormItem',
                'x-component': 'Variable.Input',
                'x-component-props': { scope: variableOptions, useTypedConstant: ['string'] },
              },
              remove: {
                type: 'void',
                'x-decorator': 'FormItem',
                'x-component': 'ArrayItems.Remove',
              },
            },
          },
          properties: {
            add: {
              type: 'void',
              title: 'Add entry',
              'x-component': 'ArrayItems.Addition',
            },
          },
        },
        content: {
          type: 'object',
          properties: {
            body: {
              type: 'string',
              title: 'content',
              'x-decorator': 'FormItem',
              'x-component': 'Variable.RawTextArea',
              'x-component-props': {
                scope: variableOptions,
                placeholder: 'Hi,',
                autoSize: {
                  minRows: 10,
                },
              },
            },
            config: {
              type: 'object',
              'x-component': 'ContentConfigForm',
              'x-component-props': {
                variableOptions,
              },
            },
          },
        },
      },
    };
    return <SchemaComponent schema={createMessageFormSchema} components={{ ContentConfigForm }} />;
  },
  { displayName: 'MessageConfigForm' },
);