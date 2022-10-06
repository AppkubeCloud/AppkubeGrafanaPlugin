import React, { useState, ChangeEvent } from 'react';
import { Button, Field, Input, useStyles2, FieldSet } from '@grafana/ui';
import { PluginConfigPageProps, AppPluginMeta, PluginMeta, GrafanaTheme2 } from '@grafana/data';
import { getBackendSrv, locationService } from '@grafana/runtime';
import { css } from '@emotion/css';
import { SecretInput } from '../SecretInput';

export type JsonData = {
  apiUrl?: string;
  isApiKeySet?: boolean;
  mainProductUrl?: string;
  grafanaUrl?: string;
};

type State = {
  // The URL to reach our custom API.
  apiUrl: string;
  // Tells us if the API key secret is set.
  // Set to `true` ONLY if it has already been set and haven't been changed.
  // (We unfortunately need an auxiliray variable for this, as `secureJsonData` is never exposed to the browser after it is set)
  isApiKeySet: boolean;
  // An secret key for our custom API.
  apiKey: string;
  mainProductUrl: string;
  grafanaUrl: string;
};

interface Props extends PluginConfigPageProps<AppPluginMeta<JsonData>> { }

export const AppConfig = ({ plugin }: Props) => {
  const defaultApiURL = 'http://3.208.22.155:5057';
  const defaultMainProductURL = 'http://3.208.22.155:3000';
  const s = useStyles2(getStyles);
  const { enabled, pinned } = plugin.meta;
  let { jsonData } = plugin.meta;
  if (jsonData) {
    jsonData.apiUrl = jsonData.apiUrl ? jsonData.apiUrl : defaultApiURL;
    jsonData.mainProductUrl = jsonData.mainProductUrl ? jsonData.mainProductUrl : defaultMainProductURL;
    jsonData.grafanaUrl = jsonData.grafanaUrl ? jsonData.grafanaUrl : defaultMainProductURL;
  } else {
    jsonData = {
      apiUrl: defaultApiURL,
      mainProductUrl: defaultMainProductURL,
      grafanaUrl: '',
    };
  }
  const [state, setState] = useState<State>({
    apiUrl: jsonData?.apiUrl || '',
    apiKey: '',
    isApiKeySet: Boolean(jsonData?.isApiKeySet),
    mainProductUrl: jsonData?.mainProductUrl || '',
    grafanaUrl: jsonData?.grafanaUrl || '',
  });

  const onResetApiKey = () =>
    setState({
      ...state,
      apiKey: '',
      isApiKeySet: false,
    });

  const onChangeApiKey = (event: ChangeEvent<HTMLInputElement>) => {
    setState({
      ...state,
      apiKey: event.target.value.trim(),
    });
  };

  const onChangeApiUrl = (event: ChangeEvent<HTMLInputElement>) => {
    setState({
      ...state,
      apiUrl: event.target.value.trim(),
    });
  };

  const onChangeMainProductURL = (event: ChangeEvent<HTMLInputElement>) => {
    setState({
      ...state,
      mainProductUrl: event.target.value.trim(),
    });
  };

  const onChangeGrafanaURL = (event: ChangeEvent<HTMLInputElement>) => {
    setState({
      ...state,
      grafanaUrl: event.target.value.trim(),
    });
  };

  return (
    <div>
      {/* ENABLE / DISABLE PLUGIN */}
      <FieldSet label="Enable / Disable">
        {!enabled && (
          <>
            <div className={s.colorWeak}>The plugin is currently not enabled.</div>
            <Button
              className={s.marginTop}
              variant="primary"
              onClick={() =>
                updatePluginAndReload(plugin.meta.id, {
                  enabled: true,
                  pinned: true,
                  jsonData,
                })
              }
            >
              Enable plugin
            </Button>
          </>
        )}

        {/* Disable the plugin */}
        {enabled && (
          <>
            <div className={s.colorWeak}>The plugin is currently enabled.</div>
            <Button
              className={s.marginTop}
              variant="destructive"
              onClick={() =>
                updatePluginAndReload(plugin.meta.id, {
                  enabled: false,
                  pinned: false,
                  jsonData,
                })
              }
            >
              Disable plugin
            </Button>
          </>
        )}
      </FieldSet>

      {/* CUSTOM SETTINGS */}
      <FieldSet label="API Settings" className={s.marginTopXl}>
        {/* API Key */}
        <Field label="API Key" description="A secret key for authenticating to our custom API">
          <SecretInput
            width={60}
            data-testid="api-key"
            id="api-key"
            value={state?.apiKey}
            isConfigured={state.isApiKeySet}
            placeholder={'Your secret API key'}
            onChange={onChangeApiKey}
            onReset={onResetApiKey}
          />
        </Field>

        {/* API Url */}
        <Field label="API Url" description="" className={s.marginTop}>
          <Input
            width={60}
            id="api-url"
            data-testid="api-url"
            label={`API Url`}
            value={state?.apiUrl}
            placeholder={`E.g.: http://mywebsite.com/api/v1`}
            onChange={onChangeApiUrl}
          />
        </Field>

        <Field label="Main Product Url" description="" className={s.marginTop}>
          <Input
            width={60}
            id="main-product-url"
            data-testid="main-product-url"
            label={`Main Product Url`}
            value={state?.mainProductUrl}
            placeholder={`E.g.: http://mywebsite.com/api/v1`}
            onChange={onChangeMainProductURL}
          />
        </Field>

        <Field label="Grafana Url" description="" className={s.marginTop}>
          <Input
            width={60}
            id="grafana-url"
            data-testid="grafana-url"
            label={`Grafana Url`}
            value={state?.grafanaUrl}
            placeholder={`E.g.: http://mywebsite.com/api/v1`}
            onChange={onChangeGrafanaURL}
          />
        </Field>

        <div className={s.marginTop}>
          <Button
            type="submit"
            onClick={() =>
              updatePluginAndReload(plugin.meta.id, {
                enabled,
                pinned,
                jsonData: {
                  apiUrl: state.apiUrl,
                  isApiKeySet: true,
                  mainProductUrl: state.mainProductUrl,
                  grafanaUrl: state.grafanaUrl
                },
                // This cannot be queried later by the frontend.
                // We don't want to override it in case it was set previously and left untouched now.
                secureJsonData: state.isApiKeySet
                  ? undefined
                  : {
                    apiKey: state.apiKey,
                  },
              })
            }
            // disabled={Boolean(!state.apiUrl || (!state.isApiKeySet && !state.apiKey))}
          >
            Save API settings
          </Button>
        </div>
      </FieldSet>
    </div>
  );
};

const getStyles = (theme: GrafanaTheme2) => ({
  colorWeak: css`
    color: ${theme.colors.text.secondary};
  `,
  marginTop: css`
    margin-top: ${theme.spacing(3)};
  `,
  marginTopXl: css`
    margin-top: ${theme.spacing(6)};
  `,
});

const updatePluginAndReload = async (pluginId: string, data: Partial<PluginMeta<JsonData>>) => {
  try {
    await updatePlugin(pluginId, data);

    // Reloading the page as the changes made here wouldn't be propagated to the actual plugin otherwise.
    // This is not ideal, however unfortunately currently there is no supported way for updating the plugin state.
    locationService.reload();
  } catch (e) {
    console.error('Error while updating the plugin', e);
  }
};

export const updatePlugin = async (pluginId: string, data: Partial<PluginMeta<JsonData>>) => {
  if (data.jsonData && data.jsonData.apiUrl) {
    localStorage.setItem("xformation-api-url", data.jsonData.apiUrl);
  }
  const response = await getBackendSrv().datasourceRequest({
    url: `/api/plugins/${pluginId}/settings`,
    method: 'POST',
    data,
  });

  return response?.data;
};
