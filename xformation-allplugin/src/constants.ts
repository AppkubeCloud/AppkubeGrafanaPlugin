import pluginJson from './plugin.json';
import { NavItem } from 'types';

export const PLUGIN_BASE_URL = `/a/${pluginJson.id}`;

export enum ROUTES {
  Plugins = 'plugins',
  AssetManager = 'plugins/asset-manager',
  Environments = 'plugins/asset-manager/environments',
  AmazonServices = 'plugins/asset-manager/amazon-services',
  Kubernetes = 'plugins/asset-manager/kubernetes',
  StorageDetails = 'plugins/asset-manager/storage-details',
  AccountSetup = 'plugins/asset-manager/account-setup',
  StorageViewDetails = 'plugins/asset-manager/view-storage-details',
  AddDatasource = 'plugins/asset-manager/add-data-source',
  AddDatasourceCredential = 'plugins/asset-manager/add-datasource-credential',
  ExploreDataSourceDetail = 'plugins/asset-manager/explore-datasource',
  AddDatasourceProduct = 'plugins/asset-manager/add-data-source-product',
  AddDatasourceInputs = 'plugins/asset-manager/add-data-source-inputs',
  DepartmentWiseProducts = 'plugins/asset-manager/department-wise-products',
  DepartmentWiseCharts = 'plugins/asset-manager/department-wise-charts',
  ProductWiseServicesSla = 'plugins/asset-manager/product-wise-services-sla',
  WorkflowEngine = 'plugins/workflow-engine',
  WorkflowDashboard = 'plugins/workflow-engine/dashboard',
  ProjectWise = 'plugins/workflow-engine/project-wise',
  CreateUsecase = 'plugins/workflow-engine/create-usecase',
  MatrixView = 'plugins/workflow-engine/matrix-view',
  Procurement = 'plugins/workflow-engine/procurement',
  ProjectOverView = 'plugins/workflow-engine/project-overview',
  ResourceWiseViewAllTasks = 'plugins/workflow-engine/resource-wise-view-all-tasks',
} 


export const NAVIGATION_TITLE = 'Basic App Plugin';
export const NAVIGATION_SUBTITLE = 'Some extra description...';

// Add a navigation item for each route you would like to display in the navigation bar
export const NAVIGATION: Record<string, NavItem> = {};
