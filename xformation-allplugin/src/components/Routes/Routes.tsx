import * as React from 'react';
import { Route, BrowserRouter } from 'react-router-dom';
import { Plugins } from '../../pages/Plugins';
import { TopologyView } from '../../pages/TopologyView';
import { useNavigation, prefixRoute } from '../../utils/utils.routing';
import { usePluginMeta } from 'utils/utils.plugin';
import { ROUTES } from '../../constants';

export const Routes = () => {
  useNavigation();
  const meta = usePluginMeta();
  if (!(meta && meta.jsonData && meta.jsonData.apiUrl && meta.jsonData.mainProductUrl)) {
    alert('Please set api url in plugin config');
    return <div>Set API Url and Main product url</div>;
  }
  return (
    <BrowserRouter>
      <Route path={prefixRoute(ROUTES.Plugins)} component={(props: any) => <Plugins {...props} meta={meta} />} />
      <Route path={prefixRoute(ROUTES.TopologyView)} component={(props: any) => <TopologyView {...props} meta={meta} />} />
    </BrowserRouter>
  );
};
