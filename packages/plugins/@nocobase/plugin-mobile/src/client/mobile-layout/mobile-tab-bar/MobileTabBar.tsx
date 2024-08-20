/**
 * This file is part of the NocoBase (R) project.
 * Copyright (c) 2020-2024 NocoBase Co., Ltd.
 * Authors: NocoBase Team.
 *
 * This project is dual-licensed under AGPL-3.0 and NocoBase Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */

import { SafeArea } from 'antd-mobile';
import 'antd-mobile/es/components/tab-bar/tab-bar.css';
import React, { FC, useCallback } from 'react';
import { Navigate } from 'react-router-dom';

import { useMobileRoutes } from '../../mobile-providers';
import { useStyles } from './styles';

import { css, cx, DndContext, DndContextProps, SchemaComponent, useApp, useDesignable } from '@nocobase/client';
import { isInnerLink } from '../../utils';
import { MobileTabBarInitializer } from './initializer';
import { getMobileTabBarItemSchema, MobileTabBarItem } from './MobileTabBar.Item';
import { MobileTabBarLink, MobileTabBarPage } from './types';

export interface MobileTabBarProps {
  /**
   * @default true
   */
  enableTabBar?: boolean;
}

export const MobileTabBar: FC<MobileTabBarProps> & {
  Item: typeof MobileTabBarItem;
  Page: typeof MobileTabBarPage;
  Link: typeof MobileTabBarLink;
} = ({ enableTabBar = true }) => {
  const app = useApp();
  const hasAuth = app.pluginSettingsManager.hasAuth('mobile');
  const { styles } = useStyles();
  const { designable } = useDesignable();
  const { routeList, activeTabBarItem, resource, refresh } = useMobileRoutes();
  const validRouteList = routeList.filter((item) => item.schemaUid || isInnerLink(item.options?.url));
  const handleDragEnd: DndContextProps['onDragEnd'] = useCallback(
    async (event) => {
      const { active, over } = event;
      const activeIdName = active?.id;
      const overIdName = over?.id;

      if (!activeIdName || !overIdName || activeIdName === overIdName) {
        return;
      }
      const activeId = Number(activeIdName.replace('nocobase-mobile.tabBar.', ''));
      const overId = Number(overIdName.replace('nocobase-mobile.tabBar.', ''));
      await resource.move({ sourceId: activeId, targetId: overId, sortField: 'sort' });
      await refresh();
    },
    [resource, refresh],
  );

  if (!hasAuth) {
    return <Navigate to={app.getRouteUrl('/admin')} />;
  }

  if (!enableTabBar) {
    return null;
  }

  // 如果是 routeList 中的 pathname 则显示 tabBar，如果是内页则不显示
  // 判断内页的方法：没有激活的 activeTabBarItem 并且 routeList 中有数据
  if (!activeTabBarItem && validRouteList.length > 0) return null;
  return (
    <div className={cx(styles.mobileTabBar, 'mobile-tab-bar')} data-testid="mobile-tab-bar">
      <div className={styles.mobileTabBarContent}>
        <DndContext onDragEnd={handleDragEnd}>
          <div
            className={cx(
              styles.mobileTabBarList,
              css({
                maxWidth: designable ? 'calc(100% - 58px)' : '100%',
                '.nb-block-item': {
                  maxWidth: `${100 / routeList.length}%`,
                },
              }),
            )}
          >
            {routeList.map((item) => {
              return <SchemaComponent key={item.id} schema={getMobileTabBarItemSchema(item)} />;
            })}
          </div>
        </DndContext>
        <MobileTabBarInitializer />
      </div>

      <SafeArea position="bottom" />
    </div>
  );
};

MobileTabBar.Item = MobileTabBarItem;
MobileTabBar.Link = MobileTabBarLink;
MobileTabBar.Page = MobileTabBarPage;
