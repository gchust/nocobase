import {
  SchemaSettings,
  ActionDesigner,
  useSchemaToolbar,
  SchemaSettingsLinkageRules,
  useCollectionV2,
} from '@nocobase/client';

const printActionSettings = new SchemaSettings({
  name: 'ActionSettings:print',
  items: [
    {
      name: 'Customize',
      Component: (props): any => {
        return props.children;
      },
      children: [
        {
          name: 'editButton',
          Component: ActionDesigner.ButtonEditor,
          useComponentProps() {
            const { buttonEditorProps } = useSchemaToolbar();
            return buttonEditorProps;
          },
        },
        {
          name: 'linkageRules',
          Component: SchemaSettingsLinkageRules,
          useComponentProps() {
            const { name } = useCollectionV2();
            const { linkageRulesProps } = useSchemaToolbar();
            return {
              ...linkageRulesProps,
              collectionName: name,
            };
          },
        },

        {
          name: 'remove',
          sort: 100,
          Component: ActionDesigner.RemoveButton as any,
          useComponentProps() {
            const { removeButtonProps } = useSchemaToolbar();
            return removeButtonProps;
          },
        },
      ],
    },
  ],
});

export { printActionSettings };